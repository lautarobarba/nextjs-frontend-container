# Dockerignore Expansion & Healthcheck Design

Date: 2026-03-03

## Summary
Expand `.dockerignore` to reduce build context (exclude editor/coverage and `frontend/README.md`) and add a container `HEALTHCHECK` that probes the home page at `/` on port 3000.

## Architecture
- Build context remains the repo root; `.dockerignore` filters unnecessary files.
- Runtime container keeps Node SSR on port 3000 and exposes a health check via HTTP GET to `/`.

## Components
- `.dockerignore`: add `frontend/README.md`, editor configs, and coverage outputs.
- `Dockerfile`: add `HEALTHCHECK` with `curl http://localhost:3000/`.

## Flow
- Docker build uses smaller context and fewer invalidation triggers.
- Health status can be inspected via Docker health reporting.

## Error Handling
- If healthcheck fails, inspect `docker logs` and verify app boot and routing.

## Testing
- Optional: `docker inspect --format='{{json .State.Health}}' <container>` after start.

## Open Questions
- None.
