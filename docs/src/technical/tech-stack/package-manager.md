# Package Manager

## Introduction

The package manager defines the tool used to install, resolve, update, and manage Fullscope's TypeScript dependencies.

Fullscope is an **open-source, self-hosted financial observatory** built entirely with TypeScript. Its application architecture consists of a decoupled frontend and NestJS backend, while the project remains part of a single TypeScript codebase.

The selected package manager should therefore provide reliable dependency management, deterministic installations, strong workspace support, and a mature ecosystem without introducing unnecessary complexity.

The initial implementation will be developed by a single developer as a personal project. The selected tool should therefore **minimise operational and development overhead** while providing a solid foundation for the project's long-term evolution.

This document evaluates the main package manager alternatives against a defined set of criteria and records the reasoning behind the final decision.

The goal is not to select the most sophisticated package management tool, but the technology that provides the **best overall fit for Fullscope's requirements and constraints**.

## Selection Criteria

The package manager will be evaluated against five criteria:

- **Dependency Management:** How effectively the tool resolves, installs, updates, and removes project dependencies while maintaining a consistent dependency graph.

- **Reproducibility:** How reliably the same dependency tree can be reproduced across development, testing, CI, and production environments.

- **Workspace Support:** How well the tool supports projects containing multiple related TypeScript applications or packages within a single repository.

- **Performance:** The efficiency of dependency installation and management, particularly as the project and dependency graph grow.

- **Maintenance and Ecosystem:** The maturity, maintenance activity, security posture, and adoption of the tool and its surrounding ecosystem.

## Candidates

The following package managers have been selected for further evaluation. They represent the main actively maintained options considered for a TypeScript project such as Fullscope.

### 1. npm

The default package manager distributed with Node.js, providing dependency management, lockfiles, scripts, and workspace support.

[npm documentation](https://docs.npmjs.com/)

### 2. pnpm

A package manager focused on efficient dependency management through a content-addressable store, strict dependency resolution, lockfiles, and workspace support.

[pnpm documentation](https://pnpm.io/)

### 3. Yarn

A mature JavaScript and TypeScript package manager providing dependency management, lockfiles, workspaces, and multiple installation strategies.

[Yarn documentation](https://yarnpkg.com/)

## Comparative Evaluation

### 1. npm

npm is the standard package manager distributed with Node.js and provides all of the functionality required by Fullscope.

It supports lockfiles for reproducible installations and provides native workspace support for repositories containing multiple related packages or applications.

Its main advantage is **simplicity and ubiquity**. Developers using Node.js already have access to npm, and the tool requires no additional package manager installation or configuration.

npm also has a very mature ecosystem and broad compatibility with the TypeScript and Node.js ecosystem. Its long-term maintenance is supported by npm and its integration with the wider Node.js platform.

The main limitation is dependency installation efficiency. npm's traditional installation model can consume more disk space and perform less efficiently than pnpm for large dependency graphs.

### 2. pnpm

pnpm provides dependency management with a content-addressable package store. Packages are stored centrally and linked into projects rather than being independently duplicated for every project.

This approach can significantly reduce disk usage and improve installation performance, particularly when multiple projects share dependencies.

pnpm also provides strong workspace support and is designed to manage repositories containing multiple related packages. This makes it well suited to TypeScript projects where several applications or packages share a common repository.

Its lockfile provides deterministic dependency resolution and reproducible installations. pnpm also uses a stricter dependency model than traditional package managers, helping expose undeclared dependencies that might otherwise remain hidden.

The main consideration is that pnpm introduces an additional tool beyond the Node.js runtime itself. Developers and CI environments must therefore explicitly use pnpm rather than relying on the package manager distributed with Node.js.

This additional requirement is small, while the dependency management and workspace capabilities provide meaningful advantages for a TypeScript project.

pnpm is actively maintained and has strong adoption within the modern TypeScript and Node.js ecosystem.

### 3. Yarn

Yarn is a mature package manager with strong support for dependency management, lockfiles, workspaces, and TypeScript projects.

Its workspace capabilities make it suitable for repositories containing multiple applications or packages, while its lockfile provides reproducible dependency installations.

Yarn has also introduced a number of advanced dependency management features and installation strategies over its evolution.

The main consideration is that some of its more advanced capabilities introduce additional concepts and configuration compared with the simpler npm model.

For Fullscope, these capabilities do not provide a sufficiently strong advantage over pnpm to justify selecting Yarn as the primary package manager.

## Decision

The selected package manager is **pnpm**.

pnpm provides the best overall balance between **dependency management, reproducibility, workspace support, performance, and ecosystem maturity** for Fullscope.

Its lockfile provides deterministic dependency resolution, while its content-addressable storage model avoids unnecessary duplication of dependencies and can improve installation efficiency.

Its workspace support is particularly relevant to Fullscope because the project contains multiple TypeScript applications within the same overall codebase. pnpm provides the required tooling to manage these relationships without requiring separate package management systems.

npm was considered as the simplest and most universally available alternative. Its capabilities are sufficient for Fullscope, but pnpm provides stronger dependency isolation, more efficient storage, and a more capable workspace model.

Yarn was also considered as a mature alternative with strong workspace support. However, it does not provide a sufficiently strong advantage over pnpm for Fullscope's requirements.

pnpm therefore provides the **best overall fit for Fullscope's TypeScript ecosystem and dependency management requirements**.