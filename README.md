# Nx Multilanguage Monorepo

This is a multilanguage monorepo powered by [Nx](https://nx.dev), designed to support scalable development across multiple languages and frameworks. It enables clear separation of concerns, efficient CI, and consistent tooling for all project types.

---

## 📦 Tech Stack

Currently supported languages and frameworks:

- **React (TypeScript)** – via `@nx/react`
- **.NET Core (C#)** – via `@nx-dotnet/core`
- **Node.js** – via `@nx/node`, `@nx/express`
- **Python** _(planned)_ – via `@nxlv/python`, `nx-python`
- **Kotlin/Java** _(planned)_ – via `@nx/gradle`, `jnxplus`

---

## 📁 Folder Structure

To get an overview of the folders structure visit [`docs/folder-structure.md`](./docs/folder-structure.md).

---

## 🧩 Project Naming

See [`docs/naming-and-tags.md`](./docs/naming-and-tags.md) for details on naming and tagging conventions.

---

## 🧭 Nx Plugin Reference

A detailed comparison of available Nx plugins across languages is available in [`docs/nx-multilang-plugins.md`](./docs/nx-multilang-plugins.md), including capabilities and maintenance status.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js (18+)](https://nodejs.org/)
- [Nx CLI](https://nx.dev/cli) – optional but recommended
- [.NET SDK](https://dotnet.microsoft.com/) (only for C# projects)

### Serving Full Stack

To run a full stack app (React + .NET Core), use the following commands:

```bash
# Install dependencies
npm install
```

```bash
# Start the React app
npx nx run react-transactions-app:serve
```

> Requires a .NET setup

```bash
# Run setup command
npm run dotnet:setup
# Start the .NET Core app
npx nx run dotnet-transactions-api:serve --port=5087
```

### React setup

To serve the react application, use the following commands:

```bash
# Install dependencies
npm install

# Run an app
npx nx serve react-transactions-app
```

### .NET Setup

> This section is only relevant for developers working on .NET Core projects.
> other language contributors can safely skip this.

For step-by-step instructions to add and work with .NET Core projects, see [`docs/dotnet-nx-setup.md`](./docs/dotnet-nx-setup.md).

### View projects graph

```bash
npx nx dep-graph
```

---

## 🧪 CI/CD

TODO

---

## 📚 Documentation

- [`docs/monorepo-benefits.md`](./docs/monorepo-benefits.md)
- [`docs/folder-structure.md`](./docs/folder-structure.md)
- [`docs/naming-and-tags.md`](./docs/naming-and-tags.md)
- [`docs/monorepo-generation.md`](./docs/monorepo-generation.md)
- [`docs/react-lib-generation.md`](./docs/react-lib-generation.md)
- [`docs/nx-multilang-plugins.md`](./docs/nx-multilang-plugins.md)
- [`docs/dotnet-nx-setup.md`](./docs/dotnet-nx-setup.md)
- [`docs/troubleshooting.md`](./docs/troubleshooting.md)

---

made with ❤ by [push-based.io](https://www.push-based.io)
