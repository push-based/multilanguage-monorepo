# Nx Plugin Reference Table

## Overview

| Language/Stack     | Nx Plugin                   | Status       | Notes                                                            |
| ------------------ | --------------------------- | ------------ | ---------------------------------------------------------------- |
| React (TypeScript) | `@nx/react`                 | ✅ Official  | Supports Vite/Webpack, Jest, Storybook                           |
| Node.js            | `@nx/node`, `@nx/express`   | ✅ Official  | For backend APIs, workers, CLI tools                             |
| .NET Core (C#)     | `@nx-dotnet/core`           | ⚠️ Community | Good support for apps/libs, graphs, test/build                   |
| Python             | `@nxlv/python`, `nx-python` | ⚠️ Community | Virtualenvs, basic packaging & tests                             |
| Kotlin/Java (JVM)  | `@nx/gradle`, `jnxplus`     | 🟡 Mixed     | Official Gradle support exists; jnxplus for Kotlin multiplatform |

## Community Plugins (Mixed Support)

## .NET Core (C#)

### `@nx-dotnet/core`

#### References

- [Official Docs Link](https://nx.dev/showcase/example-repos/add-dotnet)
- [GitHub Repo Link](https://github.com/nx-dotnet/nx-dotnet)
- [NPM Link](https://www.npmjs.com/package/@nx-dotnet/core)

#### Maintenance Status

- Status: ✅ Active
- Open issues: `48`

---

#### Capabilities

| Nx Plugin Name    | Run and Cache Tasks | Explore the Graph | Use Code Generators | Enforce module boundaries |
| ----------------- | ------------------- | ----------------- | ------------------- | ------------------------- |
| `@nx-dotnet/core` | Supported ✅        | Supported ✅      | Supported ✅        | Supported ✅              |

## Python

### `@nxlv/python`

#### References

- [GitHub Repo Link](https://github.com/lucasvieirasilva/nx-plugins)
- [NPM Link](https://www.npmjs.com/package/@nxlv/python)

#### Maintenance Status

- Status: ✅ Active
- Open issues: `2`

---

### `nx-python`

#### References

- [GitHub Repo Link](https://github.com/hogarthww-labs/nx-python)
- [NPM Link](https://www.npmjs.com/package/nx-python)

#### Maintenance Status

- Status: ‼️ Inactive
- Open issues: `2`

---

#### Capabilities

| Nx Plugin Name | Run and Cache Tasks | Explore the Graph | Use Code Generators | Enforce module boundaries |
| -------------- | ------------------- | ----------------- | ------------------- | ------------------------- |
| `@nxlv/python` | Supported ✅        | Supported ✅      | Supported ✅        | Supported ✅              |
| `nx-python`    | Supported ✅        | Supported ✅      | Supported ✅        | Supported ✅              |

## Kotlin/Java (JVM)

### `@nx/gradle`

#### References

- [Official Docs Link](https://nx.dev/nx-api/gradle)
- [GitHub Repo Link](https://github.com/nrwl/nx/tree/master/packages/gradle)
- [NPM Link](https://www.npmjs.com/package/@nx/gradle)

#### Maintenance Status

- Last update: ✅ Active
- Open issues: `9`

---

### `jnxplus`

#### Packages

- `@jnxplus/nx-gradle`
- `@jnxplus/nx-maven`
- `@jnxplus/common`

#### References

- [GitHub Repo Link](https://github.com/khalilou88/jnxplus)
- [NPM Link](https://www.npmjs.com/package/@jnxplus/common)

#### Maintenance Status

- Last update: ✅ Active
- Open issues: `14`

---

#### Capabilities

| Nx Plugin Name | Run and Cache Tasks | Explore the Graph | Use Code Generators | Enforce module boundaries |
| -------------- | ------------------- | ----------------- | ------------------- | ------------------------- |
| `@nx/gradle`   | Supported ✅        | Supported ✅      | Supported ✅        | Supported ✅              |
| `jnxplus`      | Supported ✅        | Supported ✅      | Supported ✅        | Supported ✅              |
