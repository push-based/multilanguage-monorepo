# 🏷️ Project Naming Conventions & Tags

Consistent naming and tagging in a monorepo are essential for maintainability, discoverability, and enforcing architectural boundaries. This guide explains how to name projects and apply tags effectively using Nx.

---

## 📛 Project Naming Conventions

Each project name should follow this structure:

```
<language>-<domain>-<type>
```

### ✅ Naming Rules

- Must **start with the language/framework** (e.g., `react`, `dotnet`, `node`)
- Must include the **domain or feature scope** (e.g., `transactions`, `auth`)
- Must end with a **type suffix** indicating the purpose of the project

### 🧠 Why This Matters?

- Enables fast identification of a project’s stack and purpose
- Keeps the dependency graph organized
- Helps enforce code boundaries and code ownership

### 📦 Examples

- `react-transactions-app` – A React frontend app in the transactions domain
- `react-transactions-ui` – A shared UI library for the transactions domain
- `react-transactions-data-access` – A library handling API/data logic for transactions

---

## 🏷️ Nx Project Tags

Nx supports project tagging, which we use to organize, group, and apply rules to projects based on language and domain.

We use two main types of tags:

- `lang:<language>` – Language or framework the project is written in
- `scope:<domain>` – Business domain or feature scope

---

### 🧪 Language Tags

Use the `lang:` prefix to specify the technology stack.

#### Examples

- `lang:react` or `lang:ts` – React + TypeScript
- `lang:dotnet` – .NET Core (C#)
- `lang:python` – Python
- `lang:kotlin` – Kotlin/Java
- `lang:node` – Node.js

> 💡 Use these tags for filtering projects, running affected tests/builds, or setting tag-based dependency rules.

---

### 🌐 Scope Tags

Use the `scope:` prefix to identify the business or feature domain.

#### Examples

- `scope:transactions` – Code related to the transaction domain
- `scope:shared` – Shared libraries used across multiple domains
- `scope:auth` – Authentication-specific modules (if applicable)

---

### 🔮 Potential future tags

| Tag Type   | Purpose                 | Example              |
| ---------- | ----------------------- | -------------------- |
| `lang`     | Language or stack       | `lang:python`        |
| `scope`    | Domain or business area | `scope:transactions` |
| `type`     | Function or role        | `type:data-access`   |
| `access`   | Visibility boundary     | `access:internal`    |
| `team`     | Team ownership          | `team:auth`          |
| `runtime`  | Execution context       | `runtime:server`     |
| `platform` | Target platform         | `platform:android`   |

---

## ✅ Benefits of Tags

- **Graph Filtering** – Easily visualize subsets of the dependency graph
- **Linting & Rules** – Enforce dependency constraints (e.g., shared code cannot depend on app code)
- **Automation** – Use in CI/CD to run tasks on affected scopes/languages only

---

## 📚 Related Docs

- [`docs/folder-structure.md`](./folder-structure.md)
- [`docs/nx-multilang-plugins.md`](./nx-multilang-plugins.md)
