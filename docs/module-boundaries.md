# Module Boundaries in Nx Monorepos

## Purpose

Module boundaries in a Nx monorepo define the allowed dependencies between different parts of your application. They are crucial for:

* **Maintaining Architectural Integrity:** Enforcing a clear structure and preventing accidental dependencies that can lead to spaghetti code.
* **Improving Code Maintainability:** Making it easier to understand and modify code by limiting the scope of changes.
* **Enabling Independent Development and Deployment:** Allowing teams to work on specific parts of the application without impacting others.
* **Promoting Reusability:** Encouraging the creation of shared libraries and components that can be used across multiple parts of the application.
* **Enforcing Domain-Driven Design (DDD):** Aligning the code structure with the domain model.

## Technology/Language Specific Usage

### 1. JavaScript Ecosystem (@nx/enforce-module-boundaries)

The `@nx/enforce-module-boundaries` ESLint rule is the primary mechanism for defining and enforcing module boundaries in JavaScript-based Nx monorepos.

**Configuration:**

* Boundaries are defined and enforced by the `@nx/enforce-module-boundaries` ESLint rule in the `eslint.config.js` file (or any eslint config file).
* The `depConstraints` array specifies the allowed dependencies between projects.
* Tags are used to group projects and define their relationships (see [Tags and Scopes Docs](./tags-and-scopes.md)).

**Example:**

```js
{
  // ... more ESLint config here

  // @nx/enforce-module-boundaries should already exist within an "overrides" block using `"files": ["*.ts", "*.tsx", "*.js", "*.jsx",]`
  "@nx/enforce-module-boundaries": [
    "error",
    {
      "allow": [],
      // update depConstraints based on your tags
      "depConstraints": [
        {
          "sourceTag": "scope:shared",
          "onlyDependOnLibsWithTags": ["scope:shared"]
        },
        {
          "sourceTag": "scope:admin",
          "onlyDependOnLibsWithTags": ["scope:shared", "scope:admin"]
        },
        {
          "sourceTag": "scope:client",
          "onlyDependOnLibsWithTags": ["scope:shared", "scope:client"]
        }
      ]
    }
  ]

  // ... more ESLint config here
}
```

### 1. .NET Ecosystem
The .NET support in Nx allows you to define module boundaries using the .nx-dotnet.rc.json file.

- The `nx-dotnet` can read the dependency constraints from your workspace's eslint files
- If your workspace does not currently contain eslint, the same dependency constraints can be placed inside your `.nx-dotnet.rc.json` file at workspace root.
- The project dependency constraints are defined within the `moduleBoundaries` section.

#### Example: 

```json
{
  "moduleBoundaries": [
    {
      "onlyDependOnLibsWithTags": ["a", "shared"],
      "sourceTag": "a"
    },
    {
      "onlyDependOnLibsWithTags": ["b", "shared"],
      "sourceTag": "b"
    },
    {
      "onlyDependOnLibsWithTags": ["shared"],
      "sourceTag": "shared"
    }
  ],
  "nugetPackages": {}
}
```

### 3. Kotlin/Java Ecosystem

TODO

### 4. Python Ecosystem

TODO
