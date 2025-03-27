# Create React library

`$ npx nx g lib`

## Step 1
- choose the `@nx/react:libaray` generator

![img.png](assets/react-lib-generation-step1.png)

## Step 2
- choose the library source root (path from the workspace root)

![img.png](assets/react-lib-generation-step2.png)

## Step 3
- choose `vite` as a bundler

![img.png](assets/react-lib-generation-step3.png)

## Step 4
- choose `vitest` as a unit test runner

![img.png](assets/react-lib-generation-step4.png)


# Result

![img.png](assets/react-lib-generation-result.png)

## Project Name
- change the `name` property in `package.json` to follow the project naming convention based in the [Project Conventions Docs](./tags-and-scopes.md) 
- change the `name` property of `lib` in the `vite.config.ts` file to follow the project naming convention
- e.g. `react-transactions-data-access`
