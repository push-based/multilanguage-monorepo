# React Generators Schema Documentation

This document outlines the configuration options for the **React Application** and **React Library** generators in Nx. The options are divided into **common**, **application-specific**, and **library-specific** sections.

---

## 1. 🧩 Common Properties

These options are available in **both** application and library generators:

| Property                  | Type                                      | Description |
|--------------------------|-------------------------------------------|-------------|
| `directory`              | `string`                                  | The subdirectory where the project is generated. |
| `name`                   | `string` *(optional)*                      | The name of the project. |
| `style`                  | `SupportedStyles`                         | The styling solution to use (e.g., `css`, `scss`, `styled-components`). |
| `skipFormat`             | `boolean` *(optional)*                    | Skip formatting files after generation. |
| `tags`                   | `string` *(optional)*                     | Project tags for linting and project boundaries. |
| `unitTestRunner`         | `'jest'` \| `'vitest'` \| `'none'` *(optional)* | Unit test runner to configure. |
| `inSourceTests`          | `boolean` *(optional)*                    | Place tests inside source files. |
| `linter`                 | `Linter` \| `LinterType`                  | Linter configuration (e.g., `eslint`). |
| `js`                     | `boolean` *(optional)*                    | Generate JavaScript instead of TypeScript. |
| `globalCss`              | `boolean` *(optional)*                    | Enable global CSS styles. |
| `strict`                 | `boolean` *(optional)*                    | Enable strict mode in TypeScript config. |
| `setParserOptionsProject`| `boolean` *(optional)*                    | Configure parserOptions.project for ESLint. |
| `compiler`               | `'babel'` \| `'swc'` *(optional)*         | Choose a compiler for the project. |
| `skipPackageJson`        | `boolean` *(optional)*                    | Skip updating the `package.json` file. |
| `minimal`                | `boolean` *(optional)*                    | Generate a minimal setup. |
| `addPlugin`              | `boolean` *(optional)*                    | Enable plugin integration. |
| `useProjectJson`         | `boolean` *(optional)*                    | Use `project.json` instead of `workspace.json`. |
| `projectType`            | `'application'` \| `'library'`            | Type of project being generated. |

---

## 2. ⚛️ Application-Specific Properties

These options apply **only to React Application generators**:

| Property                  | Type                                        | Description |
|--------------------------|---------------------------------------------|-------------|
| `e2eTestRunner`          | `'cypress'` \| `'playwright'` \| `'none'`  | End-to-end testing framework to use. |
| `classComponent`         | `boolean` *(optional)*                     | Use class components instead of functional ones. |
| `routing`                | `boolean` *(optional)*                     | Enable routing in the app. |
| `useReactRouter`         | `boolean` *(optional)*                     | Use React Router for navigation. |
| `skipNxJson`             | `boolean` *(optional)*                     | Skip updates to `nx.json`. |
| `devServerPort`          | `number` *(optional)*                      | Port number for the dev server. |
| `rootProject`            | `boolean` *(optional)*                     | Place project at the root of the workspace. |
| `remotes`                | `string[]` *(optional)*                    | Configure module federation remotes. |
| `bundler`                | `'webpack'` \| `'vite'` \| `'rspack'` \| `'rsbuild'` *(optional)* | Choose a bundler for the application. |
| `nxCloudToken`           | `string` *(optional)*                      | Token used for Nx Cloud. |
| `formatter`              | `'prettier'` \| `'none'` *(optional)*      | File formatter for the project. |
| `useTsSolution`          | `boolean` *(optional)*                     | Enable TypeScript solution style configurations. |

---

## 3. 🧱 Library-Specific Properties

These options apply **only to React Library generators**:

| Property                  | Type                                        | Description |
|--------------------------|---------------------------------------------|-------------|
| `appProject`             | `string` *(optional)*                      | Associated app for the library (used in integration). |
| `buildable`              | `boolean` *(optional)*                     | Whether the library can be built. |
| `publishable`            | `boolean` *(optional)*                     | Whether the library can be published to npm. |
| `importPath`             | `string` *(optional)*                      | Custom import path for the library. |
| `component`              | `boolean` *(optional)*                     | Generate a component in the library. |
| `routing`                | `boolean` *(optional)*                     | Add routing capability to the library. |
| `skipTsConfig`           | `boolean` *(optional)*                     | Skip updates to `tsconfig.base.json`. |
| `simpleName`             | `boolean` *(optional)*                     | Generate project using a simple name (without directory prefix). |
| `bundler`                | `'none'` \| `'rollup'` \| `'vite'` *(optional)* | Bundler to use for the library. |
## Example Usage

```
npx nx g @nx-multilanguage-monorepo/nx-plugin:generate-react-project 
```

## Custom Template File Generation


- Example templates for apps and libraries are stored in the `templates` directory.
- The generator uses the `EJS` templating engine by default. You can learn more about its syntax and features in the [EJS documentation](https://ejs.co/).
- The `generateFiles` utility is responsible for injecting values into template placeholders.
