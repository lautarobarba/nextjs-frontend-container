# Next.js SSR Runtime Container Design

Date: 2026-03-03

## Summary
Production will run a prebuilt image from the GitLab registry that serves a Next.js SSR app via a Node runtime. The container exposes port 3000, and the production compose file maps `FRONT_PORT` on the host to container port 3000. A reverse proxy handles external routing.

## Architecture
- Image is built externally and pushed to the GitLab registry.
- `docker-compose.production.yml` uses `image:` only (no build).
- Runtime container uses Node to run `next start` (SSR), no Nginx inside the container.

## Components
- `Dockerfile`: multi-stage build optimized for Next SSR using `npm ci` and `output: "standalone"`.
- `docker-compose.production.yml`: maps `${FRONT_PORT}:3000`.
- `.dockerignore`: excludes unnecessary files to reduce build context.
- `README.md`: update production steps for SSR runtime and port mapping.

## Flow
1. Build: `docker build -f Dockerfile -t registry.desarrollosur.com.ar/lautarobarba/next_template:latest .`
2. Push: `docker push registry.desarrollosur.com.ar/lautarobarba/next_template:latest`
3. Deploy: `FRONT_PORT=XXXX docker compose -f docker-compose.production.yml up -d`
4. Proxy routes to `localhost:${FRONT_PORT}`.

## Error Handling
- Build failures: inspect `npm ci` and `next build` output.
- Runtime failures: check `docker logs` and ensure proxy points to `FRONT_PORT`.
- SSR routing issues: verify dynamic routes and Next config.

## Testing
- Local image check: `docker run -p 3000:3000 registry.desarrollosur.com.ar/lautarobarba/next_template:latest` and open `http://localhost:3000`.
- Compose check: `curl http://localhost:$FRONT_PORT`.

## Open Questions
- None.
