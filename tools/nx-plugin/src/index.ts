import {
  CreateDependencies,
  CreateDependenciesContext,
  createNodesFromFiles,
  CreateNodesV2,
} from 'nx/src/project-graph/plugins';
import {
  DependencyType,
  FileData,
  normalizePath,
  ProjectConfiguration,
  RawProjectGraphDependency,
  readJsonFile,
  workspaceRoot,
} from '@nx/devkit';
import { PackageJson } from 'nx/src/utils/package-json';
import { dirname, parse } from 'node:path';
import { DotNetClient } from '@nx-dotnet/dotnet';
import { dotnetFactory } from '@nx-dotnet/dotnet/src/lib/core/dotnet.factory';
import { resolveReferenceToProject } from '@nx-dotnet/core/src/graph/create-dependencies';
import { execSync } from 'node:child_process';

function isDotnetProject(projectRoot: string): boolean {
  return projectRoot.startsWith('dotnet');
}

function getProjectName(
  projectConfigJson: PackageJson | ProjectConfiguration
): string | undefined {
  if ('nx' in projectConfigJson) {
    return projectConfigJson.nx?.name;
  }
  return projectConfigJson.name;
}

function getCurrentBranchName(): string {
  return (
    process.env.GITHUB_HEAD_REF ||
    process.env.GITHUB_REF?.replace('refs/heads/', '') ||
    execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
  );
}


export const createNodesV2: CreateNodesV2 = [
  '{react,dotnet}/**/{package,project}.json',
  (configFilePaths, options, context) => {
    const currentBranchName = getCurrentBranchName();
    return createNodesFromFiles(
      async (configFilePath) => {
        const projectConfig = await readJsonFile(configFilePath);
        if (!projectConfig) {
          throw new Error(
            `Unable to parse project config file in: ${configFilePath}`
          );
        }
        const root = dirname(configFilePath);
        const name = getProjectName(projectConfig);
        if (!name) {
          throw new Error('Project name is not defined!');
        }
        const dotnetPublishTargets = {
          pack: {
            command: `dotnet pack --configuration Release --no-build --output dist/${root}/nupkgs`,
          },
          publish: {
            command: `dotnet nuget push dist/${root}/nupkgs/*.nupkg --skip-duplicate`,
          },
        };
        const updateCsprojVersionTarget = {
          'update-csproj-version': {
            executor:
              '@nx-multilanguage-monorepo/nx-plugin:update-csproj-version',
          },
        };
        const updatePackageJsonDeps = {
          'update-package-json-deps': {
            executor: '@nx/eslint:lint',
            options: {
              fix: true,
              lintFilePatterns: ['{projectRoot}/**/package.json'],
              configFilePath: '{workspaceRoot}/eslint.config.dependency-checks.mjs'
            },
          },
        };
        const versionTarget = {
          ...(isDotnetProject(root) ? updateCsprojVersionTarget : {}),
          ...(!isDotnetProject(root) ? updatePackageJsonDeps : {}),
          version: {
            executor: '@jscutlery/semver:version',
            options: {
              baseBranch: currentBranchName,
              preset: 'conventional',
              tagPrefix: '{projectName}@',
              push: true,
              trackDeps: true,
              postTargets: isDotnetProject(root)
                ? ['update-csproj-version']
                : ['update-package-json-deps'],
              commitMessageFormat:
                'chore({projectName}): release version {version} [skip ci]',
            },
          },
        };
        const updatedProjectConfig = {
          name,
          targets: {
            ...(!name.includes('test') && !name.includes('e2e')
              ? versionTarget
              : {}),
            ...(root.startsWith('dotnet/libs') ? dotnetPublishTargets : {}),
          },
        };
        return {
          projects: {
            [root]: updatedProjectConfig,
          },
        };
      },
      configFilePaths,
      options,
      context
    );
  },
];

// createProjectRootMappings function from nx-dotnet repo re-implemented
function createProjectRootMappings(
  projects: Record<string, ProjectConfiguration>
) {
  const rootMap: Record<string, string> = {};
  for (const [, project] of Object.entries(projects)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    rootMap[project.root!] = project.name!;
  }
  return rootMap;
}

const dotnetClient = new DotNetClient(dotnetFactory(), workspaceRoot);

// createDependencies function from nx-dotnet repo re-implemented
export const createDependencies: CreateDependencies = async (
  ctxOrOpts,
  maybeCtx
) => {
  const ctx: CreateDependenciesContext =
    maybeCtx ?? (ctxOrOpts as CreateDependenciesContext);
  const rootMap = createProjectRootMappings(ctx.projects);

  const parseProject = async (source: string) => {
    const changed = ctx.filesToProcess.projectFileMap[source];

    const getProjectReferences = async (file: FileData) => {
      const newDeps: RawProjectGraphDependency[] = [];
      const { ext } = parse(file.file);
      if (['.csproj', '.fsproj', '.vbproj'].includes(ext)) {
        const references = await dotnetClient.getProjectReferencesAsync(
          file.file
        );
        for (const reference of references) {
          const project = resolveReferenceToProject(
            normalizePath(reference),
            file.file,
            rootMap,
            ctx
          );
          if (project) {
            newDeps.push({
              source,
              target: project,
              type: DependencyType.static,
              sourceFile: file.file,
            });
          } else {
            console.warn(
              `Unable to resolve project for reference ${reference} in ${file.file}`
            );
          }
        }
      }
      return newDeps;
    };
    const getAllProjectReferences = changed.map(getProjectReferences);
    return Promise.all(getAllProjectReferences).then((d) => d.flat());
  };

  const parseAllProjects = Object.keys(ctx.filesToProcess.projectFileMap).map(
    parseProject
  );
  return Promise.all(parseAllProjects).then((d) => d.flat());
};
