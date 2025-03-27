# 🚀 Monorepo Benefits

This document outlines the key advantages of using Nx in a multi-language monorepo setup. These benefits go beyond traditional build systems, providing smart dependency awareness, optimized CI, and consistent developer experience across stacks.

---

## 📈 Dependency Graph

Nx generates a live project graph that visualizes how projects and libraries are connected.

- Run locally:

  ```bash
  npx nx graph
  ```

- Use it to:
  - Understand project dependencies
  - Prevent circular dependencies
  - Discover how changes propagate

---

## 🧱 Module Boundary Enforcement

Nx uses tags like `lang` and `scope` to enforce clear separation between layers.

- Prevent unintended imports (e.g. frontend → backend)
- Define constraints
- Customize rules per language or project type

---

## ⚡ Smart Task Caching

Nx provides **task-level caching**, which works beyond typical .NET incremental builds.

### 🆚 .NET Without Nx

- `.NET` projects use MSBuild’s timestamp-based incremental builds
- ✅ Works _locally_
- ❌ No cache across CI runs
- ❌ No tracking of affected projects
- ❌ No coordination across multiple projects or stacks

### ✅ .NET With Nx

- Nx caches **any command output** (build, lint, test, format)
- Works across local + CI environments
- Rebuilds only if **inputs changed**
- Supports `npx nx affected:*` commands to run only what’s needed

> 💡 While .NET projects support basic incremental builds via MSBuild, Nx extends this with task-level caching, affected project detection, and cross-stack coordination — benefits not available natively in traditional .NET repos.

---

## 🧪 Affected Projects

Nx tracks what has changed and runs commands only for the impacted projects.

```bash
npx nx affected:build
npx nx affected:test
```

Reduces CI time significantly and avoids rebuilding or retesting everything on every PR.

---

## 🧰 Target Inspection

You can inspect a project’s configuration and available targets:

```bash
npx nx show project <project-name>
```

Or open the project graph in a browser to view structure and metadata.

---

## 🧩 Multi-Language Support

Nx supports consistent tooling across:

- **React / TypeScript** – `@nx/react`
- **.NET Core / C#** – `@nx-dotnet/core`
- **Node.js** – `@nx/node`, `@nx/express`
- **Python / Kotlin** – via community plugins

Each tech stack can have its own isolated boundaries, generators, and CI logic — all unified under one system.

---

## 🔁 CI/CD Friendly

Nx works well with CI systems. Combine `.github/` workflows with affected commands and caching to:

- Run only impacted builds/tests
- Reuse computation between runs
- Save time and cost in CI

---

## 📚 Related Docs

- [`folder-structure.md`](./folder-structure.md)
- [`tags-and-scopes.md`](./tags-and-scopes.md)
- [`project-tags.md`](./project-tags.md)
- [`dotnet-nx-setup.md`](./dotnet-nx-setup.md)
