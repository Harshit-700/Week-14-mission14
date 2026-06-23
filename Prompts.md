# 📚 AI Prompt Engineering Documentation

The following AI engineering prompts were used throughout the development of this project to guide the architecture, implementation, security, and deployment of the authentication system. Each prompt represents a distinct engineering objective that contributed to building a secure, scalable, and production-oriented full-stack application.

---

## Prompt 1

### **Theme:** Secure User Authentication using JWT

**Engineering Objective:**

Design and implement a secure, production-ready authentication system using **Node.js**, **Express.js**, **MongoDB**, **React**, and **JSON Web Tokens (JWT)**. The system should support user registration, authentication, authorization, and protected resource access while following modern web security practices. Passwords must never be stored in plain text and every authenticated request should be validated through JWT-based authorization.

---

## Prompt 2

### **Theme:** Password Encryption & User Security

**Engineering Objective:**

Implement password encryption using **bcrypt.js** to securely hash user passwords before storing them in the database. Configure automatic password hashing through Mongoose middleware and ensure password comparison is handled securely during login using bcrypt's compare functionality.

---

## Prompt 3

### **Theme:** MongoDB Data Modeling

**Engineering Objective:**

Design a scalable and maintainable **User Schema** using Mongoose. Include fields such as **Name**, **Email**, and **Password** with appropriate validation rules, uniqueness constraints, timestamps, and reusable instance methods. The schema should support future enhancements without requiring major structural modifications.

---

## Prompt 4

### **Theme:** JWT Token Generation & Authorization

**Engineering Objective:**

Generate cryptographically signed JSON Web Tokens immediately after successful user authentication. Configure secure token expiration policies and implement reusable helper functions for signing, verifying, and decoding JWTs to support authenticated communication between the client and server.

---

## Prompt 5

### **Theme:** RESTful Authentication API Development

**Engineering Objective:**

Develop RESTful authentication endpoints including user registration, login, current-user retrieval, and logout. Follow REST API standards by returning appropriate HTTP status codes, structured JSON responses, and comprehensive error messages while maintaining consistent API design principles.

---

## Prompt 6

### **Theme:** Authentication Middleware & Protected APIs

**Engineering Objective:**

Develop reusable Express middleware capable of extracting JWT tokens from request headers, validating their authenticity, identifying authenticated users, and protecting sensitive API endpoints. Unauthorized requests must be rejected with meaningful HTTP 401 responses.

---

## Prompt 7

### **Theme:** React Authentication Interface

**Engineering Objective:**

Design responsive Login and Registration pages using React that communicate seamlessly with backend authentication APIs. Implement form validation, loading states, error handling, and successful authentication workflows while maintaining a clean and intuitive user experience.

---

## Prompt 8

### **Theme:** Global Authentication State Management

**Engineering Objective:**

Implement centralized authentication state management using the React Context API. Store authenticated user information, authentication status, and JWT tokens in a reusable context provider that enables secure authentication across the entire application.

---

## Prompt 9

### **Theme:** Protected Dashboard & Route Security

**Engineering Objective:**

Create protected frontend routes that are accessible only to authenticated users. Implement automatic redirection to the login page whenever the authentication token is missing, invalid, or expired while preserving application security and user experience.

---

## Prompt 10

### **Theme:** Secure Task Management API

**Engineering Objective:**

Develop authenticated CRUD APIs for task management that can only be accessed by verified users. Ensure every request passes through authentication middleware before interacting with the database and maintain strict authorization for all protected resources.

---

## Prompt 11

### **Theme:** Environment Configuration & Secret Management

**Engineering Objective:**

Secure all sensitive application credentials using environment variables managed through **dotenv**. Store MongoDB connection strings, JWT secrets, application ports, and client configuration outside the source code to improve security and deployment flexibility.

---

## Prompt 12

### **Theme:** Error Handling & API Reliability

**Engineering Objective:**

Implement centralized error handling throughout the backend application. Ensure validation errors, authentication failures, server exceptions, and database errors are returned using standardized JSON responses with meaningful status codes to improve debugging and API reliability.

---

## Prompt 13

### **Theme:** Modular Backend Architecture

**Engineering Objective:**

Structure the backend application into independent modules including configuration files, middleware, routes, controllers, and database models. Follow separation of concerns to improve code readability, maintainability, scalability, and long-term project organization.

---

## Prompt 14

### **Theme:** Frontend–Backend Integration

**Engineering Objective:**

Integrate the React frontend with the Express backend using secure HTTP requests. Persist JWT tokens in browser storage after successful authentication, automatically attach authorization headers to protected API requests, and gracefully handle expired or invalid authentication sessions.

---

## Prompt 15

### **Theme:** Full-Stack Authentication System Architecture

**Engineering Objective:**

Build a complete authentication ecosystem that integrates secure user registration, encrypted password storage, JWT generation, protected APIs, role-independent authorization middleware, frontend route protection, dashboard access, logout functionality, and secure client-server communication. The final architecture should demonstrate modern authentication practices suitable for real-world MERN stack applications.
