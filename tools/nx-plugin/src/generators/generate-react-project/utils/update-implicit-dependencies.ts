import { readProjectConfiguration, Tree, updateProjectConfiguration } from '@nx/devkit';

export function updateImplicitDependencies(tree: Tree, testProjectName: string, projectName: string): void {
  const projectConfig = readProjectConfiguration(tree, testProjectName);
  updateProjectConfiguration(tree, testProjectName, {
    ...projectConfig,
    implicitDependencies: [projectName]
  });
}
