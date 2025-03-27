# Monorepo generation

## Generate a workspace

`$ npx create-nx-workspace@latest`

### Step 1

- choose an organization name

![img.png](assets/create-nx-workspace-step1.png)

### Step 2

- choose a tech stack `React`

![img.png](assets/create-nx-workspace-step2.png)

### Step 3

- choose a framework `None`

![img.png](assets/create-nx-workspace-step3.png)

### Step 4

- choose an application name

![img.png](assets/create-nx-workspace-step4.png)

### Step 5

- decline using `React Router` for `SSR`

![img.png](assets/create-nx-workspace-step5.png)

### Step 6

- select `Vite` as the bundler

![img.png](assets/create-nx-workspace-step6.png)

### Step 7

- select `Vitest` as the unit test runner

![img.png](assets/create-nx-workspace-step7.png)

### Step 8

- select `Cypress` as the e2e test runner

![img.png](assets/create-nx-workspace-step8.png)

### Step 9

- select `CSS` as the default stylesheet

![img.png](assets/create-nx-workspace-step9.png)

### Step 10

- use `Eslint`

![img.png](assets/create-nx-workspace-step10.png)

### Step 11

- use `Prettier`

![img.png](assets/create-nx-workspace-step11.png)

### Step 12

- select `GitHub Actions` as the CI provider

![img.png](assets/create-nx-workspace-step12.png)

## Result

This is automatically create the `my-nx-workspace` and `my-nx-workspace-e2e` projects (apps) under the `apps` folder:

![img.png](assets/create-nx-workspace-result.png)

## Folder Structure

- in the workspace root create a `react` folder
- move the `apps` under the `react` folder
- rename the source root folder to `transactions-app` and `transactions-app-e2e`

![img.png](assets/create-nx-workspace-folder-structure.png)

## Project Name

- change the `name` property in `package.json` to follow the project naming convention based in the [Project Conventions Docs](./tags-and-scopes.md)
- e.g. `react-transactions-app`, `react-transactions-app-e2e`
