import { PromiseExecutor } from '@nx/devkit';
import { UpdateCsprojVersionExecutorSchema } from './schema';
import { join } from 'node:path';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';

function getLatestVersionFromChangelog(filePath: string): string | null {
  try {
    const changelogContent = readFileSync(filePath, 'utf-8');
    const versionRegex = /^##\s*\[?v?(\d+\.\d+\.\d+)\]?(?:\s*-\s*\d{4}-\d{2}-\d{2})?/gm;
    const match = versionRegex.exec(changelogContent);

    return match ? match[1] : null;
  } catch (err) {
    console.error(`Failed to read or parse changelog: ${err}`);
    return null;
  }
}


function updateCsprojVersion(csprojPath: string, newVersion: string): void {
  try {
    let csprojContent = readFileSync(csprojPath, 'utf-8');

    const versionTagRegex = /<Version>(.*?)<\/Version>/;

    if (versionTagRegex.test(csprojContent)) {
      csprojContent = csprojContent.replace(versionTagRegex, `<Version>${newVersion}</Version>`);
    } else {
      // If <Version> tag doesn't exist, insert it under the first <PropertyGroup>
      csprojContent = csprojContent.replace(
        /<PropertyGroup>/,
        `<PropertyGroup>\n    <Version>${newVersion}</Version>`
      );
    }

    writeFileSync(csprojPath, csprojContent, 'utf-8');
    console.log(`Updated ${csprojPath} to version ${newVersion}`);
  } catch (err) {
    console.error(`Error updating .csproj file: ${err}`);
  }
}

const runExecutor: PromiseExecutor<UpdateCsprojVersionExecutorSchema> = async (options, { projectsConfigurations, projectName }) => {
  const projectRoot = projectName ? projectsConfigurations.projects[projectName]?.root : undefined;
  if (!projectRoot) {
    throw new Error(`Project root for ${projectName} is not defined!`);
  }
  const changelogPath = join(projectRoot, 'CHANGELOG.md');
  const version = getLatestVersionFromChangelog(changelogPath);
  if (!version) {
    throw new Error(`Unable to get latest version of the project ${projectName}`);
  }
  const rootFiles = readdirSync(projectRoot);
  for (const file of rootFiles) {
    if (file.endsWith('.csproj')) {
      const csprojPath = join(projectRoot, file);
      updateCsprojVersion(csprojPath, version);
      break;
    }
  }
  return {
    success: true,
  };
};

export default runExecutor;
