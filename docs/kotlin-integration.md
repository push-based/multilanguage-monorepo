# Kotlin Environment Setup in an Nx Monorepo

This guide mirrors the .NET workflow for a JVM stack. You’ll install prerequisites, **choose an Nx plugin for Kotlin**, scaffold a Spring Boot API and a shared Kotlin library, wire them together, and validate everything—omitting optional demo endpoints.

---

## 1 ▪ Install JDK & Gradle

Install **OpenJDK 21** (preferred) via [Adoptium Temurin](https://adoptium.net/) or **SDKMAN!**.

Gradle itself is distributed via the **Gradle Wrapper**, which each project generator adds automatically—so no global Gradle install is required.

---

## 2 ▪ Choose an Nx Plugin for Kotlin

| Option                         | Package              | Highlights                                                                                                                               |
| ------------------------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **A. Official Nx Gradle**      | `@nx/gradle`         | Minimal, official; defers to your existing multi‑project Gradle setup.                                                                   |
| **B. JNxPlus** _(recommended)_ | `@jnxplus/nx-gradle` | Community‑driven, feature‑rich generators (Spring Boot, Ktor, etc.), extra targets like `serve`, auto‑configures Gradle + Nx references. |

### Recommendation — Use JNxPlus

We recommend **JNxPlus** because it provides:

- **Rich Generators** – Quickly scaffold Kotlin apps/libs with Spring Boot, Ktor, and more.
- **Built‑In Targets** – Standard Nx commands (`serve`, `build`, `test`, `format`) work out of the box.
- **Automated Configuration** – Gradle settings, dependencies, and Nx references are set up automatically.
- **Consistency** – Aligns with the generator‑heavy workflow we already apply for .NET.

---

## 3 ▪ Install Node.js and npm

Install **Node.js 18 +** and **npm** from [nodejs.org](https://nodejs.org/). Nx depends on them.

---

## 4 ▪ Install Monorepo Dependencies

```bash
npm install
```

---

## 5 ▪ Add the JNxPlus Plugin

```bash
npm add -D @jnxplus/nx-gradle
```

---

## 6 ▪ Initialize the Gradle Environment

```bash
npx nx g @jnxplus/nx-gradle:init
```

This will:

- **UPDATE** `package.json`, `nx.json`, and `workspace.json`
- **CREATE** `gradle.properties`, `settings.gradle.kts`, and `gradle/libs.versions.toml`
- **CREATE** `.config/jnxplus.gradle` — workspace‑wide defaults

---

## 7 ▪ Generate the First Spring Boot API

```bash
npx nx g @jnxplus/nx-gradle:application accounts-api   --directory=kotlin/apps   --framework=spring-boot   --language=kotlin   --tags="lang:kotlin,scope:accounts"
```

---

## 8 ▪ Generate the Shared Kotlin Library

```bash
npx nx g @jnxplus/nx-gradle:library accounts-domain-model   --directory=kotlin/libs   --language=kotlin   --tags="lang:kotlin,scope:accounts"
```

---

## 9 ▪ Inspect Available Commands (Optional)

```bash
npx nx show project kotlin-accounts-api --web
npx nx show project kotlin-accounts-domain-model --web
```

---

## 10 ▪ Verify Build & Run Targets

```bash
# Build the library
npx nx run kotlin-accounts-domain-model:build

# Build the API
npx nx run kotlin-accounts-api:build

# Run the API (Spring Boot)
npx nx run kotlin-accounts-api:serve
```

Spring Boot should start on port 8080; check <http://localhost:8080/actuator/health> for a readiness probe.

---

## ✅ Setup Complete

You now have:

- A functional Spring Boot Kotlin API and a reusable Kotlin library
- Nx project references for proper dependency tracking
- A JVM stack ready for further micro‑services or Kotlin Multiplatform modules
