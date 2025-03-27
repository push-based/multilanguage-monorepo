
# 📁 Folder Structure

This monorepo is organized to support multiple languages, maintain scalable architecture, and encourage separation of concerns. Each level in the structure serves a clear purpose and aligns with good best practices for managing large, multi-stack codebases.

---

## 🧱 First Level – Root Folders

At the root, you’ll find global configuration and technology-specific entry points:

- `docs/` – Project documentation and setup guides
- `.github/` – CI/CD workflows (e.g., GitHub Actions)
- Per-language folders for source code:
  - `react/` – Frontend projects built with React and TypeScript
  - `dotnet/` – .NET Core backend projects and libraries
  - ... and any other language supported by Nx

> 💡 **Why this structure?**
> This layout enforces strong boundaries between tech stacks, keeps tooling isolated, and makes it easier for developers to navigate unfamiliar parts of the monorepo.

---

## 🗂️ Second Level – Application vs Library

Inside each language-specific folder:

- `apps/` – Top-level applications, APIs, or microservices
- `libs/` – Reusable libraries shared across apps (UI, utils, data-access, domain models)

> ✅ Clear separation of deployable units (`apps`) and shareable logic (`libs`)
> leads to better reuse and easier testing, CI, and dependency graph generation.

---

## 🔍 Third Level – Domain-Based Grouping

Within `apps/` and `libs/`, each project is grouped by its business domain or feature area.

### Multi-Language Example

```
dotnet/
├── apps/
│   ├── transactions-api/         # .NET Core Web API for transactions
│   └── transactions-api-test/    # Integration or unit tests for API
└── libs/
    ├── transactions-domain-model/       # Domain models and core logic
    └── transactions-domain-model-test/  # Tests for the domain logic

react/
├── apps/
│   ├── transactions/             # React frontend app
│   └── transactions-e2e/         # End-to-end Cypress tests
└── libs/
    ├── transactions-data-access/    # API clients or hooks (e.g., React Query)
    └── transactions-ui/             # UI components for the transaction domain
```

This reflects a real-world implementation of a shared `transactions` domain across multiple stacks.

---

## ✅ Benefits of This Structure

- **Scalability** – Easily accommodates more teams, features, or technologies.
- **Code Ownership** – Domains can be assigned to teams or individuals.
- **Graph-Aware Tooling** – Nx understands this structure and builds an efficient dependency graph.
- **Isolation** – Tech-specific tooling, CI, and dependencies are isolated and easier to manage.
- **Modularity** – Reusable libraries encourage DRY code and reduce duplication.

---

## 📚 See Also

- [`docs/tags-and-scopes.md`](./tags-and-scopes.md) – for naming conventions and tagging guidelines
- [`docs/nx-multilang-plugins.md`](./nx-multilang-plugins.md) – for supported Nx plugins per language
