# API

## Introduction

The API defines how Fullscope's backend exposes its application capabilities to clients.

Fullscope uses a decoupled frontend and backend architecture. The backend is responsible for the financial model and application logic, while the frontend consumes these capabilities through an API.

The API should therefore provide a clear boundary between the backend and its clients while remaining simple enough to develop, operate, and maintain.

The initial implementation will be developed by a single developer as a personal project. The selected API approach should therefore **minimise unnecessary complexity** and provide a conventional foundation that can evolve with the application.

This document evaluates the main API approaches against a defined set of criteria and records the reasoning behind the final decision.

The goal is not to select the most powerful or sophisticated API technology, but the technology that provides the **best overall fit for Fullscope's requirements and constraints**.

## API Model

The selected API model will define the communication boundary between Fullscope's backend and its clients.

Fullscope requires an API capable of exposing financial resources and application operations to its web frontend. The API should provide predictable request and response semantics, support validation and error handling, and integrate naturally with the technologies already selected for the project.

The initial client is a web frontend, and there is no current requirement for multiple clients with substantially different data-fetching needs.

The API should therefore favour a **simple, conventional communication model** rather than introducing additional abstractions that are not currently required.

## Selection Criteria

The API approach will be evaluated against five criteria:

- **Architectural Fit:** How well the approach fits Fullscope's decoupled frontend and backend architecture and NestJS backend.

- **Maintainability:** How easily the API can be structured, documented, tested, and evolved as the application grows.

- **Type Safety:** How effectively the approach allows request and response contracts to be represented and validated within the TypeScript codebase.

- **Client Experience:** How predictable and practical the API is for the frontend and other clients.

- **Operational Complexity:** The additional infrastructure, tooling, and concepts required to implement and operate the API.

## Candidates

The following three API approaches have been selected for evaluation. They represent established approaches for a TypeScript backend such as Fullscope.

### 1. REST

A resource-oriented API architecture based on HTTP methods, URLs, status codes, and standard HTTP semantics.

### 2. GraphQL

A query-based API approach where clients specify the fields and relationships they require through a strongly defined schema.

### 3. tRPC

A TypeScript-first RPC framework that derives client-side types directly from server-side procedures, allowing clients to call backend procedures without manually defining a separate API schema.

## Comparative Evaluation

### 1. REST

REST provides a conventional approach for exposing application resources through standard HTTP semantics.

Fullscope's domain maps naturally to resource-oriented endpoints. Concepts such as accounts, assets, liabilities, transactions, valuations, and financial positions can be represented through predictable resources and operations.

REST also provides a clear boundary between the frontend and backend. The frontend communicates with the backend through HTTP without depending on the backend's internal implementation.

A significant advantage is its **simplicity and maturity**. HTTP methods, status codes, request semantics, and response formats are widely understood and supported by existing tools and libraries.

NestJS provides first-class support for REST APIs, including routing, request validation, exception handling, and OpenAPI integration. This allows the API to be implemented using capabilities already provided by the selected backend framework rather than introducing an additional API abstraction.

REST also provides strong interoperability. The API can be consumed by browsers, scripts, command-line applications, or clients written in other languages without requiring them to adopt a particular TypeScript framework.

The main consideration is that API contracts must be maintained explicitly. Request and response schemas therefore need to be defined and kept consistent with the implementation. This introduces some additional work compared with a TypeScript-coupled approach such as tRPC.

Type safety on the REST boundary can be reinforced using NestJS's built-in validation (`class-validator`/`class-transformer`) for runtime contract enforcement, and OpenAPI-generated types can be used to derive client-side types from the same source of truth as the backend, narrowing — though not eliminating — the type safety gap with tRPC.

For Fullscope, this trade-off is acceptable because the explicit contract reinforces the separation between the frontend and backend without requiring additional infrastructure or runtime components.

### 2. GraphQL

GraphQL provides a strongly typed schema through which clients can request exactly the fields and relationships they require.

This can be particularly useful for applications with complex data relationships or multiple clients with substantially different data requirements. Clients can retrieve related data through a single query and avoid defining separate endpoints for every possible data combination.

GraphQL also provides a formal schema that can support validation, documentation, and development tooling.

However, GraphQL introduces additional concepts and operational concerns, including schema management, resolvers, query execution, query depth and complexity controls, caching strategies, and authorization at the field level.

For Fullscope's initial requirements, these capabilities do not provide a sufficiently strong advantage over a conventional HTTP API. The domain contains relationships, but there is currently no requirement for multiple clients with significantly different data-fetching requirements.

GraphQL therefore introduces complexity that is not justified by the current application needs.

### 3. tRPC

tRPC provides a TypeScript-first RPC model in which the server defines procedures and the client consumes them with types derived directly from the server implementation.

This provides an excellent developer experience for a TypeScript-only application. Changes to procedures and their inputs or outputs can be reflected directly in the client, reducing the need to maintain a separate API contract manually.

However, this advantage comes from **strong coupling between the client and server TypeScript implementations**. The client benefits from sharing types and tooling with the backend rather than interacting with an independent API contract.

This makes tRPC less aligned with Fullscope's API boundary. The backend represents the application's core financial model, while the frontend is a separate client of that model.

tRPC would also make clients outside the TypeScript ecosystem less natural to implement. Such clients would not benefit from the primary advantage of the framework and would instead need to interact with its RPC conventions.

For Fullscope, the improved TypeScript developer experience does not justify introducing this coupling when a conventional HTTP API can satisfy the current requirements.

## Decision

The selected API approach is **REST**.

REST provides the best balance between **architectural fit, maintainability, type safety, client experience, and operational simplicity** for Fullscope.

The resource-oriented model fits Fullscope's financial domain naturally. Financial entities and operations can be exposed through predictable HTTP endpoints while keeping the backend implementation independent from the frontend.

The main reason for selecting REST is its **simple and well-established model**. It provides a clear API boundary using standard HTTP concepts that are already supported directly by NestJS and require no additional API runtime or infrastructure.

REST also provides a durable contract between the application and its clients. This allows the frontend to remain independent from the backend implementation while keeping the API understandable and accessible to other clients if they are introduced later.

GraphQL was considered because of its flexible querying capabilities and strong schema model, but its additional complexity is not justified by Fullscope's current requirements.

tRPC was considered because of its excellent TypeScript developer experience and automatic type inference, but the resulting coupling between frontend and backend is not considered necessary when a conventional REST API provides the required capabilities with a simpler and more independent boundary.

The selected approach follows Fullscope's broader principle of **starting simple without unnecessarily limiting future evolution**.

REST provides the **best overall fit for Fullscope's current requirements and constraints**.