# Release Flow Documentation

This document provides an overview of the complete workflow—from code commit through testing and versioning to the final release/publish—designed for developers working with .NET and React. It details how the CI/CD pipelines, based on GitHub Actions, orchestrate the process, integrate conventional commits with semantic versioning, and handle error scenarios and best practices. For additional details, please refer to the [ci-cd.md](ci-cd.md), [release-publish.md](release-publish.md), and [nx-plugin documentation](./nx-plugin).

---

## 1. Overview of the Workflow

The release flow is divided into several phases:

- **Commit & PR Validation:**  
  Every commit and pull request undergoes comprehensive testing, linting, and build verification using the `ci.yml` workflow.

- **Release Preparation:**  
  On every merge to the `main` branch, the release process is automatically triggered. This phase uses semantic versioning and changelog generation based on conventional commits, orchestrated by the `ci.yml` workflow with the help of the [@jscutlery/semver](https://www.npmjs.com/package/@jscutlery/semver) package.

- **Publishing:**  
  The publishing phase uploads the final artifacts:

  - **Node/JS Packages:** via the `npm-publish.yml` workflow.
  - **.NET Libraries:** via the `nuget-publish.yml` workflow.
  - **React App Deployment:** via the `deploy.yml` workflow (triggered on path-specific pushes).

- **Custom Targets:**  
  The custom targets provided by the `nx-plugin` enhance the release process:
  - **version:** Orchestrates versioning and changelog generation.
  - **pack:** Packages .NET libraries.
  - **publish:** Publishes .NET packages to NuGet.

---

## 2. Detailed Workflow Phases

### 2.1. Commit and Continuous Integration (CI)

- **Trigger:** Pull requests to the `main` branch.
- **Workflow:** `ci.yml`
- **Key Steps:**
  - **Repository Checkout:** Fetch the full commit history.
  - **Affected Command Execution:** Run `nx affected -t lint test build e2e --verbose` to determine and validate the affected projects.
- **Outcome:** Only validated code is merged, ensuring a stable base for the release process.

### 2.2. Release Preparation

- **Trigger:** Merge to the `main` branch.
- **Workflow:** `ci.yml`
- **Key Steps:**
  - **Versioning & Changelog Generation:**  
    Utilizes the [@jscutlery/semver](https://www.npmjs.com/package/@jscutlery/semver) package to automatically determine new version numbers based on conventional commits. This process calculates the version and updates the changelog.
  - **Git Tagging:**  
    Updates the `last-release` tag (force-pushed) to track the latest version.
- **Outcome:** A new release version is prepared and documented with the associated changelog entries.

### 2.3. Artifact Publishing

#### Node/JS Package Publishing

- **Trigger:** Push of Git tags matching `v*.*.*`
- **Workflow:** `npm-publish.yml`
- **Key Steps:**
  - **Repository Checkout and Setup:** Set up Node.js.
  - **Publish Command:** Run the `nx-release-publish` target to package and publish Node.js artifacts.
  - **Configuration:** Ensure that the private registry is configured in `package.json` or `nx.json`, and that `NPM_ACCESS_TOKEN` is set for authentication.
- **Outcome:** JavaScript packages are published to the specified private registry.

#### .NET Library Publishing

- **Trigger:** Push of Git tags matching `v*.*.*`
- **Workflow:** `nuget-publish.yml`
- **Key Steps:**
  - **Repository Checkout and Setup:** Set up the .NET SDK.
  - **Artifact Preparation:** Download build artifacts to a specified directory (e.g., `dist/dotnet/libs`).
  - **Packaging and Publishing:**  
    Use the custom targets (`pack` and `publish`) to package and then publish the .NET libraries. Authentication is handled via the `NUGET_API_KEY` secret.
- **Outcome:** .NET libraries are packaged and published to the NuGet registry.

#### React App Deployment

- **Trigger:** Pushes to `main` affecting specific React paths.
- **Workflow:** `deploy.yml`
- **Key Steps:**
  - **Repository Checkout and Setup:** Set up Node.js.
  - **Build:** Execute `npx nx build react-transactions-app --prod` to build the React app for production.
  - **Deployment:** Deploy the built application using the configured method (e.g., Netlify, AWS, Firebase, or Vercel).
- **Outcome:** The production-ready React application is deployed.

---

## 3. References and Further Reading

- **CI/CD Setup and Overview:**  
  See [ci-cd.md](./ci-cd.md) for detailed CI/CD configurations.
- **Release and Publish Process:**  
  Additional details on release preparation and artifact publishing are available in [release-publish.md](./release-publish.md).
- **nx-plugin Documentation:**  
  More information on custom target generation can be found in the [nx-plugin documentation](../tools/nx-plugin/README.md).
