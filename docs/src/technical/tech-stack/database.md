# Database

## Introduction

The database defines the primary persistence layer for Fullscope.

Fullscope needs to store and relate financial information across assets, liabilities, cash flow, investments, and historical financial positions. The database must therefore support a structured financial model, historical records, data integrity, and the queries required to derive financial views and calculations.

The initial implementation will be developed by a single developer as a personal project. The selected database should therefore provide the required capabilities without introducing unnecessary complexity.

This document evaluates the main database alternatives against a defined set of criteria and records the reasoning behind the final decision.

The goal is not to select the most powerful or popular database, but the technology that provides the **best overall fit for Fullscope's requirements and constraints**.

## Database Model

The first decision is whether Fullscope should use a **relational or non-relational database model**.

Fullscope's financial data contains strong relationships between entities such as accounts, assets, liabilities, transactions, valuations, and historical positions. These relationships and the need for consistent financial data make the database model itself an important architectural decision.

The selected model should therefore support these relationships directly while providing the consistency and query capabilities required by the application.

## Selection Criteria

The database will be evaluated against five criteria:

- **Data Model:** How well the database model represents Fullscope's financial entities, relationships, and historical data.

- **Consistency:** Support for transactions, constraints, and referential integrity required to maintain consistent financial data.

- **Numeric Precision:** Support for exact decimal arithmetic, avoiding floating-point rounding errors in monetary values.

- **Query Capabilities:** Support for the queries, aggregations, and historical analysis required by Fullscope.

- **Self-Hosting:** The operational complexity of running and maintaining the database on user-controlled infrastructure.

## Candidates

The following database technologies have been selected for further evaluation. They represent the main approaches considered for Fullscope while keeping the initial research focused.

### 1. PostgreSQL

A relational database designed for structured data, transactions, complex queries, and strong data integrity.

[PostgreSQL documentation](https://www.postgresql.org/docs/)

### 2. MySQL / MariaDB

Mature relational database systems widely used for web applications, supporting structured data, transactions, constraints, and complex queries.

[MySQL documentation](https://dev.mysql.com/doc/)

[MariaDB documentation](https://mariadb.com/docs)

### 3. SQLite

A lightweight relational database implemented as an embedded library, storing the complete database in a local file without requiring a separate database server.

[SQLite documentation](https://sqlite.org/docs.html)

### 4. MongoDB

A document-oriented NoSQL database that stores data as flexible JSON-like documents rather than relational tables.

[MongoDB documentation](https://www.mongodb.com/docs/)

## Comparative Evaluation

### 1. PostgreSQL

PostgreSQL provides a strong fit for Fullscope's financial model through its relational data model, relationships, constraints, transactions, and support for complex queries.

Its relational structure maps naturally to interconnected entities such as accounts, assets, liabilities, transactions, and historical records. Transactions and referential integrity provide the consistency required for financial data.

PostgreSQL's `NUMERIC` type supports exact, arbitrary-precision decimal arithmetic, avoiding the floating-point rounding errors that are unacceptable in monetary calculations. Its query engine has mature support for window functions and advanced aggregations, which fit naturally with Fullscope's need to derive historical net worth, allocation, and cash flow trends over time. If historical data volume grows significantly, PostgreSQL's extension ecosystem (e.g. TimescaleDB) provides a growth path for time-series-heavy workloads without changing database engine.

Running PostgreSQL self-hosted requires operating a separate database server (typically as its own Docker container), which is a small but real addition to the operational footprint compared to an embedded database.

### 2. MySQL / MariaDB

MySQL and MariaDB provide mature relational database systems with strong support for structured data, relationships, transactions, constraints, and complex queries. Both support exact decimal arithmetic through their `DECIMAL` type, satisfying the precision requirements for monetary values.

They can represent Fullscope's financial model effectively and provide the consistency required for financial data. Their support for advanced analytical queries — window functions, in particular — has historically been less mature than PostgreSQL's, though this gap has narrowed in recent versions. For a financial model expected to grow in analytical depth over time, PostgreSQL's more established analytical capabilities represent a safer long-term fit.

Self-hosting operational complexity is comparable to PostgreSQL: both require running a dedicated database server.

### 3. SQLite

SQLite provides a relational data model with support for relationships, transactions, constraints, and SQL queries. It can therefore represent Fullscope's financial model while keeping the database architecture extremely simple.

Its main strength is self-hosting simplicity: SQLite requires no separate server process, reducing the application to a single deployable unit with no additional infrastructure to run or back up.

Its main limitation is numeric precision: SQLite uses dynamic type affinity rather than a fixed-precision decimal type, which makes it easier to inadvertently store monetary values as floating-point numbers unless strict discipline is applied throughout the application layer. Combined with a more limited set of analytical query features and less flexibility for concurrent workloads, this makes SQLite a weaker fit for a financial model expected to grow in scope and analytical depth.

### 4. MongoDB

MongoDB provides a flexible document model that can represent financial information without requiring a predefined relational schema.

However, Fullscope's domain contains strong relationships between financial entities and requires consistent updates across related data. These requirements fit a relational model more naturally than a document-oriented model.

MongoDB supports precise decimal values through its `Decimal128` type, so numeric precision is not a differentiator here. MongoDB's flexibility therefore provides limited benefit for Fullscope while introducing a less natural representation of the core financial model and weaker support for the relational integrity Fullscope's domain requires.

## Decision

The selected database is **PostgreSQL**.

A **relational database model** is the best fit for Fullscope because the financial model contains strong relationships between entities and requires consistent, queryable historical data.

Among the relational candidates, PostgreSQL provides the strongest overall fit for the required data model, consistency, numeric precision, and query capabilities. Its exact decimal arithmetic is essential for correct monetary calculations, and its mature analytical query support is well suited to Fullscope's historical, net-worth-first focus.

SQLite offers the lowest self-hosting complexity, and this trade-off is a genuine one: choosing PostgreSQL means accepting a dedicated database server as part of the deployment. However, SQLite's weaker numeric precision guarantees are a poor fit for a financial application, and this outweighs its operational simplicity. MySQL and MariaDB are viable alternatives with equivalent precision guarantees, but do not offer a sufficiently strong advantage over PostgreSQL's analytical query capabilities.

MongoDB was considered as a representative NoSQL alternative, but its document-oriented model is less aligned with Fullscope's interconnected financial domain.

PostgreSQL therefore provides the **best overall fit for Fullscope's financial model and long-term requirements**.