import {
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nx/devkit';

export function updateProjectName(projectName: string, tree: Tree, directory?: string): string {
  const normalizedProjectName = `dotnet-${projectName}`;
  const oldProjectName = directory
    ? `${directory.replace(/\//g, '-')}-${projectName}`
    : projectName;
  const projectConfig = readProjectConfiguration(tree, oldProjectName);
  updateProjectConfiguration(tree, oldProjectName, {
    ...projectConfig,
    name: normalizedProjectName,
  });

  return normalizedProjectName;
}
