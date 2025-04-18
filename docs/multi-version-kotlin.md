# Handling Multiple Kotlin / JDK Versions in an Nx Monorepo

> This approach was not battle tested. It is based on the research and principles applied to .NET

This guide shows how to pin Kotlin and Java toolchains locally, wire Gradle projects into Nx, and install matching JDKs automatically in GitHub Actions. It relies on **Gradle Toolchains**, the **Gradle Wrapper**, and the community `@nx/gradle` (or equivalent) plugin.

---

## ✅ Local Development

### 1 ▪ Workspace‑Wide Defaults

Create two files at the repo root:

```properties
# gradle.properties
org.gradle.java.installations.auto-download=true
kotlin.version=2.0.0
```

```toml
# gradle/libs.versions.toml
[versions]
jvm    = "21"
kotlin = "2.0.0"
```

- `auto-download` lets Gradle fetch any missing JDK automatically.
- Version catalogs keep Kotlin and dependency versions centralized.

### 2 ▪ Per‑Project Overrides

Override the toolchain only where needed:

```kotlin
// build.gradle.kts
kotlin {
  jvmToolchain(17)
}
```

Gradle picks JDK 17 for this module, but still uses JDK 21 elsewhere.

### 3 ▪ SDK Management Suggestions

- **SDKMAN!** auto‑switches JDKs on `cd` into a project.
- **asdf‑vm** offers the same via `asdf java`.
- Always run builds with the **Gradle Wrapper** (`./gradlew`) so everyone uses the same Gradle version.

---

## 🤖 GitHub Actions CI

### 1 ▪ Detect Required JDKs

```yaml
- name: Detect JDK toolchains
  id: detect-jdk
  shell: bash
  run: |
    FILES=$(find . -name build.gradle.kts -o -name build.gradle)
    VERS=$(grep -hoP 'jvmToolchain\(\K[0-9]+' $FILES | sort -u)
    [[ -z "$VERS" ]] && VERS="21"
    echo "jdks=$(jq -cn --arg v "$VERS" '[($v|split("\n"))|map(select(length>0))]')" >> $GITHUB_OUTPUT
```

The regex scrapes `jvmToolchain()` declarations.

### 2 ▪ Install JDKs & Cache Gradle

```yaml
- uses: actions/setup-java@v4
  with:
    distribution: temurin
    java-version: ${{ steps.detect-jdk.outputs.jdks }}
    cache: gradle
```

`setup-java` accepts an **array** of versions and caches the Gradle home.

### 3 ▪ Run Nx Targets

```yaml
- name: Affected Gradle builds
  run: npx nx affected -t build test lint --verbose
```

`@nx/gradle` automatically calls each project’s wrapper, so the correct JDK is used.

---

## 🧪 Test Target Nuances

If mixing JVM‑only and KMP tests, force a rebuild:

```jsonc
"test": {
  "executor": "@nx/gradle:run",
  "options": { "args": ["test"], "noBuild": false }
}
```

Setting `noBuild: false` prevents stale byte‑code when switching toolchains.

---

## ✅ Summary

| Area             | Recommendation                                    |
| ---------------- | ------------------------------------------------- |
| Global toolchain | `gradle.properties` + Wrapper (Kotlin 2 / JDK 21) |
| Per‑project pin  | `jvmToolchain(XX)` in `build.gradle.kts`          |
| CI detection     | Grep `jvmToolchain()` for unique versions         |
| CI install       | `actions/setup-java` with version array           |
| Test override    | Executor with `noBuild: false`                    |
