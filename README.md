# 📅 Deadline Tracker

A modern, full-stack web application for managing deadlines and tasks with real-time tracking, priority management, and user authentication.

![Deadline Tracker](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)

## 🚀 Live Demo

**Link**: [https://track-the-deadline.vercel.app](https://track-the-deadline.vercel.app)

<img width="1771" height="950" alt="image" src="https://github.com/user-attachments/assets/b8c76950-e599-47ba-b864-8896efd15245" />


## ✨ Features

### 🔐 **Authentication & Security**
- **Secure User Registration & Login** with JWT tokens
- **Password Hashing** using bcryptjs with salt rounds
- **Protected Routes** with middleware authentication
- **CORS Protection** configured for production domains
- **Rate Limiting** to prevent abuse (100 requests per 15 minutes)
- **Security Headers** (HSTS, XSS Protection, Clickjacking prevention)

### 📋 **Deadline Management**
- **Create, Read, Update, Delete** deadlines
- **Priority Levels**: High, Medium, Low
- **Status Tracking**: Pending, Completed
- **Due Date Management** with date validation
- **Rich Descriptions** for detailed task information

### 🎨 **User Experience**
- **Modern UI** built with React 18 and TypeScript
- **Responsive Design** works on desktop and mobile
- **Real-time Updates** with React Query
- **Form Validation** using Zod schemas
- **Toast Notifications** for user feedback
- **Dark/Light Theme** support

### 🔧 **Technical Features**
- **Full-stack TypeScript** application
- **Prisma ORM** with PostgreSQL database
- **Input Validation** on both client and server
- **Error Handling** with proper HTTP status codes
- **Environment-based Configuration**
- **Production-ready Deployment** on Vercel & Railway

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for client-side routing
- **TanStack Query** for server state management
- **React Hook Form** for form handling
- **Zod** for client-side validation
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **Prisma** ORM with PostgreSQL
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Zod** for server-side validation
- **Helmet** for security headers
- **CORS** for cross-origin requests
- **Express Rate Limit** for API protection

### Database
- **PostgreSQL** for data persistence
- **Prisma Migrations** for schema management
- **Database Indexing** for optimized queries

### Deployment
- **Vercel** for frontend hosting
- **Railway** for backend hosting and database
- **Environment Variables** for configuration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (or use Railway's managed PostgreSQL)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/deadline-tracker.git
cd deadline-tracker
```

### 2. Backend Setup
```bash
cd server
npm install

# Copy environment template
cp ENV_TEMPLATE.txt .env

# Edit .env with your configuration
# Required variables:
# DATABASE_URL=postgresql://...
# JWT_SECRET=your-super-secret-jwt-key
# FRONTEND_URL=http://localhost:8081
# NODE_ENV=development
# PORT=3000

# Generate Prisma client and run migrations
npm run prisma:generate
npm run prisma:migrate

# Start development server
npm run dev
```

### 3. Frontend Setup
```bash
# From project root
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your backend URL
# VITE_API_URL=http://localhost:3000/api

# Start development server
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:8081
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/health

## 📖 Usage Guide

### For End Users

1. **Registration**: Create a new account with email and password
2. **Login**: Sign in with your credentials
3. **Create Deadlines**: Add new tasks with title, description, due date, and priority
4. **Manage Tasks**: Edit, mark as complete, or delete deadlines
5. **Filter & Sort**: Organize tasks by priority, status, or due date
6. **Stay Organized**: Use priority levels to focus on important tasks

### For Developers

#### API Endpoints

**Authentication**
```
POST /api/auth/register - Register new user
POST /api/auth/login - User login
POST /api/auth/logout - User logout
GET  /api/auth/me - Get current user
```

**Deadlines**
```
GET    /api/deadlines - Get all user deadlines
POST   /api/deadlines - Create new deadline
GET    /api/deadlines/:id - Get specific deadline
PUT    /api/deadlines/:id - Update deadline
DELETE /api/deadlines/:id - Delete deadline
```

#### Environment Variables

**Frontend (.env)**
```bash
VITE_API_URL=https://your-backend-url.railway.app/api
```

**Backend (.env)**
```bash
DATABASE_URL=postgresql://user:pass@host:5432/dbname
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://your-frontend-url.vercel.app
```

## 🔒 Security Features

### Production Security Checklist ✅
- [x] **JWT Authentication** with secure secret keys
- [x] **Password Hashing** using bcryptjs with salt rounds
- [x] **CORS Configuration** for specific domains only
- [x] **Rate Limiting** to prevent API abuse
- [x] **Security Headers** (HSTS, XSS Protection, Clickjacking prevention)
- [x] **Input Validation** using Zod schemas
- [x] **SQL Injection Protection** via Prisma ORM
- [x] **Environment Variables** for sensitive data
- [x] **HTTPS Enforcement** in production
- [x] **Error Handling** without information leakage

### Security Best Practices
- All passwords are hashed before storage
- JWT tokens expire after 7 days
- API requests are rate-limited per IP
- CORS is configured for specific domains only
- Security headers prevent common attacks
- Input validation on both client and server
- Database queries are protected against SQL injection

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variable: `VITE_API_URL=https://your-backend-url.railway.app/api`
3. Deploy automatically on git push

### Backend (Railway)
1. Connect your GitHub repository to Railway
2. Set environment variables:
   - `DATABASE_URL` (auto-generated with PostgreSQL)
   - `JWT_SECRET` (generate a secure random string)
   - `FRONTEND_URL` (your Vercel frontend URL)
   - `NODE_ENV=production`
3. Railway auto-deploys on git push

### Database
Railway provides managed PostgreSQL with automatic backups and scaling.

## 🧪 Testing

### Manual Testing
```bash
# Test backend health
curl https://your-backend-url.railway.app/health

# Test user registration
curl -X POST https://your-backend-url.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

### API Testing
Use tools like Postman or curl to test API endpoints. All endpoints require proper authentication except registration and login.

## 📁 Project Structure

```
deadline-tracker/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── contexts/          # React contexts (Auth)
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── services/          # API service functions
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── server/                # Backend Node.js application
│   ├── src/
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # API route handlers
│   │   └── utils/         # Backend utilities
│   └── prisma/           # Database schema and migrations
├── public/               # Static assets
└── docs/                # Documentation files
```

## 🔮 Future Scope

### 🎯 **Planned Features**

#### 📧 **Email Notifications**
- **Deadline Reminders**: Automated emails when deadlines approach
- **Customizable Timing**: 1 day, 3 days, 1 week before due date
- **Priority-based Alerts**: Different notification levels for high/medium/low priority
- **Email Templates**: Professional HTML email templates
- **Unsubscribe Options**: User control over notification preferences

#### 📊 **Advanced Analytics**
- **Productivity Dashboard**: Track completion rates and trends
- **Time Tracking**: Monitor time spent on tasks
- **Performance Metrics**: Success rates and deadline adherence
- **Visual Reports**: Charts and graphs for data visualization

#### 🔔 **Real-time Features**
- **Live Updates**: Real-time deadline updates across devices
- **Collaborative Features**: Share deadlines with team members
- **Push Notifications**: Browser notifications for urgent deadlines
- **WebSocket Integration**: Instant updates without page refresh

#### 🎨 **Enhanced UI/UX**
- **Calendar View**: Visual calendar for deadline management
- **Drag & Drop**: Intuitive task organization
- **Keyboard Shortcuts**: Power user features
- **Mobile App**: Native mobile application
- **Offline Support**: Work without internet connection

#### 🔧 **Advanced Features**
- **Task Templates**: Pre-defined task templates for common projects
- **Recurring Deadlines**: Automatically recurring tasks
- **File Attachments**: Attach documents to deadlines
- **Comments System**: Add notes and comments to tasks
- **Export/Import**: Backup and restore deadline data

### 🛠️ **Technical Improvements**
- **Unit Testing**: Comprehensive test coverage
- **E2E Testing**: End-to-end testing with Playwright
- **Performance Optimization**: Code splitting and lazy loading
- **Accessibility**: WCAG 2.1 AA compliance
- **Internationalization**: Multi-language support
- **PWA Features**: Progressive Web App capabilities

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🙏 Acknowledgments

- **Vercel** for frontend hosting
- **Railway** for backend hosting and database
- **Prisma** for the excellent ORM
- **React** team for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Radix UI** for accessible component primitives

## 📞 Support

If you encounter any issues or have questions:

1. **Check** the [Issues](https://github.com/yourusername/deadline-tracker/issues) page
2. **Create** a new issue with detailed description

---

**⭐ If you found this project helpful, please give it a star on GitHub!**

---

*Built with ❤️ using React, Node.js, and PostgreSQL*
