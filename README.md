# Me-API Playground

📄 **Resume:** https://drive.google.com/file/d/15RrrbDNg1Le7y4WAxuCVERfi9-pdIYZr/view?usp=sharing

A full-stack personal profile application exposing a REST API with query endpoints and a minimal frontend to view and search profile data.

This project was built as part of a technical assessment and focuses on clean backend design, query handling, and a simple but functional UI.

---

## 🚀 Features

### Backend (REST API)
- Create, read, update, and delete a personal profile
- Query endpoints for:
  - Listing projects
  - Filtering projects by skill
  - Keyword-based search
  - Top skills aggregation
- Health check endpoint for service liveness
- Rate limiting to prevent API abuse
- Request validation for clean and safe input handling

### Frontend
- Minimal, responsive UI
- Displays profile, skills, and projects
- Live search functionality using backend search API
- Fully driven by the hosted backend API

---
# Project Structure

```text
.
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
├── schema.md
└── src
    ├── app.js
    ├── config
    │   └── db.js
    ├── controllers
    │   └── profile.controller.js
    ├── middleware
    │   ├── rateLimit.js
    │   └── validateRequest.js
    ├── models
    │   └── profile.model.js
    ├── public
    │   ├── index.html
    │   ├── script.js
    │   └── styles.css
    ├── routes
    │   └── profile.routes.js
    └── server.js

```

## 🛠️ Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- express-validator
- express-rate-limit

**Frontend**
- HTML
- CSS
- Vanilla JavaScript

**Deployment**
- Render (Backend + Static Frontend)

---


## 📌 API Endpoints

### Profile
- `POST /api/profile` – Create profile (one-time)
- `GET /api/profile` – Fetch profile
- `PUT /api/profile` – Update profile
- `DELETE /api/profile` – Delete profile

### Queries
- `GET /api/projects` – List all projects
- `GET /api/projects?skill=AI` – Filter projects by skill
- `GET /api/search?q=keyword` – Search projects by keyword
- `GET /api/skills/top` – Aggregate top skills

### Health
- `GET /health` – Service health check

---

## 🗄️ Database Schema

The database schema is documented in detail in [`schema.md`](./schema.md).

Key points:
- Single `profile` collection
- Embedded projects for simplicity
- Indexed fields for efficient search and filtering

---

## ⚙️ Local Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas connection string

### Steps
```bash
git clone <repository-url>
cd me-api-playground
npm install
```

## 🌐 Live Links

- **Frontend & API:** https://api-play.onrender.com
- **GitHub:** https://github.com/namra-ace
- **LinkedIn:** https://linkedin.com/in/namrarajodiya
