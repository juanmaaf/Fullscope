# Technology Stack

This section documents the technologies and tools selected for Fullscope, including the alternatives considered and the rationale behind each decision.

## Summary

Fullscope is built entirely in TypeScript, using a **decoupled backend and frontend architecture** communicating through a **REST API**. This separation keeps Fullscope's financial model independent from its presentation layer while minimising the operational and architectural complexity introduced by a single-developer, self-hosted project.

| Layer | Decision | Alternatives considered |
|---|---|---|
| **Application** | NestJS backend + separate TypeScript frontend (decoupled) | Next.js (integrated), Python + FastAPI, Ruby on Rails, PHP + Laravel |
| **API** | REST | GraphQL, tRPC |
| **Database** | PostgreSQL | MySQL/MariaDB, SQLite, MongoDB |
| **ORM** | Drizzle ORM | Prisma, TypeORM |
| **Authentication** | Session-based (`HttpOnly` cookies) | JWT-based Bearer, Opaque Bearer tokens |
| **Package Manager** | pnpm | npm, Yarn |

## Guiding Principles

These decisions were made consistently against a small set of shared priorities, reflected throughout each individual document:

- **Start simple.** Complexity is introduced only when justified by a concrete, current requirement — not by anticipated future needs. This principle directly shaped the authentication and API decisions, where approaches optimised for hypothetical future clients (JWT, tRPC) were set aside in favour of the simplest model that fits today's single web client.

- **Self-hosting first.** Every technology must run entirely on user-controlled infrastructure, without depending on mandatory external services or proprietary platforms.

- **Financial correctness.** Where a decision affects the accuracy of monetary calculations — most notably the database choice — correctness takes precedence over operational simplicity.

- **A durable architectural boundary.** The separation between backend and frontend, established in `Application.md`, is preserved consistently across the API and authentication decisions, rather than being reintroduced or bypassed for convenience in either.

- **Single-developer fit.** As Fullscope is initially built and maintained by one person, each decision favours the option that reduces day-to-day cognitive and operational overhead, provided it does not compromise the principles above.