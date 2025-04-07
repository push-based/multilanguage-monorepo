import {
  createNodesFromFiles,
  CreateNodesV2,
} from 'nx/src/project-graph/plugins';
import { ProjectConfiguration, readJsonFile } from '@nx/devkit';
import { dirname } from 'node:path';
import { PackageJson } from 'nx/src/utils/package-json';

function getProjectName(projectConfigJson: PackageJson | ProjectConfiguration): string | undefined {
  if ('nx' in projectConfigJson) {
    return projectConfigJson.nx?.name;
  }
  return projectConfigJson.name;
}

export const createNodesV2: CreateNodesV2 = [
  '{react,dotnet}/**/{package,project}.json',
  (configFilePaths, options, context) => {
    console.log({ configFilePaths });
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
        const updatedProjectConfig = {
          name,
          targets: {
            version: {
              executor: '@jscutlery/semver:version',
              options: {
                baseBranch: 'HEAD:main',
                preset: 'conventional',
                tagPrefix: 'APP_NAME_',
                push: true,
                trackDeps: true,
                commitMessageFormat:
                  'chore({projectName}): release version {version} [skip ci]',
              },
            },
            ...(root.startsWith('dotnet/libs') ? {
              pack: {
                command: `dotnet pack --configuration Release --no-build --output dist/${root}/nupkgs`
              },
              publish: {
                command: `dotnet nuget push dist/${root}/nupkgs/*.nupkg --skip-duplicate`
              }
            } : {})
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
