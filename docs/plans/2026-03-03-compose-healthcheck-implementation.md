# Compose Healthcheck Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a service-level healthcheck to the production compose file and document it.

**Architecture:** The compose service healthcheck mirrors the container healthcheck and probes `/` on port 3000.

**Tech Stack:** Docker Compose

---

### Task 1: Add healthcheck to production compose

**Files:**
- Modify: `docker-compose.production.yml`

**Step 1: Write the failing test**
- Not applicable.

**Step 2: Run test to verify it fails**
- Not applicable.

**Step 3: Write minimal implementation**
Add:

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/"]
  interval: 30s
  timeout: 5s
  start_period: 10s
  retries: 3
```

**Step 4: Run test to verify it passes**
- Not applicable.

**Step 5: Commit**
```bash
git add docker-compose.production.yml
git commit -m "Add healthcheck to production compose"
```

### Task 2: Document healthcheck in README

**Files:**
- Modify: `README.md`

**Step 1: Write the failing test**
- Not applicable.

**Step 2: Run test to verify it fails**
- Not applicable.

**Step 3: Write minimal implementation**
Add a brief note in the production section about the healthcheck and how to inspect it, e.g.:

```markdown
Para ver el estado del healthcheck:
$ docker inspect --format='{{json .State.Health}}' <container>
```

**Step 4: Run test to verify it passes**
- Not applicable.

**Step 5: Commit**
```bash
git add README.md
git commit -m "Document production healthcheck"
```
