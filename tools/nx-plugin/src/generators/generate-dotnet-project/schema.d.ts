import { NxDotnetProjectGeneratorSchema } from '@nx-dotnet/core/src/models/project-generator-schema';
import { ProjectType } from '@nx/devkit';

export interface GenerateDotnetProjectGeneratorSchema extends NxDotnetProjectGeneratorSchema {
  projectType: ProjectType;
  name: string;
  language: 'C#' | 'F#' | 'VB';
  testTemplate: 'nunit' | 'xunit' | 'mstest' | 'none';
  pathScheme: 'nx' | 'dotnet';
  dotnetVersion?: string;
  directory?: string;
}
