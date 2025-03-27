# Project Naming Conventions

## Project Names
- project name has to start with the language/framework
- it has to contain domain/scope
- it has to end with a suffix based on the project type

### Examples
- `react-transactions-app`
- `react-transactions-ui`
- `react-transactions-data-access`

## Project Tags

- Nx project tags can be used to differentiate between frameworks, scopes, types, et.c
- there are two kinds of tags we support, `lang` and `scope`

### Language Tag
- `lang` tag for the languages and frameworks
 
#### Examples 
- `lang:react` or lang:ts – for React/TypeScript projects
- `lang:dotnet` – for .NET Core projects
- `lang:python` – for future Python projects
- `lang:kotlin` – for future Kotlin projects
- `lang:node` – for Node.js projects (if you want to distinguish backend Node projects)

### Scope Tag
- `scope` tag for the domain/scope of a project

#### Examples
- `scope:transactions` for the transaction-specific code
- `scope:shared` for  the shared code used in multiple domains
