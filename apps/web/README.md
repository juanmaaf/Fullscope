# Fullscope Web

The Fullscope Web application is the frontend application of Fullscope, built with React, TypeScript, and Vite.

## Development

From the repository root:

```bash
pnpm --filter web dev
```

The application runs in development mode with Vite and reloads automatically when source files change.

## Build

```bash
pnpm --filter web build
```

## Lint

```bash
pnpm --filter web lint
```

## Structure

The application source code is located under `src/`.

```text
apps/web/

├── src/
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
└── tsconfig.node.json
```

The frontend is managed as part of the root pnpm workspace.