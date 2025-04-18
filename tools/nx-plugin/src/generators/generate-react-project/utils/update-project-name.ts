import {
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nx/devkit';
import { join } from 'path';

export function updateProjectName(projectName: string, tree: Tree, directory: string): string {
  const normalizedProjectName = `react-${projectName}`;
  const oldProjectName = `@nx-multilanguage-monorepo/${projectName}`;
  const projectConfig = readProjectConfiguration(tree, oldProjectName);
  updateProjectConfiguration(tree, oldProjectName, {
    ...projectConfig,
    name: normalizedProjectName,
  });

  const projectJsonPath = join(directory, projectName, 'project.json');
  if (tree.exists(projectJsonPath)) {
    return normalizedProjectName;
  }

  const packageJsonPath = join(directory, projectName, 'package.json');
  if (!tree.exists(packageJsonPath)) {
    throw new Error(
      `Path to project package.json file ${packageJsonPath} does not exist!`
    );
  }
  const packageJson = tree.read(packageJsonPath, 'utf8');
  if (!packageJson) {
    throw new Error('Unable to read package.json file!');
  }

  const parsedPackageJson = JSON.parse(packageJson);

  tree.write(
    packageJsonPath,
    JSON.stringify({
      ...parsedPackageJson,
      name: `@nx-multilanguage-monorepo/${normalizedProjectName}`,
      nx: {
        ...parsedPackageJson.nx,
        name: normalizedProjectName,
      },
    })
  );

  return normalizedProjectName;
}
