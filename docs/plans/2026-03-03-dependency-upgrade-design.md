# Dependency Upgrade Design

Date: 2026-03-03
Project: nextjs-frontend-container

## Context
The project is a Next.js frontend container with npm lockfile, Docker-based local execution, and runtime currently aligned to Node 22. The user requested updating all project libraries, explicitly allowing major-version upgrades and allowing Node version upgrades if required by dependencies.

## Goals
- Upgrade all dependencies and devDependencies in `frontend/package.json` to latest available versions, including major versions.
- Keep the project operational after upgrades.
- Validate success with:
  - `npm run build`
  - `npm run lint`

## Non-Goals
- No feature/UI/business behavior changes.
- No redesign of app architecture.
- No production deployment workflow redesign.

## Approaches Considered

### 1) Big-bang upgrade in one pass (recommended)
Upgrade all libraries to latest, resolve breaking changes, align runtime, regenerate lockfile, then validate build+lint.

Trade-offs:
- Pros: fastest path to fully up-to-date dependency set.
- Cons: harder root-cause isolation if multiple breakages appear simultaneously.

### 2) Layered upgrade
Upgrade in waves (tooling, then framework, then typings).

Trade-offs:
- Pros: easier debugging by layer.
- Cons: more time and operational overhead.

### 3) Rebase from fresh template
Create a fresh modern baseline and port current app/config.

Trade-offs:
- Pros: can reduce old config debt.
- Cons: unnecessary complexity for this repository size and objective.

## Final Design

### Architecture and Scope
- Update dependency graph in `frontend/package.json` for both `dependencies` and `devDependencies`.
- Regenerate `frontend/package-lock.json` to keep deterministic install state.
- Preserve script contract (`dev`, `build`, `lint`, `start`) while adapting configuration only when required by breaking changes.
- If dependency requirements exceed current runtime, update:
  - `frontend/package.json` engines (`node`, `npm`)
  - `Dockerfile` base image (`ARG NODE_IMAGE`)
  - Any compose/runtime mismatch points.

### Component/Flow Design
1. Inspect outdated packages and major jumps.
2. Apply upgrades across runtime and tooling packages.
3. Install and regenerate lockfile.
4. Fix compatibility changes in Next/ESLint/TypeScript/PostCSS/Tailwind config as needed.
5. Run validation pipeline: build then lint.
6. Finalize when both checks pass.

### Error Handling Strategy
- On major-version incompatibility: apply minimal, targeted config/code adaptations rather than pinning old versions.
- On runtime incompatibility: raise Node/npm versions and align container/runtime settings.
- On lockfile inconsistencies: cleanly regenerate lockfile and re-run validation.

### Testing Strategy
Acceptance criteria:
- `npm run build` succeeds.
- `npm run lint` succeeds.

Optional follow-up validation can include manual smoke check in dev server, but it is not required for completion criteria in this plan.

## Risks
- Simultaneous major upgrades may introduce multiple independent breakages.
- Upstream tooling deprecations may require configuration migration.
- Runtime upgrades can affect Docker image behavior and local environment assumptions.

## Mitigations
- Keep changes scoped and incremental in commits where possible.
- Validate after each compatibility adjustment.
- Keep runtime alignment explicit in Docker and package engines.

## Exit Criteria
The design is complete when implementation yields:
- Latest dependency versions applied.
- Runtime requirements aligned.
- Build and lint green under the updated setup.
