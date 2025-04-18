import { Tree, joinPathFragments } from '@nx/devkit';

export function findCsprojFile(tree: Tree, projectRoot: string): string | null {
  const children = tree.children(projectRoot);
  for (const child of children) {
    if (child.endsWith('.csproj')) {
      return joinPathFragments(projectRoot, child);
    }
  }
  return null;
}

function updateCsprojFile(
  tree: Tree,
  csprojPath: string,
  packageId: string,

  dotnetVersion?: string
): void {
  const csprojContent = tree.read(csprojPath, 'utf-8');
  if (!csprojContent) {
    throw new Error(`Unable to read csproj file at ${csprojPath}`);
  }

  let updatedContent = csprojContent;

  if (/<PackageId>.*<\/PackageId>/.test(updatedContent)) {
    updatedContent = updatedContent.replace(
      /<PackageId>.*<\/PackageId>/,
      `<PackageId>${packageId}</PackageId>`
    );
  } else {
    updatedContent = updatedContent.replace(
      /<PropertyGroup>/,
      `<PropertyGroup>\n    <PackageId>${packageId}</PackageId>`);
  }

  if (/<Version>.*<\/Version>/.test(updatedContent)) {
    updatedContent = updatedContent.replace(
      /<Version>.*<\/Version>/,
      `<Version>0.0.1</Version>`
    );
  } else {
    updatedContent = updatedContent.replace(
      /<PropertyGroup>/,
      `<PropertyGroup>\n    <Version>0.0.1</Version>`
    );
  }

  if (dotnetVersion) {
    const frameworkVersion = `net${dotnetVersion.slice(0, 3)}`;
    updatedContent = updatedContent.replace(
      /<TargetFramework>.*<\/TargetFramework>/,
      `<TargetFramework>${frameworkVersion}</TargetFramework>`
    );
  }

  tree.write(csprojPath, updatedContent);
}

export function addCsprojMetadata(
  tree: Tree,
  projectRoot: string,
  dotnetVersion?: string
): void {
  const csprojPath = findCsprojFile(tree, projectRoot);
  if (!csprojPath) {
    console.error(`No csproj file found in ${projectRoot}`);
    return;
  }
  console.log('Found csproj file at:', csprojPath);
  const fileName = csprojPath.split('/').pop();
  if (!fileName) {
    console.error('Could not determine file name from path:', csprojPath);
    return;
  }
  const packageId = fileName.replace('.csproj', '');
  updateCsprojFile(tree, csprojPath, packageId, dotnetVersion);
}
