# 🎓 Scholarship Sahayata

**Scholarship Sahayata** is an integrated scholarship assistance platform designed to simplify scholarship awareness, application, document processing, communication, and monitoring for students, government officials, and Gram Sahayak volunteers.

The project brings together multiple frontend and backend modules into a unified system, including student authentication, scholarship information, government monitoring, real-time notifications, AI-assisted form filling, and volunteer support.

> ⚠️ **Important:** This repository contains multiple interconnected applications.  
> For the best experience, set up and open the modules in the sequence described in the **Recommended Run Sequence** section.

---
# 🎓 Scholarship Sahayata

Project description...

## 🎥 Project Demonstration

[ Project Demo ]
▶ Watch Complete Scholarship Sahayata Application and Prototype
https://www.youtube.com/@Team_AVISAC_SIH_2025_FINALIST
## 📌 Project Overview

Scholarship Sahayata aims to make the scholarship process easier and more accessible by providing a centralized platform for:

- Student registration and authentication
- Scholarship information and guidance
- Government monitoring
- Student notifications
- AI-assisted form filling
- Document processing
- Volunteer assistance
- Application tracking

The repository combines several applications that work together as part of the complete Scholarship Sahayata ecosystem.

---

# 🏗️ Project Architecture

The repository contains the following major modules:

```text
SCHOLARSHIP-SAHAYATA-SIH/
│
├── student-backend/
│
├── scholarship-sahayata-frontpage/
│
├── scholarship-sahayata-login-page/
│
├── scholarship-sahayata-govt.-dashboard/
│
├── scholarship-sahayata-student-notification/
│
├── SIH-AI-FORM-FILLER-Final/
│
├── gram-sahayak---volunteer-dashboard/
│
├── .gitignore
├── .gitattributes
└── README.md
```

---

# ✨ Main Modules

## 1. 🗄️ Student Backend

The **Student Backend** acts as the central backend service for student-related functionality.

### Responsibilities

- Student registration
- Student login and authentication
- Student information management
- Notification management
- Database communication
- Authentication and authorization
- API endpoints for connected frontend applications

### Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- REST APIs

---

## 2. 🏛️ Scholarship Sahayata Government Dashboard

The Government Dashboard provides an interface for authorized officials to manage and monitor scholarship-related activities.

### Features

- View student information
- Monitor scholarship activity
- Send notifications to students
- Manage announcements
- Access administrative functionality
- Track student-related information

The dashboard communicates with backend services to exchange information with other modules of the platform.

---

## 3. 🔔 Student Notification System

The Student Notification System provides scholarship-related updates and announcements to students.

### Features

- Scholarship notifications
- Administrative announcements
- Application-related updates
- Deadline reminders
- Student-specific communication
- Real-time notification support

Notifications generated from the administrative side can be delivered to the student-facing interface.

---

## 4. 🤖 SIH AI Form Filler

The **AI Form Filler** helps reduce the manual effort involved in filling scholarship application forms.

### Features

- Extract information from uploaded documents
- OCR-based document processing
- Automatic form filling
- PDF processing
- Document information extraction
- Reduced manual data entry

### Technologies

- Python
- FastAPI
- React.js
- Vite
- EasyOCR
- PyMuPDF
- OpenCV

The AI Form Filler consists of a separate frontend and backend service.

---

## 5. 🔐 Scholarship Sahayata Login Page

The Login Page serves as the authentication gateway for different users of the Scholarship Sahayata platform.

### Supported Users

- Students
- Government officials
- Gram Sahayak volunteers

### Features

- User login
- Authentication
- Role-based access
- Registration support
- OTP-related functionality
- Forgot-password functionality

After authentication, users can access functionality according to their role.

---

## 6. 🌐 Scholarship Sahayata Front Page

The Front Page acts as the main landing interface for Scholarship Sahayata.

### Features

- Introduction to Scholarship Sahayata
- Scholarship-related information
- Eligibility guidance
- Platform navigation
- Announcements
- Access to login
- Access to other platform functionality

