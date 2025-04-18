import { GenerateProject } from '@nx-dotnet/core/src/generators/utils/generate-project';
import { DotNetClient } from '@nx-dotnet/dotnet';
import { dotnetFactory } from '@nx-dotnet/dotnet/src/lib/core/dotnet.factory';
import {
  formatFiles,
  generateFiles,
  names,
  readNxJson,
  readProjectConfiguration,
  Tree,
  updateNxJson, updateProjectConfiguration
} from '@nx/devkit';
import { addCsprojMetadata } from './utils/add-csproj-metadata';
import { GenerateDotnetProjectGeneratorSchema } from './schema';
import * as path from 'node:path';
import { updateProjectName } from './utils/update-project-name';
import { join } from 'node:path';
import { readPackageJson } from 'nx/src/project-graph/file-utils';
import { PackageJson } from 'nx/src/utils/package-json';

function createGlobalJsonFile(tree: Tree, projectRoot: string, dotnetVersion: string): void {
  tree.write(
    join(projectRoot, 'global.json'),
    JSON.stringify({
      sdk: {
        version: `${dotnetVersion}`,
      },
    })
  );
}

function updateTestTarget(tree: Tree, projectName: string): void {
  const projectConfig = readProjectConfiguration(tree, projectName);
  updateProjectConfiguration(tree, projectName, {
    ...projectConfig,
    targets: {
      ...projectConfig.targets,
      test: {
        ...projectConfig.targets?.test,
        options: {
          ...(projectConfig.targets?.test?.options ?? {}),
          noBuild: false
        }
      }
    }
  });
}

export async function generateDotnetProjectGenerator(
  tree: Tree,
  {
    projectType,
    dotnetVersion,
    ...options
  }: GenerateDotnetProjectGeneratorSchema
) {
  const packageJson: PackageJson = readPackageJson();
  const nxJson = readNxJson(tree);
  if (!nxJson) {
    throw new Error('Unable to read nx.json file!');
  }
  updateNxJson(tree, {
    ...nxJson,
    useInferencePlugins: false,
  });

  try {
    const dotnetClient = new DotNetClient(dotnetFactory());
    await GenerateProject(tree, options, dotnetClient, projectType);
  } catch (error: unknown) {
    console.error(error);
  }

  if (options.testTemplate && options.testTemplate !== 'none') {
    updateProjectName(`${options.name}-test`, tree, options.directory);
  }

  const projectName = updateProjectName(options.name, tree, options.directory);

  addCsprojMetadata(tree, options.name);

  const { root: projectRoot } = readProjectConfiguration(tree, projectName);

  addCsprojMetadata(tree, projectRoot, dotnetVersion);

  updateNxJson(tree, nxJson);
  const projectTypeShortcut = projectType.slice(0, 3);
  const templatePath = path.join(__dirname, 'templates', projectTypeShortcut);

  generateFiles(tree, templatePath, projectRoot, {
    className: 'Template',
    namespace:
      options.namespaceName ?? `My${names(options.name).className}.Generated`,
    tmpl: '',
  });

  if (dotnetVersion) {
    createGlobalJsonFile(tree, projectRoot, dotnetVersion);
    if (options.testTemplate && options.testTemplate !== 'none') {
      const testProjectName = `${projectName}-test`;
      const { root: testProjectRoot } = readProjectConfiguration(
        tree,
        testProjectName
      );
      addCsprojMetadata(tree, testProjectRoot, dotnetVersion);
      updateTestTarget(tree, testProjectName);
      createGlobalJsonFile(tree, testProjectRoot, dotnetVersion);
    }
  }

  tree.write('package.json', JSON.stringify(packageJson));

  await formatFiles(tree);
}

export default generateDotnetProjectGenerator;
