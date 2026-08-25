# Architecture

## Introduction

This document defines how Fullscope is structured as a codebase and how its components relate to each other at runtime, based on the technology decisions recorded in [Technology Stack](../tech-stack/README.md).

It does not repeat the rationale behind individual technology choices — each is documented and justified in its own decision record. This document focuses on structure: how the repository is organised, how components interact, and how the application is deployed.

## Repository Structure

The repository is organised as a **pnpm workspace** containing the application components under `apps/`.

```text
Fullscope/
├── apps/
│   ├── api/
│   └── web/
├── docs/
├── .env.example
├── compose.yaml
├── package.json
├── pnpm-workspace.yaml
└── .nvmrc
```

- **`apps/api`** — the backend application.
- **`apps/web`** — the frontend application.
- **`docs/`** — product and technical documentation, kept separate from application source code.

The applications are managed as a single pnpm workspace while remaining separate application boundaries. Internal module structure within each application will be defined during implementation, once concrete requirements exist, rather than prescribed upfront.

## Component Architecture

```text
┌─────────────────────┐
│         web          │
└──────────┬───────────┘
           │ REST / HTTP
           ▼
┌─────────────────────┐
│         api          │
└──────────┬───────────┘
           │ SQL
           ▼
┌─────────────────────┐
│      PostgreSQL       │
└─────────────────────┘
```

- **`web`** communicates with **`api`** exclusively through the REST API — it does not access the database or duplicate business logic owned by the backend.
- **`api`** is the sole owner of the financial model and the only component with direct database access.
- **PostgreSQL** is never exposed directly to the frontend or to external clients.

This preserves a clear boundary between the financial model and its presentation, and keeps each component's responsibility unambiguous.

## Deployment

Fullscope targets **single-host deployment using Docker Compose**, with three services mirroring the components above:

```text
┌─────────┐     ┌─────────┐     ┌───────────┐
│   web   │ ──▶ │   api   │ ──▶ │ postgres  │
└─────────┘     └─────────┘     └───────────┘
```

Docker Compose manages the services as a single deployment while keeping each component isolated. PostgreSQL data is persisted through a Docker volume, independent of the database container's lifecycle.

Distributed deployment and orchestration are intentionally outside the initial scope.

## Configuration

Configuration is provided through environment variables, scoped by service where relevant. `.env.example` is committed to the repository and documents every required variable, without real secrets. Local and deployment-specific values live in `.env`, which is never committed.

## Architectural Principles

- **Clear boundaries:** each component has a single, distinct responsibility.
- **Backend ownership:** the backend is the sole owner of the financial model and business rules.
- **Simple deployment:** the complete application runs as a small set of services on a single host.
- **Incremental complexity:** additional infrastructure or architectural boundaries are introduced only when justified by concrete requirements.