This should be the **first page users interact with after all required services have been started**.

---

## 7. 🤝 Gram Sahayak Volunteer Dashboard

The Gram Sahayak Volunteer Dashboard is designed for volunteers who help students access and complete scholarship services.

### Features

- Assist students with scholarship applications
- Track student submissions
- Help with document-related processes
- Communicate with relevant platform services
- Support students who may require assistance using digital services

---

# 🔄 Recommended Run Sequence

Because Scholarship Sahayata consists of multiple interconnected frontend and backend modules, start the project components in the exact sequence below.

> ⚠️ **Important:** Start the modules in this order so that the required backend services and connected applications are available correctly. After the required modules are running, the **Scholarship Sahayata Front Page** should be opened in the browser as the main user entry point.

## Step 1 — Start Student Backend

First open:

```text
student-backend/
```

Install dependencies:

```bash
npm install
```

Configure the required environment variables.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

Then start the backend:

```bash
npm start
```

If the project uses another development script, use:

```bash
npm run dev
```

The Student Backend should be running before continuing.

---

## Step 2 — Start Government Dashboard

Open:

```text
scholarship-sahayata-govt.-dashboard/
```

Run:

```bash
npm install
npm run dev
```

Keep this application running while starting the remaining modules.

---

## Step 3 — Start Student Notification System

Open:

```text
scholarship-sahayata-student-notification/
```

If another project directory exists inside it, navigate to the directory containing `package.json`.

Then run:

```bash
npm install
npm run dev
```

Keep the Student Notification System running.

---

## Step 4 — Start AI Form Filler Backend

Open:

```text
SIH-AI-FORM-FILLER-Final/
```

Navigate to the Python backend directory.

Create a virtual environment if required:

```bash
python -m venv venv
```

### Windows

Activate it using:

```bash
venv\Scripts\activate
```

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI backend according to the backend entry file.

For example:

```bash
uvicorn main:app --reload
```

> The exact Uvicorn command depends on the filename containing the FastAPI `app`.

Make sure the backend is running before starting the AI Form Filler frontend.

---

## Step 5 — Start AI Form Filler Frontend

From the AI Form Filler frontend directory:

```bash
npm install
npm run dev
```

Keep both the AI Form Filler backend and frontend running.

---

## Step 6 — Start Login Page

Open:

```text
scholarship-sahayata-login-page/
```

Run:

```bash
npm install
npm run dev
```

Keep the Login Page running.

---

## Step 7 — Start Scholarship Sahayata Front Page

Open:

```text
scholarship-sahayata-frontpage/
```

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm run dev
```

If the Front Page has a separate backend, start that service as required as well.

---

## Step 8 — Open the Front Page in Your Browser

After the modules above are running successfully, open the **Scholarship Sahayata Front Page** in your browser.

The Front Page acts as the primary user entry point to the Scholarship Sahayata platform.

> **Do not begin by opening the individual dashboards directly. Start the required services first, then enter the application through the Front Page.**

---

## Step 9 — Start Gram Sahayak Volunteer Dashboard

Open:

```text
gram-sahayak---volunteer-dashboard/
```

Run:

```bash
npm install
npm run dev
```

This dashboard is intended for Gram Sahayak volunteers assisting students.

---

## 🚀 Complete Startup Sequence

```text
Student Backend
      ↓
Government Dashboard
      ↓
Student Notification System
      ↓
AI Form Filler Backend
      ↓
AI Form Filler Frontend
      ↓
Login
      ↓
Front Page
      ↓
OPEN THE FRONT PAGE IN BROWSER
      ↓
Gram Sahayak Volunteer Dashboard
      ↓
