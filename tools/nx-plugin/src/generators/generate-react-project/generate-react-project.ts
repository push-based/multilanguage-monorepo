import {
  formatFiles,
  generateFiles,
  names,
  readProjectConfiguration,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { GenerateReactProjectGeneratorSchema } from './schema';
import { execSync } from 'child_process';
import { join } from 'path';
import { updateProjectName } from './utils/update-project-name';
import { updateImplicitDependencies } from './utils/update-implicit-dependencies';

export async function generateReactProjectGenerator(
  tree: Tree,
  {
    name,
    directory,
    e2eTestRunner,
    projectType,
  }: GenerateReactProjectGeneratorSchema
) {
  const testRunner = e2eTestRunner ?? 'cypress';
  try {
    const pathToProject = join(directory, name);
    const testRunnerParam = projectType === 'application'? `--e2eTestRunner=${testRunner}` : '';
    execSync(
      `npx nx g @nx/react:${projectType} ${pathToProject} ${testRunnerParam}`,
      {
        stdio: 'inherit',
      }
    );
  } catch (error: unknown) {
    console.error(error);
  }

  const projectName = updateProjectName(name, tree, directory);

  if (testRunner && testRunner !== 'none') {
    const testProjectName = updateProjectName(`${name}-e2e`, tree, directory);
    updateImplicitDependencies(tree, testProjectName, projectName);
  }

  const { root: projectRoot } = readProjectConfiguration(tree, projectName);
  const destinationPath = path.join(__dirname, 'templates');
  generateFiles(tree, destinationPath, projectRoot, {
    componentName: names(projectName).className,
    className: names(projectName).fileName,
    tmpl: '',
  });
  await formatFiles(tree);
}

export default generateReactProjectGenerator;
