# 🎓 University Admin Dashboard

A full-stack **University Admin Dashboard** built with **PHP (backend)** and **React.js (frontend)**. This system allows administrators to manage users, monitor posts, and control platform activity efficiently.

---

## 📌 Features

### 👥 User Management

* View all registered users
* Users are categorized into
* (Students) – with Student ID
* Teachers
* Search and filter users
* View detailed user profiles

### 🆔 Student ID Tracking

* Each student has a unique **Student ID**
* Easily searchable and linked with user data
* Useful for academic verification and monitoring

### 📝 Post Monitoring System

* Admin can:

  * View all user posts
  * Track user activity
  * Identify inappropriate or spam content

### 🔍 Post Finding System

* Search posts by:

  * Keywords
  * User
  * Date
* Fast filtering for efficient moderation

### 🚫 Ban / ✅ Unban System

* Admin can:

  * Ban users who violate rules
  * Unban users when necessary
* Real-time status updates
* Prevent banned users from accessing the platform

---

## 🛠️ Tech Stack

### Frontend

* **React.js**
* **Material UI (optional for UI components)**
* Axios for API communication

### Backend

* **PHP (Core PHP / REST API)**
* MySQL Database

---

## 🗂️ Project Structure

```
/frontend (React)
  ├── src/
  ├── components/
  ├── pages/
  └── services/

/backend (PHP)
  ├── api/
  ├── config/
  ├── controllers/
  └── models/
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```
git clone https://github.com/your-repo/admin-dashboard.git
cd admin-dashboard
```

### 2. Setup Backend (PHP)

* Place backend folder in **htdocs** (XAMPP) or server directory
* Configure database in:

```
/backend/config/db_connect.php
```

* Import SQL file into MySQL

### 3. Setup Frontend (React)

```
cd frontend
npm install
npm start
```

---

## 🔗 API Endpoints (Sample)

| Method | Endpoint              | Description     |
| ------ | --------------------- | --------------- |
| GET    | /users                | Get all users   |
| GET    | /users?role=student   | Filter students |
| POST   | /ban-user             | Ban a user      |
| POST   | /unban-user           | Unban a user    |
| GET    | /posts                | Get all posts   |
| GET    | /posts?search=keyword | Search posts    |

---

## 🔐 Security Features

* Input validation (backend)
* Prepared statements (prevent SQL injection)
* Role-based access (Admin only features)

---

## 🚀 Future Improvements

* Users Report System
* Advanced analytics dashboard
* Deleting hateful contents if its found by users' reports

---

## 👨‍💻 Author

Developed as a university project using **PHP & React.js**

---

## 📄 License

This project is for educational purposes.

---

## 💡 Notes

* Make sure backend server is running before starting frontend
* Update API base URL in React `.env` file if needed

---
