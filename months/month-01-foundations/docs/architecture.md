## Architecture Standard (Layered Architecture)

Starting from Module 25, all modules follow a **Layered Architecture**. This design pattern aims to strictly separate core business rules from external tools and frameworks (such as Express or Databases).

### Directory Structure
Every module or feature must adhere to the following organization within the `src/` directory:

```text
src/
├── core/                       # DOMAIN LAYER (The "What")
│   ├── entities/               # ➜ Pure classes defining the data models (e.g., User.ts, Product.ts)
│   └── interfaces/             # ➜ Contracts that repositories must fulfill (Dependency Inversion)
│
├── services/                   # APPLICATION LAYER (The "How")
│   └── [Name]Service.ts        # ➜ Business logic, validations, and use cases.
│                               #   Communicates strictly with 'core' and never touches the DB directly.
│
├── infrastructure/             # INFRASTRUCTURE LAYER (Technical Details)
│   ├── controllers/            # ➜ HTTP handling (req, res). Translates web requests into service calls.
│   └── repositories/           # ➜ Concrete DB implementations (Memory, FS, SQL). Fulfills 'core' interfaces.
│
├── middlewares/                # Cross-cutting concerns (Authentication, Zod Validation, Error Handling)
└── index.ts                    # ENTRY POINT (Composition Root)
                                # ➜ Instances are created and dependencies are manually injected here.
```

### Defined Layers

#### **1. Domain Layer (Core)**
Contains the essential business rules of the system, represented through:
- Domain Entities
- Repository Interfaces (Contracts)

This layer is completely agnostic of any technical details or frameworks and must never depend on external code.

---

#### **2. Application Layer (Services)**
Implements the use cases and business logic corresponding to the domain rules. It communicates with the Domain Layer via interfaces, and with the Infrastructure Layer via Dependency Injection, remaining completely unaware of specific implementations (e.g., databases or web frameworks).

Main responsibilities:
- Orchestrate business operations
- Apply business validations
- Ensure the correct data flow between domains and repositories

---

#### **3. Infrastructure Layer**
Contains concrete implementations of technical details external to the domain, such as:
- HTTP Servers (Express)
- Concrete data repositories (Prisma, FileSystem, In-Memory)
- Integrations with third-party libraries and external services

This is the only layer allowed to depend on frameworks and external tools. Its sole responsibility is to translate abstractions from the upper layers into concrete actions.

---

#### **4. Composition Root**
This is the application's entry point where:
- Class instances are configured
- Dependencies are wired together
- Concrete services and repositories are injected

It is typically represented by the main file (e.g., `index.ts`) and acts as the system's final assembler.

---

### Architectural Benefits

- **Separation of Concerns (SoC):** Each layer has a single, clearly defined role.
- **Loose Coupling:** Upper layers do not depend on concrete infrastructure details.
- **Testability:** Components can be easily tested in isolation using mocks and stubs.
- **Scalability:** Facilitates extending the application without breaking existing functionality.

This approach ensures the construction of clean, maintainable, and robust applications, fully aligned with modern software engineering best practices.