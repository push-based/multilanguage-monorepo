import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { generateDotnetProjectGenerator } from './generate-dotnet-project';
import { GenerateDotnetProjectGeneratorSchema } from './schema';
import { join } from 'node:path';

describe('generate-dotnet-project generator', () => {
  let tree: Tree;
  const options: GenerateDotnetProjectGeneratorSchema = {
    language: 'C#',
    pathScheme: 'nx',
    testTemplate: 'none',
    skipSwaggerLib: true,
    template: 'web',
    name: 'example-app',
    projectType: 'application',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should generate a dotnet application and test projects if testTemplate is specified', async () => {
    const opts: GenerateDotnetProjectGeneratorSchema = {
      ...options,
      testTemplate: 'xunit'
    };
    await generateDotnetProjectGenerator(tree, opts);
    const config = readProjectConfiguration(tree, 'dotnet-example-app');
    const testConfig = readProjectConfiguration(tree, 'dotnet-example-app-test');
    expect(config).toBeDefined();
    expect(testConfig).toBeDefined();
  }, 60_000);

  it('should generate a dotnet library', async () => {
    const opts: GenerateDotnetProjectGeneratorSchema = {
      ...options,
      name: 'example-lib',
      projectType: 'library'
    };
    await generateDotnetProjectGenerator(tree, opts);
    const config = readProjectConfiguration(tree, 'dotnet-example-lib');
    expect(config).toBeDefined();
  }, 60_000);

  it('should generate global.json if dotnetVersion is specified', async () => {
    const opts: GenerateDotnetProjectGeneratorSchema = {
      ...options,
      testTemplate: 'xunit',
      dotnetVersion: '7.0.203'
    };
    await generateDotnetProjectGenerator(tree, opts);
    const { root } = readProjectConfiguration(tree, `dotnet-${options.name}`);
    const globalJsonPath = join(root, 'global.json');
    expect(tree.exists(globalJsonPath)).toBeTruthy();
    const globalJson = JSON.parse(tree.read(globalJsonPath, 'utf8') ?? '{}');
    expect(globalJson.sdk.version).toBe(opts.dotnetVersion);
  }, 60_000);

  it('should update csproj file if dotnetVersion is specified', async () => {
    const opts: GenerateDotnetProjectGeneratorSchema = {
      ...options,
      testTemplate: 'xunit',
      dotnetVersion: '7.0.203'
    };
    await generateDotnetProjectGenerator(tree, opts);
    const { root } = readProjectConfiguration(tree, `dotnet-${options.name}`);
    const csprojPath = join(root, 'Proj.ExampleApp.csproj');
    const csProjFile = tree.read(csprojPath, 'utf8')!;
    const targetFramework = /<TargetFramework>net7.0<\/TargetFramework>/;
    expect(targetFramework.test(csProjFile)).toBeTruthy();
  }, 60_000);

  it('should generate global.json if dotnetVersion and testTemplate is specified', async () => {
    const opts: GenerateDotnetProjectGeneratorSchema = {
      ...options,
      testTemplate: 'xunit',
      dotnetVersion: '7.0.203'
    };
    await generateDotnetProjectGenerator(tree, opts);
    const { root } = readProjectConfiguration(tree, `dotnet-${options.name}-test`);
    const globalJsonPath = join(root, 'global.json');
    expect(tree.exists(globalJsonPath)).toBeTruthy();
    const globalJson = JSON.parse(tree.read(globalJsonPath, 'utf8') ?? '{}');
    expect(globalJson.sdk.version).toBe(opts.dotnetVersion);
  }, 60_000);

  it('should update csproj file if dotnetVersion and testTemplate is specified', async () => {
    const opts: GenerateDotnetProjectGeneratorSchema = {
      ...options,
      testTemplate: 'xunit',
      dotnetVersion: '7.0.203'
    };
    await generateDotnetProjectGenerator(tree, opts);
    const { root } = readProjectConfiguration(tree, `dotnet-${options.name}-test`);
    const csprojPath = join(root, 'Proj.ExampleApp.Test.csproj');
    const csProjFile = tree.read(csprojPath, 'utf8')!;
    const targetFramework = /<TargetFramework>net7.0<\/TargetFramework>/;
    expect(targetFramework.test(csProjFile)).toBeTruthy();
  }, 60_000);

  it('should set test targets noBuild option to false if dotnetVersion and testTemplate is specified', async () => {
    const opts: GenerateDotnetProjectGeneratorSchema = {
      ...options,
      testTemplate: 'xunit',
      dotnetVersion: '7.0.203'
    };
    await generateDotnetProjectGenerator(tree, opts);
    const { targets } = readProjectConfiguration(tree, `dotnet-${options.name}-test`);
    expect(targets?.test.options.noBuild).toBeFalsy();
  }, 60_000);
});
