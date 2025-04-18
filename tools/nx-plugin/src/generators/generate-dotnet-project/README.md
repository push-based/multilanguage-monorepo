# Generate Dotnet Project Generator

This generator generates a new .NET project using predefined conventions and prompts. It supports creating both application and library projects, with customization for language, test setup, template, and path naming.

## Schema Overview

### Required Fields

- `projectType`
- `name`
- `directory`
- `language`
- `testTemplate`
- `pathScheme`
- `dotnetVersion`

## Properties

### `projectType`

- **Type**: `string`
- **Description**: Defines the type of project to generate — either an application or a library.
- **Prompt**: *"What type of project would you like to generate?"*
- **Options**:
  - `application`
  - `library`

---

### `name`

- **Type**: `string`
- **Description**: The name of the project.
- **Prompt**: *"What name would you like to use?"*

---

### `directory`

- **Type**: `string`
- **Description**: The location of the project.
- **Prompt**: *"Where would you like to generate the project? (i.e. dotnet/libs)"*

---

### `language`

- **Type**: `string`
- **Description**: Specifies the programming language for the project.
- **Prompt**: *"Which language should the project use?"*
- **Options**:
  - `C#`
  - `F#`
  - `VB`

---

### `testTemplate`

- **Type**: `string`
- **Description**: Template to use for the test project.
- **Default**: `nunit`
- **Aliases**: `testRunner`
- **Prompt**: *"Which template should be used for creating the tests project"*
- **Options**:
  - `nunit`: NUnit 3 Test Project
  - `xunit`: xUnit Test Project
  - `mstest`: Unit Test Project
  - `none`: No Unit Test Project

---

### `pathScheme`

- **Type**: `string`
- **Description**: Determines the naming convention for paths in the project (NX vs. .NET standard).
- **Default**: `nx`
- **Prompt**: *"Which path naming conventions should the project use?"*
- **Options**:
  - `nx`: NX naming conventions
  - `dotnet`: Dotnet naming conventions

---

### `template`

- **Type**: `list`
- **Description**: Selects a project template to initialize the project from.
- **Prompt**:  
  *"What template should the project be initialized with? (https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new#template-options)"*

- **Options**:  
  The available templates differ based on the selected `language`. Below are common templates for each supported language:

---

### `dotnetVersion`

- **Type**: `string` (semver string - `X.X.X`)
- **Description**: Creates a global.json file with the .NET version.
- **Prompt**:  
  *"What .NET version do you want to use? (keep empty if you want the default)"*

---

#### C# Templates

| Template Name | Short Name | Description |
|---------------|------------|-------------|
| Console App | `console` | A project for creating a command-line application. |
| Class Library | `classlib` | A project for creating a reusable class library. |
| WPF App | `wpf` | A project for creating a Windows Presentation Foundation application. |
| Windows Forms App | `winforms` | A project for creating a Windows Forms application. |
| Worker Service | `worker` | A long-running background service. |
| ASP.NET Core Empty | `web` | An empty ASP.NET Core application. |
| ASP.NET Core MVC | `mvc` | ASP.NET Core application using the MVC pattern. |
| ASP.NET Core Razor Pages | `webapp`, `razor` | ASP.NET Core with Razor Pages. |
| ASP.NET Core Web API | `webapi` | ASP.NET Core Web API project. |
| Blazor WebAssembly App | `blazor` | A Blazor WebAssembly application. |

---

#### F# Templates

| Template Name | Short Name | Description |
|---------------|------------|-------------|
| Console App | `console` | Command-line application in F#. |
| Class Library | `classlib` | Reusable F# class library. |
| ASP.NET Core Empty | `web` | Empty ASP.NET Core application. |
| ASP.NET Core MVC | `mvc` | ASP.NET Core MVC app in F#. |
| ASP.NET Core Web API | `webapi` | ASP.NET Core Web API with F#. |

---

#### Visual Basic Templates

| Template Name | Short Name | Description |
|---------------|------------|-------------|
| Console App | `console` | Command-line application in VB. |
| Class Library | `classlib` | VB class library project. |
| WPF App | `wpf` | Windows Presentation Foundation app in VB. |
| Windows Forms App | `winforms` | Windows Forms application in VB. |

---

## Example Usage

```
npx nx g @nx-multilanguage-monorepo/nx-plugin:generate-dotnet-project 
```

## Custom Source Files

- Example templates for apps and libraries are stored in the `templates` directory.
- The generator uses the `EJS` templating engine by default. You can learn more about its syntax and features in the [EJS documentation](https://ejs.co/).
- The `generateFiles` utility is responsible for injecting values into template placeholders.
