# Conventional Commits Documentation

This document outlines the guidelines and best practices for writing commit messages according to the Conventional Commits specification. Following these guidelines enables automated semantic versioning, changelog generation, and a consistent commit history across our projects.

---

## 1. Overview

The Conventional Commits specification provides a standardized format for commit messages. It facilitates:

- **Automated Versioning:**  
  Our CI/CD pipelines use the [@jscutlery/semver](https://www.npmjs.com/package/@jscutlery/semver) package to determine new version numbers based on commit messages.
- **Clear Project History:**  
  Consistent commit messages help team members quickly understand the changes made.
- **Enhanced Changelog Generation:**  
  Commit messages are parsed to generate detailed changelogs, improving traceability between releases.

---

## 2. Commit Message Structure

A conventional commit message is divided into three parts: the header, the body, and the footer.

### 2.1. Header

The header must follow this format:

`<type>(<scope>): <subject>`

- **type:** Specifies the kind of change. Common types include:

  - `feat`: A new feature
  - `fix`: A bug fix
  - `docs`: Documentation only changes
  - `style`: Code style changes (formatting, missing semicolons, etc.) without affecting functionality
  - `refactor`: Code restructuring without adding features or fixing bugs
  - `perf`: Performance improvements
  - `test`: Adding or updating tests
  - `build`: Changes affecting the build system or external dependencies
  - `ci`: Changes to our CI/CD configuration files
  - `chore`: Other changes that do not modify source or test files

- **scope (optional):** Provides context about which part of the codebase is affected (e.g., `auth`, `ui`, `api`).

- **subject:** A short, imperative description of the change.

**Examples:**

`feat(auth): add JWT authentication support`

`fix(ui): resolve alignment issues in header`

`docs: update README with setup instructions`

### 2.2. Body

- **Purpose:**  
  The body provides additional context about the change, such as the motivation, reasoning, and any extra details that help reviewers understand the impact of the commit.
- **Formatting:**  
  The body should be wrapped at 72 characters.

### 2.3. Footer

- **Purpose:**  
  The footer includes metadata such as issue references and notices about breaking changes.
- **Breaking Changes:**  
  If a commit introduces a breaking change, include a line starting with `BREAKING CHANGE:` followed by a detailed explanation.
- **Example:**

```
refactor(api): update endpoint naming conventions

Updated API endpoints to better reflect resource hierarchy. This change simplifies client-side integration but requires updating API calls.

BREAKING CHANGE: The /v1/users endpoint is now /v2/users.
```

---

## 3. Benefits of Using Conventional Commits

- **Automated Release Flow:**  
  Our release workflows (`ci.yml`, `npm-publish.yml`, `nuget-publish.yml`) rely on these commit messages to automate version bumps and generate changelogs.

- **Consistent Collaboration:**  
  A uniform commit message format makes it easier for team members to understand the project history and rationale behind changes.

- **Enhanced Tooling:**  
  Tools that parse commit messages can automatically determine the next semantic version, ensuring that releases are consistent with the changes introduced.

---

## 4. Best Practices

- **Be Clear and Concise:**  
  Write clear, descriptive messages. The header should summarize the change, while the body can explain details.

- **Use the Imperative Mood:**  
  Commit messages should be written as if giving commands (e.g., "add", "fix", "update") to maintain consistency.

- **Reference Issues:**  
  Include references to issue trackers when relevant (e.g., `Fixes #123`) to provide context and traceability.

- **Document Breaking Changes:**  
  Clearly document any breaking changes in the footer to alert team members and downstream consumers.

- **Maintain Consistency:**  
  Adhere to these guidelines across all commits to ensure our automated processes work reliably.

---

## 5. Integration with Our CI/CD Process

Our CI/CD setup leverages conventional commits to:

- **Determine Versioning:**  
  The `ci.yml` workflow uses commit messages to calculate the next semantic version using [@jscutlery/semver](https://www.npmjs.com/package/@jscutlery/semver).

- **Generate Changelogs:**  
  Commit messages are parsed to create detailed changelogs during the release process.

- **Trigger Automated Publishing:**  
  Accurate commit messages help in selectively deploying only the relevant changes to production.

---

## 6. Additional Resources

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [@jscutlery/semver NPM Package](https://www.npmjs.com/package/@jscutlery/semver)
- [Git Commit Message Guidelines by Chris Beams](https://chris.beams.io/posts/git-commit/)
