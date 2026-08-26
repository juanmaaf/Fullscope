# Fullscope API

The Fullscope API is the backend application of Fullscope, built with NestJS and TypeScript.

## Development

From the repository root:

```bash
pnpm --filter api start:dev
```

The API runs in watch mode and reloads automatically when source files change.

## Build

```bash
pnpm --filter api build
```

## Tests

Run the unit tests:

```bash
pnpm --filter api test
```

Run end-to-end tests:

```bash
pnpm --filter api test:e2e
```

Run tests with coverage:

```bash
pnpm --filter api test:cov
```

## Structure

The application source code is located under `src/`.

```text
apps/api/
├── src/
├── test/
├── package.json
├── nest-cli.json
├── tsconfig.json
└── tsconfig.build.json
```

The API is managed as part of the root pnpm workspace.