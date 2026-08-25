# Authentication

## Introduction

Authentication defines how Fullscope identifies users and controls access to the application and its API.

Fullscope is an **open-source, self-hosted financial observatory** that handles sensitive financial information. The authentication mechanism should therefore provide strong security while remaining simple to deploy and operate without mandatory external identity providers or proprietary platforms.

Fullscope uses a **decoupled frontend and backend communicating through an API**. The authentication approach should preserve this separation without introducing unnecessary complexity or coupling authentication to a specific frontend implementation.

The initial implementation will be developed by a single developer as a personal project and will initially be accessed through a web client. The selected approach should therefore **minimise unnecessary complexity and avoid introducing technical debt** while leaving a clear path for additional clients and integrations if they become concrete requirements.

This document evaluates the main authentication alternatives against a defined set of criteria and records the reasoning behind the final decision.

The goal is not to select the most feature-rich or popular authentication technology, but the technology that provides the **best overall fit for Fullscope's requirements and constraints**.

## Selection Criteria

The authentication approach will be evaluated against four criteria:

- **Security:** How well the approach protects authenticated access, considering credential handling, session or token lifecycle, expiration, revocation, and exposure to common web attacks.

- **Architecture Fit:** How well the approach fits Fullscope's decoupled frontend and backend architecture and its API-based communication.

- **Self-Hosting:** How easily the authentication mechanism can be deployed and operated on user-controlled infrastructure without mandatory external identity providers or proprietary platforms.

- **Maintainability:** The suitability of the approach for maintaining and evolving authentication, considering implementation complexity, documentation, tooling, and established development practices.

## Candidates

The following three authentication approaches have been selected for further evaluation. They represent the main approaches considered for Fullscope's current web client and potential future API clients.

### 1. Session-based authentication

The backend manages authenticated sessions and the web client authenticates through a secure, `HttpOnly` cookie.

### 2. JWT-based Bearer authentication

The backend issues signed JSON Web Tokens that clients send using the HTTP `Authorization: Bearer` header.

### 3. Opaque Bearer tokens

The backend issues opaque access tokens that clients send using the HTTP `Authorization: Bearer` header. The token itself contains no authentication information and is validated by the backend.

## Comparative Evaluation

### 1. Session-based authentication

Session-based authentication keeps authentication state on the backend and uses a secure cookie to associate requests with an authenticated user.

This provides a mature security model for web applications. The session identifier can be protected using standard cookie security mechanisms, while the backend retains direct control over the authentication lifecycle. Sessions can be expired or revoked immediately without waiting for a token to expire.

Session-based authentication is compatible with Fullscope's decoupled architecture. The frontend does not need to access or manage the session identifier directly; the browser handles the cookie while authenticated requests are sent to the backend API.

The main limitation is that session-based authentication is primarily oriented towards browser clients. Additional authentication mechanisms may therefore be introduced in the future for CLI tools, automation, or third-party integrations.

The approach is fully self-hosted and does not require an external identity provider.

### 2. JWT-based Bearer authentication

JWT-based authentication allows the backend to issue signed access tokens that clients include in the `Authorization: Bearer` header.

This provides a widely adopted mechanism for API authentication and can be consumed by different types of clients. It is therefore a natural candidate for a decoupled API architecture.

However, browser-based applications introduce additional security considerations around token storage and lifecycle management. Storing authentication tokens in browser storage exposes them to client-side JavaScript, while using an `HttpOnly` cookie removes much of the practical distinction from a traditional server-managed session. OWASP recommends against storing authentication tokens in browser storage such as `localStorage` and `sessionStorage`.

JWT revocation also requires additional mechanisms when immediate invalidation is required. Short token lifetimes, deny-lists, or additional server-side state can be introduced, but each increases the complexity of the authentication lifecycle.

JWT authentication is fully self-hosted and supports multiple client types, but its additional complexity is not justified by Fullscope's current requirement for a single web client.

### 3. Opaque Bearer tokens

Opaque Bearer tokens provide an API-oriented authentication model in which the token contains no authentication information. The backend resolves the token against its own authentication state.

This provides direct server-side control over token validity and revocation. Individual tokens can be created, expired, and revoked independently, making the approach particularly suitable for programmatic clients.

The model fits Fullscope's API architecture well and provides a suitable mechanism for future CLI tools, automation, or integrations that require their own credentials.

For the current web client, however, opaque Bearer tokens would introduce additional token management without providing a significant advantage over session-based authentication.

The approach is fully self-hosted and does not require an external identity provider.

## Decision

The selected authentication approach is **session-based authentication** for Fullscope's web client.

The main reason for this choice is the combination of **security, architecture fit, self-hosting, and low implementation complexity**.

The backend will manage authentication sessions while the frontend remains a separate application communicating through the API. This preserves the architectural separation established in `Application.md` without introducing token management complexity that is not currently required.

JWT-based Bearer authentication was considered because of its widespread use in API architectures, but was not selected. For Fullscope's current browser-based client, it introduces additional complexity around token storage and revocation without providing a sufficient advantage over server-managed sessions.

Opaque Bearer tokens were also considered. They provide a suitable mechanism for future programmatic access and can be introduced as an additional authentication mechanism if CLI tools, automation, or third-party integrations become concrete requirements.

The selected approach follows Fullscope's broader principle of **starting simple without creating architectural limitations**. It provides a secure and established authentication model for the current client while leaving a clear path for additional authentication mechanisms when concrete requirements emerge.

The selected approach provides the **best overall fit for Fullscope's requirements and constraints**.