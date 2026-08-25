# ORM

## Introduction

The ORM defines how Fullscope's backend models, queries, and persists data in PostgreSQL.

Fullscope's financial model contains interconnected entities, historical records, and relationships that will be accessed throughout the backend. The selected ORM should provide a clear way to represent this model while maintaining consistency between the application and database.

The initial implementation will be developed by a single developer as a personal project. The selected ORM should therefore provide the required capabilities without introducing unnecessary complexity while remaining suitable for the evolution of the financial model.

This document evaluates the main ORM alternatives against a defined set of criteria and records the reasoning behind the final decision.

The goal is not to select the most powerful or popular ORM, but the technology that provides the **best overall fit for Fullscope's requirements and constraints**.

## Selection Criteria

The ORM will be evaluated against four criteria:

- **Type Safety:** How well the ORM provides compile-time type safety for database operations and the application's data model.

- **PostgreSQL Support:** How well the ORM supports PostgreSQL features, relationships, transactions, migrations, and queries required by Fullscope.

- **Dependency Health:** The security, maintenance, and dependency health of the project, using objective external indicators such as Snyk Advisor where available.

- **Maintainability:** The suitability of the ORM for maintaining and evolving the project, considering its API, documentation, tooling, and ecosystem.

## Candidates

The following three ORM technologies have been selected for further evaluation. They represent the main approaches considered for a TypeScript backend using NestJS and PostgreSQL.

### 1. Prisma

A TypeScript ORM providing a generated, type-safe database client, declarative data modelling, and database migrations.

[Prisma documentation](https://www.prisma.io/docs/)

### 2. Drizzle ORM

A TypeScript ORM providing a lightweight, type-safe abstraction over SQL while keeping the database schema and queries close to SQL.

[Drizzle documentation](https://orm.drizzle.team/docs/overview)

### 3. TypeORM

A TypeScript ORM providing entity-based data modelling, repositories, relations, migrations, and support for PostgreSQL.

[TypeORM documentation](https://typeorm.io/docs/getting-started)

## Comparative Evaluation

### 1. Prisma

Prisma provides a strongly typed database client generated from a declarative schema. This provides a clear application-level representation of Fullscope's financial model and reduces the amount of database access code that must be maintained manually.

Its generated client provides strong type safety, while Prisma Migrate provides a structured approach to database schema changes. Prisma also provides tooling for working with and inspecting the database.

The main consideration is the abstraction introduced between the application and PostgreSQL. More specialised database operations may require raw SQL or working outside Prisma's higher-level query model.

Prisma has a healthy ecosystem and strong dependency health indicators. Snyk currently reports a Package Health Score of 86/100 for the `prisma` package, with healthy maintenance and active community indicators.

### 2. Drizzle ORM

Drizzle provides a TypeScript-first approach with a lightweight abstraction over SQL. Its schema is defined in TypeScript and its query API remains close to SQL, providing strong type safety while retaining direct control over database operations.

This approach is particularly suitable for Fullscope because the financial model and its historical queries are important parts of the application. Drizzle also provides migration tooling through Drizzle Kit.

The main consideration is that its lower-level approach can require more explicit schema and query code than a more abstract ORM.

Drizzle also shows strong dependency health indicators. Snyk currently reports a Package Health Score of 90/100 for `drizzle-orm`, with no known security issues in the latest version and sustainable maintenance indicators.

### 3. TypeORM

TypeORM provides a traditional entity-based ORM model with decorators, repositories, relations, and migrations. Its model integrates naturally with TypeScript applications and is particularly familiar within the NestJS ecosystem.

It provides the required PostgreSQL capabilities and can represent Fullscope's financial entities and relationships effectively.

The main consideration is the additional abstraction introduced by its entity and repository model compared with a more SQL-oriented approach.

TypeORM also shows strong dependency health indicators. Snyk currently reports a Package Health Score of 89/100 for `typeorm`, with healthy maintenance and an active community.

## Decision

The selected ORM is **Drizzle ORM**.

Drizzle provides the best balance between **type safety, PostgreSQL support, dependency health, and maintainability** for Fullscope.

All three candidates show strong dependency health, with Package Health Scores within a narrow range (Prisma 86/100, TypeORM 89/100, Drizzle 90/100). This criterion therefore does not clearly differentiate between them, and the decision rests primarily on type safety, PostgreSQL fit, and maintainability for Fullscope's specific domain.

Drizzle's TypeScript-first approach keeps the database schema close to the application code while remaining close to SQL and PostgreSQL. This is particularly appropriate for Fullscope because the financial model and its historical queries — including the window functions and advanced aggregations identified in `Database.md` — are central to the application. Drizzle's SQL-close query API allows these PostgreSQL capabilities to be used with a relatively small abstraction layer.

Prisma was considered as a more abstract and structured alternative, while TypeORM provides strong integration with the NestJS ecosystem. However, Drizzle's combination of type safety, SQL transparency, and relatively small abstraction layer is considered a better fit for Fullscope's financial domain and long-term direction.