# Subscription Management System - Technical Documentation

## 1. Express.js Implementation Overview
Our project uses **Express.js**, a minimal and flexible Node.js web application framework. The architecture is designed for scalability and maintainability by separating concerns into distinct layers.

### Project Structure
*   **`app.js`**: The central entry point where middleware is registered and routes are mounted.
*   **Routes (`/routes`)**: Defines the API endpoints (e.g., `/auth`, `/users`, `/subscriptions`).
*   **Controllers (`/controllers`)**: Contains the business logic for each route, keeping the route files clean.
*   **Middlewares (`/middlewares`)**: Custom logic that runs during the request-response cycle (e.g., Auth, Error Handling, Rate Limiting).
*   **Models (`/models`)**: Defines the data structure and schema using Mongoose.

---

## 2. REST API Best Practices (restfulapi.net)
We adhere to industry-standard REST principles to ensure our API is predictable and easy to use.

*   **Nouns Over Verbs**: We use resource-based URIs like `/api/v1/subscriptions` instead of action-based ones like `/api/v1/get-subscriptions`.
*   **Pluralization**: Consistent use of plural nouns for resource collections (e.g., `/users`, `/subscriptions`).
*   **Versioning**: We use URI versioning (`/api/v1/...`) to ensure backward compatibility as the API evolves.
*   **Statelessness**: Each request from a client contains all the information (JWT) the server needs to fulfill it. The server does not store client session state.
*   **Logical Hierarchy**: Relationships are expressed through the URI path, such as `/users/:id` to identify a specific user resource.

---

## 3. HTTP Response Codes
The API uses standard HTTP status codes to communicate the result of a request.

| Code | Meaning | Usage in Project |
| :--- | :--- | :--- |
| **200** | OK | Successful GET or PUT requests. |
| **201** | Created | Successful POST requests (e.g., creating a user or subscription). |
| **400** | Bad Request | Validation errors (e.g., missing required fields). |
| **401** | Unauthorized | Authentication failure or missing token. |
| **403** | Forbidden | Access denied (e.g., bot detection or unauthorized resource access). |
| **404** | Not Found | Resource does not exist (e.g., invalid ID). |
| **409** | Conflict | Duplicate entry (e.g., email already registered). |
| **429** | Too Many Requests | Rate limit exceeded. |
| **500** | Internal Server Error | Unexpected server failures (caught by global error handler). |

---

## 4. Idempotency
An operation is **idempotent** if performing it multiple times has the same effect as performing it once.

*   **GET / DELETE / PUT**: Naturally idempotent. Deleting a resource twice results in the same outcome (the resource is gone).
*   **POST**: Not naturally idempotent (it creates a new resource). 
*   **Handling in Project**: We implement checks (e.g., verifying if a user exists by email during sign-up) to prevent unintended side effects from repeated POST requests, maintaining data integrity.

---

## 5. Rate Limiting (Security)
To protect our API from abuse and DDoS attacks, we have implemented rate limiting using **Arcjet**.

*   **Middleware**: Located in `middlewares/arcjet.middleware.js`.
*   **Logic**: Before reaching any route, Arcjet analyzes the request. If the client exceeds the allowed limit, the request is blocked, and a **429 Too Many Requests** status is returned.
*   **Bot Detection**: The same middleware identifies and blocks automated bots (returning **403 Forbidden**).

---

## 6. Atomic Operations in Databases
Atomic operations ensure that a series of database changes either **all succeed** or **all fail**, leaving the database in a consistent state.

### Implementation: Mongoose Transactions
In our `auth.controller.js`, we use **Mongoose Transactions** for the `signUp` process:
1.  **Start Session**: `const session = await mongoose.startSession();`
2.  **Start Transaction**: `session.startTransaction();`
3.  **Execute Operations**: Creating the user within the session.
4.  **Commit**: If everything is successful, `await session.commitTransaction();`
5.  **Abort/Rollback**: If an error occurs (e.g., JWT signing fails or DB error), `await session.abortTransaction();` ensures no partial data is saved.

This prevents "zombie" records where a user might be created in the database but the authentication token fails to generate.

---

## 7. Global Error Handling
We use a centralized error-handling middleware (`middlewares/error.middleware.js`) to provide consistent error responses.

*   **Benefits**: Keeps controllers clean of repetitive try-catch blocks for standard errors (like Mongoose validation errors).
*   **Format**: All errors return a JSON object: `{ success: false, error: "Message" }`.
