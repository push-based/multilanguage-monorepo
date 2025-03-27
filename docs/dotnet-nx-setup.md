# .NET Environment Setup in an Nx Monorepo

This guide provides step-by-step instructions to set up a .NET environment using Nx. You’ll install prerequisites, initialize your Nx workspace for .NET projects, generate a minimal API and a domain models library, add project references, and verify that everything works as expected.

---

## 1. Install .NET

Visit the [.NET Hello World Tutorial – Install](https://dotnet.microsoft.com/en-us/learn/dotnet/hello-world-tutorial/install) page and follow the instructions to install the latest .NET SDK.

The .NET SDK provides the tools required to build and run .NET applications, including the `dotnet` CLI for building, running, testing, and publishing your projects.

---

## 2. Install Node.js and npm

Install Node.js (version 18 or later) and npm. See the official [Node.js download page](https://nodejs.org/) for the installation guide.

Node.js and npm are needed to run Nx, manage the monorepo, and install plugins and dependencies.

---

## 3. Install Monorepo Dependencies

From the root of your monorepo, run:

```bash
npm install
```

This will install all required Node.js dependencies defined in your `package.json`.

---

## 4. Add the .NET Nx Plugin

Install the `@nx-dotnet/core` plugin as a development dependency:

```bash
npm add -D @nx-dotnet/core
```

This plugin provides generators and executors for .NET projects within Nx.

---

## 5. Initialize the .NET Environment

Run the following command to initialize the .NET plugin in your workspace:

```bash
npx nx g @nx-dotnet/core:init
```

This command will:

- `UPDATE package.json`
- `UPDATE nx.json`
- `CREATE .config/dotnet-tools.json`
- `CREATE Directory.Build.props`
- `CREATE Directory.Build.targets`

These updates set up the global .NET tool configuration and build properties for all .NET projects in your monorepo.

Rename `prepare` script in `package.json`:

```json
"dotnet:setup": "nx g @nx-dotnet/core:restore"
```

---

## 6. Generate the First .NET API App

Generate your minimal API with the following command:

```bash
npx nx g @nx-dotnet/core:app transactions-api --directory=dotnet/apps --tags="lang:dotnet,scope:transactions"
```

### Generator Options:

- **Which language should the project use?**  
  `C#` (our choice), `F#`, `VB`

- **Which template should be used for creating the tests project?**  
  `xunit` (our choice), `nunit`, `mstest`, `none`

- **Which path naming conventions should the project use?**  
  `dotnet`, `nx` (our choice)

- **What template should the project be initialized with?**  
  Options: `apicontroller`, `web` (our choice), `grpc`, `webapi`, `mvc`, etc.

These options configure your API project’s language, testing framework, folder structure, and starting template.

---

## 7. Generate the Domain Models Library

Generate a reusable class library with xUnit tests and `dotnet` naming conventions.

Create the library with:

```bash
npx nx g @nx-dotnet/core:lib transactions-domain-model --directory=dotnet/libs --tags="lang:dotnet,scope:transactions"
```

### Generator Options:

- **Test Template:** `xUnit Test Project` (our choice)
- **Path Naming Convention:** `nx`
- **Library Type:** `classlib` (ideal for minimal reusable C# libraries)

---

## 8. Add a Project Reference

Link the API to the domain models library so that the API can use its types.

```bash
npx nx generate @nx-dotnet/core:project-reference --project=dotnet-apps-transactions-api --reference=dotnet-libs-transactions-domain-model
```

---

## 9. Check Available Commands (Optional)

```bash
npx nx show project dotnet-transactions-api --web
npx nx show project dotnet-transactions-domain-model --web
```

---

## 10. Verify Build and Serve Targets

### Build the Library

```bash
npx nx run dotnet-transactions-domain-model:build
```

### Build and Serve the API

```bash
npx nx run dotnet-transactions-api:build
npx nx run dotnet-transactions-api:serve
```

---

## 11. Create a Dummy API (Optional)

### a. Domain Models

in `dotnet/libs/transaction-domain-model` add:

**Transaction.cs**

```csharp
namespace DomainModels.Models;

public class Transaction
{
    public string Label { get; set; } = "";
    public decimal Amount { get; set; }
}
```

**Balance.cs**

```csharp
namespace DomainModels.Models;

public class Balance
{
    public decimal Amount { get; set; }
}
```

### b. Program.cs (Minimal API)

Define two endpoints returning dummy financial data.

Replace content of `Program.cs` in `dotnet/apps/transactions-api/`:

```csharp
using DomainModels.Models;

var builder = WebApplication.CreateBuilder(args);

// Add CORS service
builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowFrontend", policy =>
  {
    policy.WithOrigins("http://localhost:4200", "http://localhost:5173", "http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
  });
});

var app = builder.Build();

// Use CORS (must be before MapGet)
app.UseCors("AllowFrontend");

// Define endpoints
app.MapGet("/balance", () =>
{
  return new Balance { Amount = 3053.34m };
});

app.MapGet("/transactions", () =>
{
  return new List<Transaction>
    {
        new Transaction { Label = "Groceries", Amount = -54.21m },
        new Transaction { Label = "Salary", Amount = 3200 },
        new Transaction { Label = "Electric Bill", Amount = -92.45m }
    };
});

app.Run();

```

---

## 12. Verify Endpoints (Optional)

Open in your browser:

- [http://localhost:5251/transactions](http://localhost:5251/transactions)
- [http://localhost:5251/balance](http://localhost:5251/balance)

---

## ✅ You’re Set

You now have:

- A working .NET Core API with a shared library
- Nx project references for seamless dependency graph
- A scalable setup ready for further features or multi-targeting
