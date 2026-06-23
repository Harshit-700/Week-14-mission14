

# 🔐 Secure Authentication System (MERN + JWT)

A modern full-stack authentication application built using **React, Node.js, Express, MongoDB, Mongoose, JWT, and bcrypt.js**. The project demonstrates secure user authentication, encrypted password storage, protected API routes, JWT-based authorization, and client-side route protection for authenticated users.

---

📸 Screenshot- ![img alt](https://github.com/Harshit-700/Week-14-mission14/blob/25be80143d9c9f769fa35859ac1e23168436989e/Screenshot%20(449).png)


🔗 Live Demo frontend url: https://week-14-mission14-eight.vercel.app
🔗 Live Demo backend url: https://week-14-mission14-1.onrender.com

## 🚀 Features

### 🔑 Authentication
- User Registration
- User Login
- JWT Token Generation
- JWT Verification Middleware
- Secure Logout
- Protected Dashboard
- Protected API Routes

### 🔒 Security
- Password Hashing using bcrypt.js
- JWT Authentication
- Authorization Middleware
- Environment Variables
- Secure Password Storage
- Request Validation
- Error Handling

### 📱 Frontend
- React + Vite
- React Router DOM
- Context API Authentication
- Protected Routes
- Automatic Login Redirect
- Responsive Authentication Pages

### ⚙ Backend
- Express REST APIs
- MongoDB Database
- Mongoose Models
- Authentication Middleware
- Modular Folder Structure
- CRUD Ready Architecture

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- React Router DOM
- Context API
- CSS

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (jsonwebtoken)
- bcrypt.js
- dotenv
- cors

---

# 📁 Project Structure

```
auth-project
│
├── backend
│   ├── config
│   │   └── jwt.js
│   │
│   ├── middleware
│   │   └── auth.js
│   │
│   ├── models
│   │   └── User.js
│   │
│   ├── routes
│   │   ├── auth.js
│   │   └── tasks.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend
    ├── src
    │   ├── api
    │   ├── components
    │   ├── context
    │   ├── pages
    │   ├── App.jsx
    │   └── main.jsx
    │
    ├── package.json
    └── vite.config.js
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/auth-project.git
```

---

## Backend Setup

```bash
cd backend

npm install

npm start
```

### Environment Variables

Create a **.env** file

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🔐 Authentication Workflow

```
User Registration
        │
        ▼
Password Hashing (bcrypt)
        │
        ▼
Store User in MongoDB
        │
        ▼
User Login
        │
        ▼
JWT Token Generation
        │
        ▼
Token Stored in LocalStorage
        │
        ▼
Protected Dashboard
        │
        ▼
Protected APIs
```

---

# 🌐 API Endpoints

## Authentication

| Method | Endpoint | Description |
|----------|---------------------|----------------------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login existing user |
| GET | /api/auth/me | Get authenticated user |
| POST | /api/auth/logout | Logout user |

---

## Tasks

| Method | Endpoint | Description |
|----------|----------------|----------------|
| GET | /api/tasks | Fetch Tasks |
| POST | /api/tasks | Create Task |
| PUT | /api/tasks/:id | Update Task |
| DELETE | /api/tasks/:id | Delete Task |

---

# 🔒 Security Features

✔ Password Hashing using bcrypt.js

✔ JWT Authentication

✔ Authorization Middleware

✔ Protected Routes

✔ Environment Variables

✔ Secure Password Storage

✔ Request Validation

✔ REST API Security

✔ Error Handling

---

# 💻 Screenshots

## Register Page

📸 Screenshot- ![img alt](https://github.com/Harshit-700/Week-14-mission14/blob/25be80143d9c9f769fa35859ac1e23168436989e/Screenshot%20(451).png)

---

## Login Page

📸 Screenshot- ![img alt](https://github.com/Harshit-700/Week-14-mission14/blob/25be80143d9c9f769fa35859ac1e23168436989e/Screenshot%20(450).png)

---

## Dashboard

📸 Screenshot- ![img alt](https://github.com/Harshit-700/Week-14-mission14/blob/25be80143d9c9f769fa35859ac1e23168436989e/Screenshot%20(449).png)

---

# 📈 Future Improvements

- Email Verification
- OTP Authentication
- Password Reset
- Refresh Token Authentication
- Role Based Authorization
- User Profile


---


