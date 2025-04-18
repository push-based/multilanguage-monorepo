import { Schema as GenerateReactApplicationSchema } from '@nx/react/src/generators/application/schema';
import { Schema as GenerateReactLibrarySchema } from '@nx/react/src/generators/library/schema';
import { ProjectType } from '@nx/devkit';

export type GenerateReactProjectSchema = GenerateReactApplicationSchema & GenerateReactLibrarySchema;

export interface GenerateReactProjectGeneratorSchema extends GenerateReactProjectSchema {
  name: string;
  projectType: ProjectType;
}
