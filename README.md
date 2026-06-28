# শিক্ষা সেতু — ShikkhaSetu

**A volunteer-based education connection platform for Bangladesh**

ShikkhaSetu connects verified university student volunteers with rural schools across Bangladesh, enabling structured educational support through filtered matching and request-based session scheduling.

---

## 🧩 Problem

Rural schools in Bangladesh face a shortage of skilled teachers and mentors, while many university students are willing to volunteer but lack a structured system to connect with those schools efficiently. This results in missed opportunities for meaningful educational collaboration.

## 💡 Solution

ShikkhaSetu provides a structured platform where rural school organizers can search and filter verified university student volunteers based on subject expertise, availability, and location. Organizers can send structured teaching requests for specific educational sessions — enabling efficient coordination between both parties.

---

## 👥 Target Users

- University student volunteers
- Rural school organizers / teachers
- System administrators

---

## ✨ Key Features

- 🔐 Role-based authentication — Volunteer, Organizer, Admin
- 👤 Structured volunteer profiles with academic and teaching preferences
- 🔍 Advanced filtering and search for volunteer discovery
- 📋 Request-based matching and approval workflow
- 📅 Session scheduling and coordination system
- ⭐ Rating and review system for completed sessions
- 🔔 Real-time notification system
- ✅ Admin verification and platform moderation

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) + Tailwind CSS |
| Backend | Node.js + Express |
| Database | MySQL |
| Auth | JWT (cookie-based) |
| Architecture | REST API |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MySQL 8+

### 1. Clone the repository

```bash
git clone https://github.com/shanto140/Shikkha-Setu.git
cd shikkha-setu
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=shikkha_setu
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

Run the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` folder:

```env
VITE_API_URL=http://localhost:3000
```

Run the frontend:

```bash
npm run dev
```

### 4. Database Setup

Import the SQL schema:

```bash
mysql -u root -p shikkha_setu < database/schema.sql
```

---

## 📁 Project Structure

```
shikkha-setu/
├── backend/
│   ├── config/          # DB config
│   ├── controllers/     # Route handlers
│   ├── middlewares/     # Auth, role middlewares
│   ├── routes/          # Express routes
│   ├── services/        # Business logic
│   ├── queries/         # DB queries
│   └── utils/           # Helper functions
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   └── utils/       # Frontend helpers
└── database/
    └── schema.sql
```

---



## 📄 License

This project is licensed under the MIT License.

---

<p align="center">Built with ❤️ for Bangladesh's students</p>