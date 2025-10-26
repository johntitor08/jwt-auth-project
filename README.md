# Document Heading

🔐 JWT Authentication System
A full-stack JWT authentication system built with React.js frontend and Node.js/Express.js backend, featuring MongoDB Atlas cloud database integration.

<https://img.shields.io/badge/JWT-Authentication-blue>
<https://img.shields.io/badge/Database-Cloud%2520MongoDB-green>
<https://img.shields.io/badge/Frontend-React%252018-blue>
<https://img.shields.io/badge/Backend-Node.js%252FExpress-green>

✨ Features
✅ User Registration & Login

✅ JWT Token-based Authentication

✅ Protected Routes & Middleware

✅ Password Hashing with bcryptjs

✅ MongoDB Atlas Cloud Database

✅ React Context API for State Management

✅ Responsive UI with Modern Design

✅ Auto-login with localStorage

✅ User Profile Management

✅ Secure Logout

🛠 Tech Stack
Frontend
React.js 18 - UI Framework

Axios - HTTP Client

Context API - State Management

CSS3 - Styling with Modern Features

Backend
Node.js - Runtime Environment

Express.js - Web Framework

MongoDB Atlas - Cloud Database

Mongoose - ODM for MongoDB

JWT - JSON Web Tokens

bcryptjs - Password Hashing

CORS - Cross-Origin Resource Sharing

🚀 Quick Start
Prerequisites
Node.js (v14 or higher)

MongoDB Atlas account (free tier)

Git

Installation
Clone the repository

git clone <https://github.com/your-username/jwt-auth-project.git>
cd jwt-auth-project

cd jwt-auth-backend

# Install dependencies

npm install

# Create environment file

cp .env.example .env

# Configure environment variables (see below)

cd ../jwt-auth-frontend

# Install dependencies

npm install

# Start development server

npm start

⚙️ Environment Configuration
Backend (.env)

PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.yoagdzs.mongodb.net/jwt_auth?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=30d
NODE_ENV=development
CORS_ORIGIN=<http://localhost:3000>

🗄️ API Endpoints
Method Endpoint Description Access
POST /api/auth/register Register new user Public
POST /api/auth/login User login Public
GET /api/auth/profile Get user profile Protected
GET /health Server health check Public

Example Requests

Register User

curl -X POST <http://localhost:5000/api/auth/register> \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "<test@example.com>",
    "password": "password123"
  }'

Login User

curl -X POST <http://localhost:5000/api/auth/login> \
  -H "Content-Type: application/json" \
  -d '{
    "email": "<test@example.com>",
    "password": "password123"
  }'

🎨 UI Components
Authentication Forms
Login Form: Email and password authentication

Register Form: Username, email, and password registration

Form Validation: Client-side validation with error messages

User Interface
Navbar: Dynamic navigation with user dropdown

Profile Page: User information and account settings

Responsive Design: Mobile-first approach

🔒 Security Features
JWT tokens with expiration

Password hashing using bcryptjs

Protected API routes with middleware

CORS configuration

Input validation and sanitization

Secure HTTP headers

📱 Browser Support
Chrome (recommended)

Firefox

Safari

Edge

Note: Some ad blockers may interfere with localhost API calls. Use incognito mode or disable extensions if needed.

🚨 Troubleshooting
Common Issues
MongoDB Connection Error

Check MongoDB Atlas connection string

Verify IP whitelist in Atlas dashboard

Ensure database user credentials are correct

CORS Errors

Verify frontend URL in backend CORS configuration

Check environment variables

JWT Token Issues

Verify JWT_SECRET in environment variables

Check token expiration settings

Port Already in Use

Change PORT in .env file

Update frontend API_URL accordingly

Debug Mode
Enable debug logging by setting NODE_ENV=development in backend .env file.

🤝 Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

👥 Authors
John Titor - <johntitortheprogrammer@gmail.com>

🙏 Acknowledgments
MongoDB Atlas for free cloud database tier

React and Node.js communities

JWT.io for authentication standards

📞 Support
For support, email <johntitortheprogrammer@gmail.com> or create an issue in the repository.

⭐ Don't forget to star this repository if you found it helpful!
