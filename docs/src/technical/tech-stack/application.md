# Application Stack

## Introduction

The application stack defines the core technologies and frameworks used to build Fullscope's application.

Fullscope is an **open-source, self-hosted financial observatory** focused on representing and understanding an individual's financial position. Its core responsibilities are to collect, organise, calculate, and present financial information across assets, liabilities, cash flow, and investments.

The initial implementation will be developed by a single developer as a personal project. The selected stack should therefore **minimise unnecessary complexity** while providing a solid foundation for the financial model, interactive user interface, historical data, and future analytical capabilities.

The architecture should also allow the application to evolve as its functionality grows without requiring a fundamental rewrite.

This document evaluates the main application stack alternatives against a defined set of criteria and records the reasoning behind the final decision.

The goal is not to select the most powerful or popular technology, but the technology that provides the **best overall fit for Fullscope's requirements and constraints**.

## Selection Criteria

The application stack will be evaluated against four criteria:

- **Product Fit:** How well the stack supports Fullscope's financial domain, user interface, historical data, future analytical capabilities, and the separation of the core financial model from its presentation.

- **Architectural Complexity:** The structural complexity introduced by the stack, including the number of applications, languages, runtimes, interfaces, and architectural boundaries that must be developed and operated.

- **Maintainability:** The suitability of the stack for maintaining and evolving the project, considering documentation, tooling, ecosystem stability, and established development practices.

- **Self-Hosting:** How easily the complete application can be deployed and operated on user-controlled infrastructure without mandatory external services or proprietary platforms.

## Candidates

The following five application architectures have been selected for further evaluation. They represent the main approaches considered for Fullscope while keeping the initial research focused.

### 1. TypeScript full-stack (integrated)

A single TypeScript application covering both frontend and backend concerns, using **Next.js** as the full-stack framework.

[Next.js documentation](https://nextjs.org/docs)

### 2. TypeScript backend + frontend (decoupled)

A TypeScript backend exposing an API, with a separately developed TypeScript frontend. **NestJS** is used as the backend framework.

[NestJS documentation](https://docs.nestjs.com/)

### 3. Python + FastAPI backend + TypeScript frontend (decoupled)

A Python backend built with **FastAPI**, exposing an API consumed by a separately developed TypeScript frontend.

[FastAPI documentation](https://fastapi.tiangolo.com/)

### 4. Ruby on Rails (monolith)

A single, full-stack **Ruby on Rails** application covering backend and frontend concerns.

[Ruby on Rails documentation](https://rubyonrails.org/docs)

### 5. PHP + Laravel (monolith)

A single, full-stack **Laravel** application covering backend and frontend concerns.

[Laravel documentation](https://laravel.com/docs/)

## Comparative Evaluation

### 1. TypeScript full-stack (integrated)

Next.js allows Fullscope to be developed as a single TypeScript application covering both frontend and backend concerns. This provides strong product fit for an interactive, data-driven application and supports the historical and analytical capabilities required by Fullscope. However, the financial model and its presentation remain within the same application boundary.

The main advantage is the **reduced architectural complexity**: there is no separate frontend application or API that must be developed and deployed independently. TypeScript also provides a single language and ecosystem across the application, while Next.js provides an established development model and tooling. Internal separation between application concerns would become increasingly important as the project grows.

Next.js supports **self-hosted deployment** without requiring mandatory external services or proprietary platforms.

### 2. TypeScript backend + frontend (decoupled)

NestJS provides a structured TypeScript backend while allowing the frontend to evolve as a separate application. The **API boundary separates the financial model from its presentation** and provides a foundation for future clients and integrations.

The main drawback is increased architectural complexity from the beginning: two applications, an API contract, and separate development and deployment processes must be maintained. The shared TypeScript ecosystem reduces language diversity, while NestJS provides an established structure for backend development.

The complete system remains suitable for **self-hosting** without requiring mandatory external services or proprietary platforms, although it requires more operational configuration than an integrated application.

### 3. Python + FastAPI backend + TypeScript frontend (decoupled)

FastAPI provides a focused Python backend while the frontend remains a separate TypeScript application. The API boundary separates the financial model from its presentation, while Python's ecosystem provides strong support for potential future analytical and numerical workloads.

However, this introduces both a frontend/backend boundary and a **second language and runtime**. This increases architectural and operational complexity for a project initially maintained by a single developer. Maintaining two language ecosystems also increases the overall technology surface.

The approach is fully compatible with **self-hosting** without requiring mandatory external services or proprietary platforms.

### 4. Ruby on Rails (monolith)

Ruby on Rails provides an integrated full-stack architecture with strong conventions and a mature ecosystem. Its monolithic structure is well suited to Fullscope's data-driven application and keeps the initial architecture relatively simple.

The main advantage is the **established development model and reduced architectural complexity** of a single application. However, the financial model and its presentation remain within the same application boundary, and Rails introduces a language and ecosystem separate from TypeScript.

Rails is compatible with **self-hosting** without requiring mandatory external services or proprietary platforms and provides a mature foundation for long-term application development.

### 5. PHP + Laravel (monolith)

Laravel provides an integrated full-stack architecture with mature support for common web application concerns. Its monolithic structure is well suited to Fullscope's data-driven application and keeps the initial architecture relatively simple.

The main advantage is the **established development model and reduced architectural complexity** of a single application. However, the financial model and its presentation remain within the same application boundary, and Laravel introduces a language and ecosystem separate from TypeScript.

Laravel is compatible with **self-hosting** without requiring mandatory external services or proprietary platforms and provides a mature foundation for long-term application development.

## Decision

The selected application architecture is **TypeScript backend + frontend (decoupled)**, using **NestJS** for the backend and a separate TypeScript frontend.

The main reason for this choice is the **separation between Fullscope's financial model and its presentation**. The backend can expose the financial model through an API, allowing the frontend to evolve independently and providing a foundation for future clients, integrations, and analytical capabilities.

Next.js was considered as a simpler integrated alternative, but the additional architectural complexity of a separate backend is considered justified by Fullscope's domain and long-term direction.

Python + FastAPI was also considered, particularly for future analytical workloads, but introducing a second language and runtime is not considered justified at this stage.

Rails and Laravel provide mature monolithic alternatives, but do not provide a sufficiently strong advantage over the selected TypeScript-based architecture.

The selected architecture provides the **best balance between product fit, architectural complexity, maintainability, and self-hosting**.