# Production Compose & Manual CI/CD Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Run production from a prebuilt image hosted in the GitLab registry, with a simplified compose file and documented manual build/push steps.

**Architecture:** The runtime container only serves static assets via Nginx on port 80. The production compose file references the registry image directly and maps `FRONT_PORT` on the host to container port 80. Manual CI/CD steps (build, push, deploy) are documented in the README.

**Tech Stack:** Docker, Docker Compose, Nginx, Node (build stage)

---

### Task 1: Simplify production compose to use registry image

**Files:**
- Modify: `docker-compose.production.yml`

**Step 1: Write the failing test**
- Not applicable (config-only change).

**Step 2: Run test to verify it fails**
- Not applicable.

**Step 3: Write minimal implementation**
Update `docker-compose.production.yml` so the service uses only `image:` and maps `${FRONT_PORT}:80`. Remove build-time commands and bind mount volume. Example target shape:

```yaml
services:
  next_template:
    image: registry.desarrollosur.com.ar/lautarobarba/next_template:latest
    restart: always
    env_file: .env
    environment:
      - PORT=80
    ports:
      - ${FRONT_PORT}:80
```

Notes:
- Keep `name:` and `container_name:` if desired.
- `env_file` can stay if `.env` holds `FRONT_PORT`.

**Step 4: Run test to verify it passes**
- Not applicable.

**Step 5: Commit**
```bash
git add docker-compose.production.yml
git commit -m "Simplify production compose to run prebuilt image"
```

### Task 2: Document manual CI/CD in README

**Files:**
- Modify: `README.md`

**Step 1: Write the failing test**
- Not applicable (docs change).

**Step 2: Run test to verify it fails**
- Not applicable.

**Step 3: Write minimal implementation**
Add a production section with manual steps:

```markdown
## Produccion (manual)

1. Login al registry:
   docker login registry.desarrollosur.com.ar

2. Build:
   docker build -f Dockerfile -t registry.desarrollosur.com.ar/lautarobarba/next_template:latest .

3. Push:
   docker push registry.desarrollosur.com.ar/lautarobarba/next_template:latest

4. Deploy:
   FRONT_PORT=XXXX docker compose -f docker-compose.production.yml up -d
```

Also add a short note that Nginx listens on 80 and `FRONT_PORT` maps to that.

**Step 4: Run test to verify it passes**
- Not applicable.

**Step 5: Commit**
```bash
git add README.md
git commit -m "Document manual build/push/deploy for production"
```

### Task 3: Sanity check (optional)

**Files:**
- None

**Step 1: Write the failing test**
- Not applicable.

**Step 2: Run test to verify it fails**
- Not applicable.

**Step 3: Write minimal implementation**
Run a local smoke test if desired:

```bash
docker run --rm -p 8080:80 registry.desarrollosur.com.ar/lautarobarba/next_template:latest
curl http://localhost:8080
```

**Step 4: Run test to verify it passes**
Expect a 200 response or HTML payload.

**Step 5: Commit**
- Not applicable.
