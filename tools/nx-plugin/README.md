# nx-plugin

This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build nx-plugin` to build the library.

## Running unit tests

Run `nx test nx-plugin` to execute the unit tests via [Vitest](https://vitest.dev/).

# Custom target generation

This custom plugin generates following custom targets that are inferred in a project configuration during the project graph computation phase:

## `version`
- inferred to all projects regardless the type and language
- uses `@jscutlery/semver:version` executor to orchestrate the versioning process including the changelog generation
- for more info see the release [docs](../../docs/release-publish.md) and `@jscutlery/semver` [Github repo](https://github.com/jscutlery/semver)

## `pack`
- inferred to dotnet libs only
- uses `dotnet pack` command for package creation and prepares library for publishing
- for more info see the official [docs](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-pack)

## `publish`
- inferred to dotnet libs only
- uses `dotnet nuget push` command to publish a nuget package created with `pack` command
- for more info see the official [docs](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-nuget-push)
