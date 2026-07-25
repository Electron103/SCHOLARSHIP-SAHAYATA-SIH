# Student Backend - Scholarship Sahayata Web App

This backend handles all student database operations for the Scholarship Sahayata project.

---

## 📌 TECH STACK
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication (Admin only)

---

## 📁 FOLDER STRUCTURE

controllers/
models/
routes/
middleware/
config/
server.js
.env
package.json

---

## 🚀 HOW TO RUN BACKEND

### 1️⃣ Install Dependencies
npm install

### 2️⃣ Create `.env` in root folder
PORT=5000
MONGO_URI=your_mongo_atlas_url_here
JWT_SECRET=mysupersecretkey

### 3️⃣ Start Server
node server.js
OR
npm run dev (if nodemon installed)

---

## 📌 STUDENT API ENDPOINTS

### ➤ Create Student (Public)
POST /api/students

Body Example:
{
  "fullName": "Asha Sharma",
  "phone": "9876543210",
  "email": "asha@gmail.com",
  "college": "SSTC Bhilai",
  "course": "B.Tech",
  "year": "3rd"
}

---

### ➤ Get All Students (Admin Protected)
GET /api/students

Headers:
Authorization: Bearer <token>

---

### ➤ Get Student by ID
GET /api/students/:id

---

### ➤ Update Student
PUT /api/students/:id

---

### ➤ Delete Student
DELETE /api/students/:id

---

## 📌 ADMIN AUTH ENDPOINTS

### ➤ Create Admin (run once)
POST /api/auth/create-admin
{
  "username": "admin12",
  "password": "password13"
}

### ➤ Admin Login
POST /api/auth/login
{
  "username": "admin12",
  "password": "password13"
}

Returns:
{
  "token": "..."
}

Use this token for accessing protected student routes.

---

## ✔ BACKEND COMPLETED BY:
- Vandana
- Role: Student Database Backend Developer
