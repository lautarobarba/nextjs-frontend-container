# Dockerignore Expansion & Healthcheck Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce Docker build context and add a runtime health check for the Next.js SSR container.

**Architecture:** `.dockerignore` filters editor/coverage artifacts and `frontend/README.md`. The runtime container exposes a `HEALTHCHECK` that probes `/` on port 3000.

**Tech Stack:** Docker, Next.js, Node

---

### Task 1: Expand .dockerignore

**Files:**
- Modify: `.dockerignore`

**Step 1: Write the failing test**
- Not applicable.

**Step 2: Run test to verify it fails**
- Not applicable.

**Step 3: Write minimal implementation**
Add the following entries to `.dockerignore`:

```
frontend/README.md
.vscode
.idea
coverage
frontend/.eslintcache
```

**Step 4: Run test to verify it passes**
- Not applicable.

**Step 5: Commit**
```bash
git add .dockerignore
git commit -m "Expand dockerignore for build context reduction"
```

### Task 2: Add healthcheck to Dockerfile

**Files:**
- Modify: `Dockerfile`

**Step 1: Write the failing test**
- Not applicable.

**Step 2: Run test to verify it fails**
- Not applicable.

**Step 3: Write minimal implementation**
Add a `HEALTHCHECK` using curl against `/`:

```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1
```

If `curl` is not present in the base image, install it in the production stage before the healthcheck.

**Step 4: Run test to verify it passes**
- Not applicable (optional: run container and inspect health status).

**Step 5: Commit**
```bash
git add Dockerfile
git commit -m "Add container healthcheck for SSR runtime"
```
