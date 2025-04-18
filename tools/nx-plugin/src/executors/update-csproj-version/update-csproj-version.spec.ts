import { ExecutorContext, workspaceRoot } from '@nx/devkit';

import { UpdateCsprojVersionExecutorSchema } from './schema';
import executor from './update-csproj-version';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CHANGELOG_MOCK } from './mocks/changelog-mock';
import { CSPROJ_MOCK } from './mocks/csproj-mock';
import { rm } from 'node:fs/promises';

const options: UpdateCsprojVersionExecutorSchema = {};
const context: ExecutorContext = {
  root: '',
  cwd: process.cwd(),
  isVerbose: false,
  projectGraph: {
    nodes: {},
    dependencies: {},
  },
  projectsConfigurations: {
    projects: {
      'dotnet-example-app': {
        root: 'dotnet/apps/example-app',
      },
    },
    version: 2,
  },
  nxJsonConfiguration: {},
  projectName: 'dotnet-example-app',
};

function createMockProjectFileSystem(
  projectRoot: string,
  csprojPath: string,
  changelogPath: string
): void {
  process.chdir(workspaceRoot);
  if (!existsSync(projectRoot)) {
    mkdirSync(projectRoot);
  }
  writeFileSync(changelogPath, CHANGELOG_MOCK);
  writeFileSync(csprojPath, CSPROJ_MOCK);
}

async function cleanupMockProjectFileSystem(projectRoot: string): Promise<void> {
  await rm(projectRoot, { recursive: true, force: true });
}

describe('Version Executor', () => {
  const projectRoot = (context.projectName &&
    context.projectsConfigurations.projects[context.projectName].root)!;
  const csprojPath = join(projectRoot, 'Project.Dotnet.ExampleApp.csproj');
  const changelogPath = join(projectRoot, 'CHANGELOG.md');

  beforeEach(() => {
    createMockProjectFileSystem(projectRoot, csprojPath, changelogPath);
  });

  afterEach(async () => {
    await cleanupMockProjectFileSystem(projectRoot);
  });

  it('should update version tag in .csproj file with the latest version from the CHANGELOG.md', async () => {
    const expectedVersion = '1.2.0';
    const output = await executor(options, context);
    expect(output.success).toBe(true);
    const csprojFile = readFileSync(csprojPath, 'utf8');
    const versionTagRegex = /<Version>(.*?)<\/Version>/;
    const version = versionTagRegex.exec(csprojFile)?.[1];
    expect(expectedVersion).toMatch(version!);
  });
});
