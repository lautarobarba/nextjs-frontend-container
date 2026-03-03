# Docker Compose Production Optimization Design

Date: 2026-03-03

## Summary
Production will run a prebuilt image from the GitLab registry. The container serves static assets with Nginx only. The production compose file will reference the image directly and map a configurable host port to container port 80.

## Architecture
- Image is built externally (manual CI/CD for now) and pushed to the GitLab registry.
- `docker-compose.production.yml` uses `image:` only (no `build:`).
- Nginx listens on port 80 inside the container. Host port is `FRONT_PORT`.

## Components
- `Dockerfile`: multi-stage build (Node build stage, Nginx runtime stage) to keep runtime image slim.
- `docker-compose.production.yml`: runs the prebuilt image and maps `${FRONT_PORT}:80`.
- `README.md`: add manual steps for build/push and deploy.
- `nginx.conf`: unchanged; listens on 80.

## Flow
1. Build: `docker build -f Dockerfile -t registry.desarrollosur.com.ar/lautarobarba/next_template:latest .`
2. Push: `docker push registry.desarrollosur.com.ar/lautarobarba/next_template:latest`
3. Deploy: `FRONT_PORT=XXXX docker compose -f docker-compose.production.yml up -d`

## Error Handling
- Pull failures indicate registry auth or connectivity issues; README will include `docker login` guidance.
- Container failures are most likely Nginx config or port mapping issues; use `docker logs` and validate `FRONT_PORT`.

## Testing
- Local image check: `docker run -p 8080:80 registry.desarrollosur.com.ar/lautarobarba/next_template:latest` and verify `index.html`.
- Compose check: `curl http://localhost:$FRONT_PORT` from host.

## Open Questions
- None.
