🚀 Advanced Inventory Management System
A high-performance, enterprise-grade Backend API built with Node.js. This project serves as a masterclass in Clean Architecture, Domain-Driven Design (DDD), and SOLID principles, demonstrating how to decouple business logic from infrastructure.

🛠️ Multi-Stack Infrastructure
This system is unique because its core is entirely agnostic. It is designed to run with multiple technology adapters:

Web Frameworks: Dual implementation using NestJS (Modular) and Fastify (High performance).

ORMs/Persistence: Supports both Prisma and Drizzle ORM.

Database: SQLite (Relational).

Documentation: Swagger UI (OpenAPI) integrated for both frameworks.

🏛️ Architecture & Design Patterns

1. Clean Architecture Layers
   Domain: Contains pure business logic. Includes Entities (with internal state validation), Value Objects (e.g., Price, Name), and Repository Interfaces.

Application: Orchestrates the system via Use Cases (e.g., SellProductUseCase, BuyProductUseCase). It remains untouched regardless of the framework used.

Infrastructure: The "detail" layer. Contains specific implementations for Prisma, Drizzle, and the HTTP servers (NestJS & Fastify).

2. SOLID Implementation
   Single Responsibility (SRP): Each use case handles exactly one business operation.

Dependency Inversion (DIP): Controllers and Use Cases depend on abstract interfaces, allowing you to swap Prisma for Drizzle without changing a single line of business logic.

📋 API Endpoints (Swagger)
The API is fully documented. Depending on which server you start, the documentation is available at:

- NestJS: http://localhost:3000/api

- Fastify: http://localhost:3000/docs

Method Endpoint Description

POST /products Create a new product
GET /products Retrieve all products
GET /products/:id Retrieve a product by ID
PUT /products/:id Update a product by ID
DELETE /products/:id Delete a product by ID
POST /products/sell Business Logic: Decrease stock balance
POST /products/buy Business Logic: Increase stock balance

📂 Project Structure

src
├── application/product # Use Cases & DTOs (Framework Agnostic)
├── domain/product # Entities, Value Objects & Repository Interfaces
└── infrastructure # External Tools & Frameworks
├── http # Web Adapters
│ ├── nestjs # Controllers, Modules, NestJS Main
│ └── fastify # Routes, Container, Fastify Main
├── prisma # Prisma Service & Schema
├── drizzle # Drizzle Config & Service
└── product # Concrete Repository Implementations (Prisma/Drizzle)

🚀 Getting Started

1. Installation

```
npm install
```

2. Database Setup

```
# Para Prisma
npx prisma generate
npx prisma db push

# Para Drizzle
npx drizzle-kit generate
npx drizzle-kit push
```

3. Running the Application
   You can choose which engine to boot:

```
npm run dev
```

💡 Key Highlights for Interviewers
Framework Agnosticism: The project proves that the business logic is not a "NestJS App" but a "Product Domain" that happens to use NestJS as an entry point.

Rich Domain Model: Products are not just data bags; they use Value Objects to ensure domain invariants (e.g., price cannot be negative).

Polymorphic Persistence: Demonstrates the ability to switch between two different ORMs (Prisma and Drizzle) by simply changing the provider in the Dependency Injection container.

Explicit Business Actions: Instead of generic "Updates," the API uses /sell and /buy to reflect real-world inventory movements.
