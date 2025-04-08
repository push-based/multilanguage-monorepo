# Handling Multiple .NET Versions in Nx Monorepo

This guide explains how to manage multiple .NET SDK versions in both local and CI environments when working with an Nx monorepo that includes .NET projects alongside other technologies like Node.js or React.

---

## ✅ Local Development

### 1. Pin Global SDK Version

Create a top-level `global.json` to pin the **default** SDK version. This is optional but useful:

```json
{
  "sdk": {
    "version": "9.0.100"
  }
}
```

This ensures that local developers use .NET 9 unless overridden by lower-level `global.json` files.

### 2. Use Per-Project SDK Versions

In each `.NET` project (library or app), define a `global.json` with the exact version it needs:

```
dotnet/
├─ global.json  # .NET 9 as default for all projects
├─ apps/
│  ├─ transactions-api/
├─ libs/
│  ├─ transactions-domain-model/
│  │  └─ global.json  # .NET 7 for domain model
│  └─ transactions-domain-model-test/
```

This structure allows `dotnet` CLI tools to resolve the correct version when run from within the project folder.

### 3. Install Required SDKs

Use [`asdf`](https://asdf-vm.com/) or manual installation to manage SDKs locally.

---

## 🤖 GitHub Actions CI

### 1. Auto-Detect SDKs

The pipeline finds all `global.json` files and installs the required SDKs.

```yaml
- name: Detect .NET SDK versions from global.json
  id: detect-dotnet
  shell: bash
  run: |
    FILES=$(find dotnet -name global.json)
    if [[ -z "$FILES" ]]; then
      echo 'dotnet_sdks=["9.0.x"]' >> $GITHUB_OUTPUT
    else
      VERSIONS=$(grep -ho '"version": *"[^"]*"' $FILES | cut -d '"' -f4 | sort -u)
      JSON=$(echo "$VERSIONS" | jq -R -s -c 'split("\n") | map(select(length > 0))')
      echo "dotnet_sdks=$JSON" >> $GITHUB_OUTPUT
    fi
```

### 2. Install SDKs Dynamically

```yaml
- name: Install .NET SDKs
  run: |
    curl -sSL https://dot.net/v1/dotnet-install.sh -o dotnet-install.sh
    chmod +x dotnet-install.sh

    export DOTNET_ROOT="$HOME/.dotnet"
    export PATH="$HOME/.dotnet:$PATH"

    for version in $(echo '${{ steps.detect-dotnet.outputs.dotnet_sdks }}' | jq -r '.[]'); do
      echo "Installing .NET SDK $version"
      ./dotnet-install.sh --version "$version"
    done
```

### 3. Ensure Correct Path in `nx affected`

Set the environment before running `nx affected`:

```yaml
- name: Run affected targets
  run: |
    export DOTNET_ROOT="$HOME/.dotnet"
    export PATH="$HOME/.dotnet:$PATH"

    npx nx affected -t lint test build e2e --verbose
  env:
    NX_BASE: ${{ env.NX_BASE }}
    NX_HEAD: ${{ env.NX_HEAD }}
```

---

## 🧪 .NET Test Target Customization

### Override Implicit `--no-build` Behavior

If you're using different .NET versions the Nx implicit test target needs to be overridden to work correctly in the CI.

To fix it, explicitly override it in `project.json`:

```json
"test": {
  "executor": "@nx-dotnet/core:test",
  "options": {
    "noBuild": false
  }
}
```

This resolves version mismatch or build artifact issues.

---

## ✅ Summary

| Area            | Recommendation                                                |
| --------------- | ------------------------------------------------------------- |
| Global SDK      | `global.json` in dotnet root with .NET 9                      |
| Per-project SDK | `global.json` in each project (if you want different version) |
| CI detection    | Scan `global.json`, parse SDKs with `jq`                      |
| CI install      | Use `dotnet-install.sh`                                       |
| Test override   | Add `noBuild: false` to test target config                    |

This strategy supports mixed SDK use with minimal friction in both local and CI environments.
