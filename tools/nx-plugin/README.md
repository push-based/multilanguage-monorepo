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


# Custom project references generation

To be able to skip dotnet installation for all devs, we had to re-implement parts of the project reference generation process of the `@nx-dotnet/core` plugin.

## Pros
- we do not require the frontend devs to install the `dotnet` SDK
- generate project references between the dotnet projects the same way the official plugin does it
- project references allow a proper usage of `affected` (including project graph and task graph generation)

## Cons
- we are partially leaning on a custom implementation that might be missing bug-fixes and features in the future versions of the official plugin
- we will most likely need similar workarounds for all the other technology plugins that are coming from different ecosystems


# Custom generators

## `generate-dotnet-project`

- generates explicit project configuration for dotnet apps and libs without the need of `@nx-dotnet/core` plugin listed in `nx.json` (no need to install `dotnet` globally)
- re-uses utility function from the official generator and serves as a wrapper
- please see the generator [docs](./src/generators/generate-dotnet-project/README.md) for more details

