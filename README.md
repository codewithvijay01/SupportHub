# 🎫 SupportHub

SupportHub is a full-stack customer support ticket management system where users can create, manage, and track support tickets, while administrators can monitor all tickets and update their status.

## 🌐 Live Demo

**Frontend:** https://supporthub-1.onrender.com

**Backend API:** https://supporthub-aau2.onrender.com

## 🚀 Features

### 👤 User Features

- User registration and login
- JWT-based authentication
- Create support tickets
- View personal tickets
- View detailed ticket information
- Edit ticket title, description, and priority
- Delete tickets
- Track ticket status
- Priority levels: Low, Medium, High

### 🛡️ Admin Features

- Secure admin authentication
- Admin-only dashboard access
- View all user tickets
- View user information associated with tickets
- Update ticket status
- Manage ticket workflow

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- CSS

### Backend

- Node.js
- Express.js
- REST API

### Database

- MongoDB
- Mongoose
- MongoDB Atlas

### Authentication & Security

- JSON Web Token (JWT)
- bcryptjs
- Protected routes
- Role-based authorization

### Tools

- Git
- GitHub
- VS Code
- Postman
- Render

## 📁 Project Structure

```text
SupportHub/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── server/
    ├── src/
    │   ├── models/
    │   │   ├── User.js
    │   │   └── Ticket.js
    │   ├── routes/
    │   │   ├── authRoutes.js
    │   │   ├── userRoutes.js
    │   │   ├── ticketRoutes.js
    │   │   └── adminRoutes.js
    │   ├── authMiddleware.js
    │   ├── adminMiddleware.js
    │   ├── database.js
    │   └── index.js
    │
    ├── package.json
    └── .gitignore
```

## 🔐 Authentication

SupportHub uses JWT authentication to protect private routes.

- Users receive a JWT token after successful login.
- Protected APIs require a valid authentication token.
- Admin routes require an authenticated user with the `admin` role.
- Passwords are securely hashed using bcryptjs.
- Sensitive environment variables are stored in `.env`.

## 🎯 Ticket Workflow

Tickets follow a simple support workflow:

```text
Open → In Progress → Resolved → Closed
```

Tickets also support three priority levels:

```text
Low
Medium
High
```

## 📌 API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### User

```text
GET /api/users/profile
```

### Tickets

```text
POST   /api/tickets
GET    /api/tickets
GET    /api/tickets/:id
PUT    /api/tickets/:id
DELETE /api/tickets/:id
```

### Admin

```text
GET /api/admin/test
GET /api/admin/tickets
PUT /api/admin/tickets/:id/status
```

## ⚙️ Local Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/codewithvijay01/SupportHub.git

cd SupportHub
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

Backend will run locally on:

```text
http://localhost:5000
```

### 3. Setup Frontend

Open another terminal:

```bash
cd SupportHub/client
npm install
npm run dev
```

Frontend will run locally on:

```text
http://localhost:5173
```

## 🔒 Environment Variables

The following environment variables are required for the backend:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

**Never commit `.env` files or sensitive credentials to GitHub.**

## ☁️ Deployment

SupportHub is deployed using:

- **Frontend:** Render Static Site
- **Backend:** Render Web Service
- **Database:** MongoDB Atlas

The production application is connected to the deployed backend API and MongoDB database.

## 🚧 Future Improvements

- Search and filter tickets
- Pagination
- Email notifications
- User profile management
- Admin analytics dashboard
- Ticket comments
- File attachments
- Real-time ticket updates
- Improved notification system

## 👨‍💻 Developer

**Vijay Kumar**

B.Tech Computer Science Engineering
Parul University

## ⭐ Support

If you find this project useful, feel free to explore the repository and give it a ⭐ on GitHub.

**GitHub:** https://github.com/codewithvijay01/SupportHub
