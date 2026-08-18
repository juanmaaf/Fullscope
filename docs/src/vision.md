# Product Vision

## What is Fullscope?

Fullscope is an open-source, self-hosted financial observatory for individuals. It brings together information about a person's assets, liabilities, cash flow, and investments into a unified financial model and turns that information into a clear view of their financial position.

Fullscope does not execute financial operations. It does not buy or sell assets, move money, or act as a bank or broker.

> **You provide the financial facts. Fullscope builds the picture.**

## Problem

Personal financial information is fragmented across banks, brokers, spreadsheets, investment platforms, properties, and other sources.

Maintaining a complete view of financial position therefore requires manually collecting, updating, and combining information from multiple places. Understanding how net worth changes over time and what drives those changes can require significant manual work.

## Target User

Fullscope is initially designed for financially engaged individuals whose financial information is spread across multiple accounts, institutions, or sources and who want a single, private view of their overall financial position.

It is particularly suited to users who currently rely on spreadsheets or multiple specialised tools to maintain an overview of their finances.

## Main Use Case

The user records or imports financial information into Fullscope. Fullscope organises that information into a unified financial model and derives the views and calculations needed to understand the user's financial position.

Fullscope should help users answer questions such as:

- What do I own and what do I owe?
- What is my net worth?
- How has my net worth changed over time?
- How are my assets and liabilities distributed?
- How much am I earning, spending, and saving?
- What is driving changes in my financial position?

The user provides the financial facts while Fullscope minimises the work required to turn them into a coherent picture.

## Product Scope

Fullscope aims to represent the main components of an individual's financial position:

- **Assets:** cash, investments, property, pensions, digital assets, and other relevant assets.
- **Liabilities:** mortgages, loans, credit, and other debt.
- **Cash flow:** income, expenses, transfers, contributions, withdrawals, and other relevant movements.
- **Financial position:** net worth, historical evolution, allocation, cash flow, savings, and changes in wealth.

Information may initially be entered manually and can later be imported or synchronised from external sources.

External sources are inputs to Fullscope, not the definition of its financial model. The core model should remain independent from any specific bank, broker, provider, API, or import format.

## Product Principles

### Financial position first

Fullscope's central purpose is to represent and understand the user's overall financial position. Transactions, expenses, investments, and other records support this purpose rather than defining it.

### Full picture

Assets, liabilities, cash flow, and investments are interconnected parts of the same financial picture.

### Historical and transparent

Financial position should be observable over time, and important figures should be traceable to the underlying information and calculations that produced them.

### User-controlled and extensible

Fullscope is self-hosted and designed to give users control over their financial data. The financial model should be designed to evolve as Fullscope expands into new asset types, liabilities, data sources, calculations, and analysis.

## Differentiation

Fullscope is not primarily a budgeting application, expense manager, accounting system, investment platform, or banking application.

Its focus is the **complete financial picture of an individual**.

It differentiates itself through:

- **Net-worth first:** overall financial position is central rather than a secondary report.
- **Historical:** users can understand how their financial position evolves over time.
- **Explainable:** important figures can be traced back to their underlying information.
- **Source-independent:** manual data, imports, and future integrations can feed the same financial model.
- **Self-hosted and open source:** users can run, inspect, and control the software and their data.

## Non-Goals

Fullscope is not intended to:

- Execute financial transactions.
- Act as a bank, broker, or payment platform.
- Replace professional accounting or tax software.
- Provide regulated financial advice.
- Depend on automatic integrations to be useful.

Budgeting, detailed expense management, forecasting, and planning may be included where they contribute to understanding the user's financial position, but none of them defines the core identity of Fullscope.

## Long-Term Vision

Fullscope should evolve from a tool for recording and observing financial position into an analytical layer for personal finance.

The long-term direction is:

**Record → Observe → Understand → Plan**

The financial model established at the core of Fullscope should make it possible to add deeper analysis, forecasting, scenarios, and planning over time without changing the fundamental purpose of the product.