Navigate to all other modules through the application
```

Once setup is complete, use the **Scholarship Sahayata Front Page** as the main entry point and navigate to the other modules through the application's interface.

---

# 🚀 User Navigation Sequence

The startup order above describes how developers should launch the services. The user-facing flow begins only after the required services are running.

```text
Scholarship Sahayata Front Page
            ↓
         Login Page
            ↓
       User Authentication
            ↓
      Role-Based Navigation
        ↙       ↓        ↘
    Student  Government  Gram Sahayak
       ↓          ↓           ↓
  Scholarship  Government   Volunteer
  Services     Dashboard     Dashboard
       ↓
  AI Form Filler
       ↓
  Notifications / Updates
```

### Recommended user flow

**1. Front Page**

Users begin from the Scholarship Sahayata landing page after the project services have been started.

↓

**2. Login / Registration**

The user logs in or accesses the appropriate authentication functionality.

↓

**3. Role Selection / Authentication**

The platform determines whether the user is a:

- Student
- Government official
- Gram Sahayak volunteer

↓

**4. Role-Specific Interface**

Users are directed to the appropriate dashboard or services.

↓

**5. Scholarship Services**

Students can access scholarship information and available platform functionality.

↓

**6. AI Form Filler**

Students can use AI-assisted document processing and form-filling functionality where applicable.

↓

**7. Notifications**

Students can receive important scholarship updates, deadlines, and administrative announcements.

---

# 💻 Technology Stack

### Frontend

- React.js
- TypeScript
- JavaScript
- Vite
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- FastAPI
- REST APIs

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### AI & Document Processing

- Python
- EasyOCR
- PyMuPDF
- OpenCV

### Authentication & Communication

- JWT
- Socket.IO
- OTP-based functionality

### Development & Version Control

- Git
- GitHub
- Git LFS

---

# 📋 Prerequisites

Before running the complete project, install:

- Node.js
- npm
- Python
- pip
- Git
- Git LFS
- MongoDB or access to MongoDB Atlas

Verify installations using:

```bash
node --version
npm --version
python --version
pip --version
git --version
git lfs version
```

---

# 📥 Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Navigate into the project:

```bash
cd SCHOLARSHIP-SAHAYATA-SIH
```

Initialize Git LFS:

```bash
git lfs install
```

Download LFS-managed files if necessary:

```bash
git lfs pull
```

Then follow the **Recommended Run Sequence** above.

---

# 🔐 Environment Variables

Some modules require environment variables for database connections, authentication, APIs, or other services.

Depending on the module, environment configuration may include variables such as:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
GEMINI_API_KEY=your_api_key
```

Create the appropriate `.env` or `.env.local` file inside the relevant module according to its configuration.

> ⚠️ Never commit real API keys, passwords, database credentials, JWT secrets, service-account files, or `.env` files to GitHub.

Example configuration should contain placeholders only.

---

# 📦 Git LFS

This repository uses **Git Large File Storage (Git LFS)** for large media files such as MP4 videos.

After cloning the repository, run:

```bash
git lfs install
git lfs pull
```

You can verify LFS-managed files using:

```bash
git lfs ls-files
```

---

# 🔒 Security

When contributing to this project:

- Never commit `.env` files.
- Never hardcode real passwords.
- Never publish MongoDB credentials.
- Never commit private API keys.
- Never commit service-account credentials.
- Use environment variables for secrets.
- Use demo credentials only for demonstration environments.
- Revoke and rotate any credential accidentally exposed publicly.

---

# 🎯 Project Objective

Scholarship Sahayata aims to reduce the complexity students face while accessing scholarship services.

By combining scholarship information, authentication, AI-assisted form filling, government monitoring, notifications, and volunteer assistance, the platform attempts to provide a more accessible and organized scholarship ecosystem.

---

# 🤝 Contributing

Contributions are welcome.

To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit the changes.
5. Push your branch.
6. Create a Pull Request.

Example:

```bash
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

---

# 📄 License

Add the appropriate license for this project before redistribution or production use.

---

# 👨‍💻 Project Status

This project was developed as part of a scholarship assistance solution and contains multiple modules that demonstrate an integrated workflow involving students, government officials, volunteers, AI-based document processing, and scholarship communication.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

**Scholarship Sahayata — Simplifying Scholarship Access Through Technology**
