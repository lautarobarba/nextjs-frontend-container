# Next.js SSR Runtime Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Optimize the Docker build for Next.js SSR runtime, reduce build context, and adjust production compose/README for Node runtime on port 3000.

**Architecture:** Multi-stage Dockerfile builds the Next app using `npm ci` and `output: "standalone"`. The runtime stage copies only the standalone output and static assets into a slim Node image. Production compose pulls a prebuilt image and maps host `FRONT_PORT` to container 3000.

**Tech Stack:** Docker, Docker Compose, Next.js, Node

---

### Task 1: Add .dockerignore to reduce build context

**Files:**
- Create: `.dockerignore`

**Step 1: Write the failing test**
- Not applicable.

**Step 2: Run test to verify it fails**
- Not applicable.

**Step 3: Write minimal implementation**
Create `.dockerignore` with entries:

```
.git
.gitignore
node_modules
frontend/node_modules
frontend/.next
frontend/out
frontend/.turbo
*.log
.env
.env.*
Dockerfile*
docker-compose*.yml
docs
```

**Step 4: Run test to verify it passes**
- Not applicable.

**Step 5: Commit**
```bash
git add .dockerignore
git commit -m "Add dockerignore to shrink build context"
```

### Task 2: Optimize Dockerfile for Next.js SSR standalone

**Files:**
- Modify: `Dockerfile`
- Modify: `frontend/next.config.ts`

**Step 1: Write the failing test**
- Not applicable.

**Step 2: Run test to verify it fails**
- Not applicable.

**Step 3: Write minimal implementation**
Update `frontend/next.config.ts` to enable standalone output:

```ts
const nextConfig: NextConfig = {
  output: "standalone",
};
```

Update `Dockerfile` to build in `/app` using `npm ci` and copy only standalone output:

```dockerfile
ARG NODE_IMAGE=node:22-slim

FROM ${NODE_IMAGE} AS deps
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

FROM ${NODE_IMAGE} AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY frontend/ ./
RUN npm run build

FROM ${NODE_IMAGE} AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

**Step 4: Run test to verify it passes**
- Not applicable (optional: `docker build -t test-ssr .`).

**Step 5: Commit**
```bash
git add Dockerfile frontend/next.config.ts
git commit -m "Optimize Dockerfile for Next.js standalone SSR"
```

### Task 3: Update production compose and README for SSR runtime

**Files:**
- Modify: `docker-compose.production.yml`
- Modify: `README.md`

**Step 1: Write the failing test**
- Not applicable.

**Step 2: Run test to verify it fails**
- Not applicable.

**Step 3: Write minimal implementation**
Update `docker-compose.production.yml` port mapping to `${FRONT_PORT}:3000`.

Update README production section to mention SSR runtime and port 3000 mapping. Example snippet:

```markdown
4. Deploy (Next.js SSR escucha en 3000 dentro del contenedor; `FRONT_PORT` se mapea a 3000):

$ FRONT_PORT=XXXX docker compose -f docker-compose.production.yml up -d
```

**Step 4: Run test to verify it passes**
- Not applicable.

**Step 5: Commit**
```bash
git add docker-compose.production.yml README.md
git commit -m "Adjust production compose and README for SSR runtime"
```
