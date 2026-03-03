# Compose Healthcheck Design

Date: 2026-03-03

## Summary
Add a service-level healthcheck in `docker-compose.production.yml` using the same parameters as the Dockerfile and document it in the README.

## Components
- `docker-compose.production.yml`: add `healthcheck` with `curl http://localhost:3000/` and configured timing.
- `README.md`: mention that the container has a healthcheck and how to inspect it.

## Testing
- Optional: `docker compose -f docker-compose.production.yml up -d` then `docker ps` or `docker inspect` to verify health status.

