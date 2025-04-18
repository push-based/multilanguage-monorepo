# Python Environment Setup in an Nx Monorepo

This guide walks you through installing prerequisites, initializing Python support in Nx, scaffolding a FastAPI service and a shared Pydantic models library, linking them, and verifying that everything works—mirroring the .NET setup but _without_ the optional “Dummy API” steps.

---

## 1 ▪ Install Python

Install **Python 3.11** (or later) from the [official downloads page](https://www.python.org/downloads/) or via a version manager such as **pyenv** or **asdf‑python**.  
The interpreter provides the `python` and `pip` CLIs required by Nx Python plugins.

---

## 2 ▪ Install Node.js and npm

Install **Node.js 18 +** and **npm** from [nodejs.org](https://nodejs.org/).  
Nx itself is a Node‑based tool, so both are mandatory.

---

## 3 ▪ Install Monorepo Dependencies

From the repo root, run:

```bash
npm install
```

This installs all Node packages declared in `package.json`.

---

## 4 ▪ Add the Nx Python Plugin

Add the community plugin as a dev‑dependency:

```bash
npm add -D @nxlv/python
```

This plugin supplies Nx generators and executors for Python projects.

---

## 5 ▪ Initialize the Python Environment

```bash
npx nx g @nxlv/python:init
```

The generator will:

- **UPDATE** `package.json` & `nx.json`
- **CREATE** `.python-version` (3.11 by default)
- **CREATE** `.nxlv/python.cfg` for per‑workspace settings

Rename the generated `prepare` script to make tool‑bootstrap explicit:

```json
"python:setup": "nx g @nxlv/python:install-tools"
```

---

## 6 ▪ Generate the First FastAPI App

```bash
npx nx g @nxlv/python:app payments-api   --directory=python/apps   --framework=fastapi   --tags="lang:python,scope:payments"
```

---

## 7 ▪ Generate the Pydantic Models Library

```bash
npx nx g @nxlv/python:lib payments-domain-model   --directory=python/libs   --type=pydantic   --tags="lang:python,scope:payments"
```

---

## 8 ▪ Add a Project Reference

```bash
npx nx g @nxlv/python:project-reference   --project=python-apps-payments-api   --reference=python-libs-payments-domain-model
```

---

## 9 ▪ Inspect Available Commands (Optional)

```bash
npx nx show project python-payments-api --web
npx nx show project python-payments-domain-model --web
```

---

## 10 ▪ Verify Build & Serve Targets

```bash
# Build shared models
npx nx run python-payments-domain-model:build

# Build the API (virtual‑env & wheel)
npx nx run python-payments-api:build

# Serve the API with Uvicorn
npx nx run python-payments-api:serve
```

You should see **Uvicorn** start on port 8000; open <http://localhost:8000/docs> for the auto‑generated Swagger UI.

---

## ✅ Setup Complete

You now have:

- A working FastAPI service and shared Pydantic models
- Nx graph awareness via project references
- A foundation ready for additional Python micro‑services or libraries
