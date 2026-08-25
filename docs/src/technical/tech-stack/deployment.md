# Deployment

## Introduction

The deployment strategy defines how Fullscope's application and its infrastructure are packaged, deployed, and operated.

Fullscope is an **open-source, self-hosted financial observatory**. The deployment approach must therefore allow the complete application to run on infrastructure controlled by the user, without requiring a proprietary platform or mandatory external service.

The selected architecture consists of a decoupled TypeScript frontend and NestJS backend, with PostgreSQL as the database and Drizzle ORM. The deployment approach should provide a consistent way to run these components together while keeping the operational model simple.

The initial implementation will be developed and operated by a single developer as a personal project. The deployment strategy should therefore **minimise operational complexity** while providing a reproducible and production-ready foundation.

This document evaluates the main deployment alternatives against a defined set of criteria and records the reasoning behind the final decision.

The goal is not to select the most sophisticated deployment platform, but the technology that provides the **best overall fit for Fullscope's requirements and constraints**.

## Deployment Model

The first decision is how Fullscope should be packaged and operated in a self-hosted environment.

The initial deployment will target a **single host** running the complete application stack. The frontend, backend, and PostgreSQL database will run as isolated services while being managed as a single application.

The deployment model should provide a clear path from development to production without introducing a distributed infrastructure model before it is required.

## Selection Criteria

The deployment approach will be evaluated against five criteria:

- **Self-Hosting:** How easily the complete application can be deployed and operated on infrastructure controlled by the user without mandatory external platforms.

- **Operational Complexity:** The number of infrastructure components, configuration mechanisms, and operational processes required to deploy and maintain the application.

- **Reproducibility:** How reliably the same application environment can be recreated across development, testing, and production.

- **Security:** The ability to isolate application components, manage configuration and secrets appropriately, and apply established container and infrastructure security practices.

- **Scalability:** The ability of the deployment model to support future growth without requiring a fundamental change to the application architecture.

## Candidates

The following three deployment approaches have been selected for further evaluation. They represent the main approaches considered for a self-hosted application such as Fullscope.

### 1. Docker Compose

A container-based deployment model using Docker Compose to define and operate the complete Fullscope stack as a set of services.

[Docker Compose documentation](https://docs.docker.com/compose/)

### 2. Kubernetes

A container orchestration platform designed to deploy and manage applications across one or more hosts.

[Kubernetes documentation](https://kubernetes.io/docs/)

### 3. Bare-metal / native deployment

A deployment model where the frontend, backend, and PostgreSQL are installed and operated directly on the host operating system without container orchestration.

## Comparative Evaluation

### 1. Docker Compose

Docker Compose provides a declarative way to define and run multiple services as a single application. The frontend, backend, and PostgreSQL database can each be represented as isolated services while sharing the required networks, volumes, and configuration.

This provides a strong fit for Fullscope's self-hosted nature. A user can deploy the complete application on a single server without requiring an external platform or a distributed cluster.

The main advantage is the balance between **operational simplicity and reproducibility**. The complete deployment can be described in a Compose file and managed through the standard Docker CLI. Docker documents Compose as a suitable approach for running multi-container applications in production environments.

Containerisation also provides a clear separation between application components and their runtime environments. Docker provides established security mechanisms, including rootless mode, that can reduce the privileges required by the container runtime when the host environment permits it.

The main limitation is that Docker Compose is primarily designed around single-host deployments. More advanced orchestration and distributed scaling would require additional infrastructure if Fullscope eventually reaches that point.

### 2. Kubernetes

Kubernetes provides a powerful platform for deploying, scaling, and managing containerised applications across multiple hosts.

It offers significantly more capabilities than Fullscope currently requires, including automated scheduling, service discovery, rolling deployments, resource management, and cluster-level orchestration.

The main drawback is **operational complexity**. Running Kubernetes introduces a substantial infrastructure layer that must itself be configured, secured, upgraded, monitored, and maintained.

For an application initially developed and operated by a single developer and deployed to a single host, this complexity is not justified by a concrete requirement.

Kubernetes remains a viable future deployment target if Fullscope eventually requires distributed infrastructure or more advanced orchestration.

### 3. Bare-metal / native deployment

Native deployment avoids the container runtime entirely by installing the required application runtimes and PostgreSQL directly on the host.

This can provide a relatively small runtime footprint, but the deployment becomes more dependent on the specific operating system and its configuration.

The application runtime, Node.js version, PostgreSQL version, system packages, process management, networking, and configuration must all be managed directly on the host.

This reduces container-related infrastructure but weakens **reproducibility and environment isolation**. Differences between hosts can also make installation, upgrades, and troubleshooting more difficult.

For an open-source self-hosted application that should be reproducible across different environments, these trade-offs make native deployment less attractive than a container-based approach.

## Decision

The selected deployment approach is **Docker Compose on a single host**.

Docker Compose provides the best balance between **self-hosting, operational complexity, reproducibility, security, and scalability** for Fullscope's current requirements.

The complete application can be defined as a small set of isolated services, with PostgreSQL providing persistent storage and the frontend and backend running as independent containers. This matches the architecture already selected for the application while keeping the deployment model straightforward.

Kubernetes was considered but rejected for the initial deployment because its operational complexity is not justified by Fullscope's current scale. Native deployment was also considered, but provides weaker reproducibility and isolation across different self-hosted environments.

The deployment should therefore start with **one documented Docker Compose deployment**, rather than supporting multiple installation methods from the beginning. Additional deployment methods can be introduced later if a concrete requirement justifies them.

The selected approach provides the **best overall fit for Fullscope's self-hosted nature while avoiding unnecessary operational complexity and future deployment debt**.