# To-Do List Application

A modern, full-stack task management application built with React, Next.js, Node.js, and Firebase authentication.

## Features

- ✅ User authentication (Email/Password & Google Sign-in)
- ✅ Task CRUD operations (Create, Read, Update, Delete)
- ✅ Task completion tracking
- ✅ Responsive design with modern UI
- ✅ Real-time updates
- ✅ Pagination support
- ✅ Filter tasks (All, Pending, Completed)
- ✅ Task detail dialogs
- ✅ Character limit validation (500 chars)

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **TanStack Query** - Data fetching and caching
- **Zustand** - State management
- **Firebase Auth** - Authentication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Firebase Admin SDK** - Server-side authentication
- **Domain-Driven Design** - Architecture pattern

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Firebase Project** - [Create one](https://console.firebase.google.com/)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd To-Do_List
```

### 2. Firebase Setup

#### Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" (or use existing)
3. Enable **Authentication** and **Firestore Database**

#### Configure Authentication
1. In Firebase Console → Authentication → Sign-in method
2. Enable:
   - Email/Password
   - Google

#### Generate Service Account Key (for Backend)
1. In Firebase Console → Project Settings → Service accounts
2. Click "Generate new private key"
3. Save the JSON file as `backend/credentials/firebase-service-account.json`

### 3. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Environment Configuration
Create a `.env` file in the `backend` directory:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/todo-list

# Server Port (optional, defaults to 3001)
PORT=3001
```

#### Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On Windows (if installed as service)
net start MongoDB

# Or run manually
mongod
```

#### Start the Backend Server
```bash
npm start
```

The backend will start on `http://localhost:3001`

### 4. Frontend Setup

#### Install Dependencies
```bash
cd ../frontend
npm install
```

#### Start the Development Server
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

## Project Structure

```
To-Do_List/
├── backend/                    # Node.js/Express backend
│   ├── src/
│   │   ├── Application/        # Business logic layer
│   │   │   ├── mappers/        # Data mappers
│   │   │   └── services/       # Application services
│   │   ├── Domain/             # Domain entities & business rules
│   │   │   ├── Task/           # Task domain
│   │   │   └── User/           # User domain
│   │   ├── Infrastructure/     # Infrastructure layer
│   │   │   ├── Auth/           # Firebase authentication
│   │   │   ├── Database/       # MongoDB models & mappers
│   │   │   └── Repositories/   # Data access layer
│   │   └── InterfaceAdapters/  # Interface adapters
│   │       └── NodeAPI/        # REST API controllers & routes
│   ├── credentials/            # Firebase service account (not in git)
│   └── package.json
├── frontend/                   # Next.js frontend
│   ├── src/
│   │   ├── app/                # Next.js app router
│   │   │   ├── login/          # Authentication pages
│   │   │   └── tasks/          # Main tasks page
│   │   ├── features/           # Feature-based organization
│   │   │   ├── auth/           # Authentication logic
│   │   │   └── tasks/          # Task management logic
│   │   └── shared/             # Shared utilities
│   │       ├── api/            # API client
│   │       └── firebase/       # Firebase client config
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication Required
All endpoints require a Bearer token in the Authorization header.

### Tasks
- `GET /tasks` - Get all tasks for authenticated user
- `POST /tasks` - Create a new task
- `PATCH /tasks/:id` - Mark task as completed
- `DELETE /tasks/:id` - Delete a task

## Development

### Running in Development Mode

1. **Backend**: `cd backend && npm start`
2. **Frontend**: `cd frontend && npm run dev`
3. **MongoDB**: Ensure MongoDB is running

### Building for Production

#### Frontend
```bash
cd frontend
npm run build
npm start
```

#### Backend
```bash
cd backend
npm start
```

## Troubleshooting

### Common Issues

1. **"Firebase service account not found"**
   - Ensure `backend/credentials/firebase-service-account.json` exists
   - Download the service account key from Firebase Console

2. **"MongoDB connection failed"**
   - Ensure MongoDB is running
   - Check `MONGODB_URI` in backend `.env` file

3. **"Authentication failed"**
   - Verify Firebase configuration in both frontend and backend
   - Check that Authentication is enabled in Firebase Console

4. **"Port already in use"**
   - Backend uses port 3001, frontend uses 3000
   - Change ports in configuration if needed

### Environment Variables

#### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/todo-list
PORT=3001
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.