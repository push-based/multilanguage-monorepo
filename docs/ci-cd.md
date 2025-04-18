# CI/CD Setup for .NET and React

This document describes the continuous integration and deployment (CI/CD) setup using GitHub Actions.

---

## 🔁 CI - Affected (`ci.yml`)

**Triggered by:** `pull_request` on `main`

**Purpose:** Run `nx affected` to lint, test, build, and run e2e tests only for impacted projects.

**Key Steps:**

- Checkout repository with full history
- Set SHAs for affected command
- Setup Node.js via custom action
- Install Cypress (cached)
- Setup .NET SDK via custom action
- Run affected targets with:
  ```bash
  npx nx affected -t lint test build e2e --verbose
  ```

---

> Detailed information about publishing and release process can be found in [release-publish.md](./release-publish.md).

## 🚀 React App Deployment (`deploy.yml`)

**Triggered by:** `push` to `main` on specific React paths

**Purpose:** Build and deploy the `react-transactions-app` to production (e.g., Netlify, AWS, Firebase, Vercel).

**Key Steps:**

- Checkout full repo
- Setup Node.js
- Build React app:
  ```bash
  npx nx build react-transactions-app --prod
  ```
- Deploy using preferred method (Netlify example shown)

---

## 🚀 .NET App Deployment

TBD

---

## 📦 .NET Library Publishing (`nuget-publish.yml`)

**Triggered by:** Push of Git tags matching `v*.*.*`

**Purpose:** Package and publish .NET libraries to NuGet.

**Key Steps:**

- Checkout repo
- Setup .NET SDK via custom action
- Download build artifacts to `dist/dotnet/libs`
- Pack using:
  ```bash
  npx nx affected --target=pack
  ```
- Publish using:
  ```bash
  npx nx affected --target=publish --args="--source https://api.nuget.org/v3/index.json --api-key ${{ secrets.NUGET_API_KEY }}"
  ```

---

## 📦 Node/JS Package Publishing (`npm-publish.yml`)

**Triggered by:** Push of Git tags matching `v*.*.*`

**Purpose:** Publish affected Node.js/JavaScript packages to npm.

**Key Steps:**

- Checkout repo
- Setup Node.js
- Print Nx environment info
- Publish with provenance:
  ```bash
  npx nx affected -t nx-release-publish
  ```

---

## 🧩 Versioning (`ci.yml`)

**Triggered by:** Push to `main`

**Purpose:** Calculate new versions and create a `last-release` tag for version tracking.

**Key Steps:**

- Checkout full repo history
- Setup Node.js
- Configure Git identity and remote
- Run version command:
  ```bash
  npx nx affected --target=version --base=last-release --parallel=1
  ```
- Force-push `last-release` tag (skipping CI)

---

## 🛠 Node Setup Composite Action (`setup-node/action.yml`)

- Uses `actions/setup-node@v4`
- Installs Node.js based on `package.json`
- Runs `npm ci` with caching enabled

---

## 🛠 .NET SDK Setup Composite Action (`setup-dotnet/action.yml`)

- Detects required SDKs from all `global.json` files
- Installs SDKs using official dotnet-install script
- Supports multiple SDK versions via looped install

---

## ✅ Summary

| Workflow            | Trigger      | Purpose                         |
| ------------------- | ------------ | ------------------------------- |
| `ci.yml`            | PR to main   | Lint, test, build, e2e affected |
| `deploy.yml`        | Push to main | Build & deploy React app        |
| `nuget-publish.yml` | Tag v*.*.\*  | Pack & publish .NET libraries   |
| `npm-publish.yml`   | Tag v*.*.\*  | Publish JS packages to npm      |
| `ci.yml`            | Push to main | Bump versions, tag last-release |
