# Handling Multiple Python Versions in an Nx Monorepo

> This approach was not battle tested. It is based on the research and principles applied to .NET

This guide explains how to juggle multiple Python interpreters, isolate dependencies with **Poetry** or **Uv**, and install matching versions automatically in GitHub Actions, while staying compatible with community Nx Python plugins.

---

## ✅ Local Development

### 1 ▪ Workspace‑Wide Default

Add a root **`.python-version`**:

```
3.11.8
```

Tools such as **pyenv**, **asdf‑python**, or **Uv** pick this up during activation.

### 2 ▪ Per‑Project Version Pin

Inside each Python project:

```toml
# pyproject.toml
[tool.poetry.dependencies]
python = ">=3.9,<3.11"
fastapi = "^0.110.3"
```

Poetry enforces the constraint, creating a separate virtual‑env as needed.

### 3 ▪ Interpreter Management Options

| Tool            | Notes                                                       |
| --------------- | ----------------------------------------------------------- |
| **pyenv**       | Compile or download many CPython builds side‑by‑side.       |
| **asdf‑python** | Same UX as other languages under **asdf**.                  |
| **Uv**          | 10–100 × faster installs, plus built‑in version management. |

---

## 🤖 GitHub Actions CI

### 1 ▪ Detect Required Versions

```yaml
- name: Detect Python versions
  id: detect-py
  shell: bash
  run: |
    FILES=$(find . -name pyproject.toml)
    VERS=$(grep -hoP 'python\s*=\s*".*"' $FILES | cut -d '"' -f2 \
           | tr ',' '\n' | grep -oP '[0-9]+\.[0-9]+' | sort -u)
    [[ -z "$VERS" ]] && VERS="3.11"
    echo "py=$(jq -cn --arg v "$VERS" '[($v|split("\n"))|map(select(length>0))]')" >> $GITHUB_OUTPUT
```

The pattern picks up constraints like `>=3.9,<3.11`.

### 2 ▪ Install Interpreters & Cache

```yaml
- uses: actions/setup-python@v5
  with:
    python-version: ${{ steps.detect-py.outputs.py }}
    cache: 'poetry'
```

`setup-python` supports an **array** of versions and integrates with Poetry caching.

### 3 ▪ Install Dependencies per Affected Project

```yaml
- name: Install with Uv
  run: |
    for proj in $(npx nx print-affected --type=app --select=projects); do
      pushd "$proj"
      uv pip install -r requirements.txt --system
      popd
    done
```

Swap `uv pip install` for `poetry install --no-root` if you use Poetry.

### 4 ▪ Run Nx Targets

```yaml
- name: Nx affected
  run: npx nx affected -t lint test build --verbose
```

The Python plugin registers executors that invoke the correct venv automatically.

---

## 🧪 Coverage Across Versions

If you run multiple interpreters (e.g., 3.8 & 3.12) merge coverage files carefully:

```yaml
pytest --cov --cov-report=xml:cov-${{ matrix.python-version }}.xml
```

Upload each XML separately to avoid collisions.

---

## ✅ Summary

| Area               | Recommendation                            |
| ------------------ | ----------------------------------------- |
| Global interpreter | `.python-version` (e.g., 3.11.8)          |
| Per‑project pin    | `pyproject.toml` constraint               |
| CI detection       | Grep `pyproject.toml` for version strings |
| CI install         | `actions/setup-python` + cache            |
| Dependency step    | `uv pip install` or `poetry install`      |
