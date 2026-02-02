# To-Do List Application

Aplicação full-stack de gestão de tarefas com autenticação JWT e MongoDB.

---

## Requisitos do Desafio ✅

| Requisitos Base | Extras Implementados |
|-----------------|---------------------|
| ✅ Backend Node.js + Express | ✅ React Query / TanStack |
| ✅ MongoDB (Task: `title`, `completed`) | ✅ Zustand |
| ✅ API REST (POST, GET, PATCH, DELETE) | ✅ Autenticação JWT |
| ✅ Frontend React (Next.js) | |

---

## Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

**Frontend:** Next.js 16, React 19, TypeScript, TailwindCSS, TanStack Query, Zustand

---

## Como Executar

### 1. Configurar Backend

```bash
cd backend
npm install
```

Criar ficheiro `.env` em `backend/`:

```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/todolist
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

> Para MongoDB Atlas, substitua `MONGO_URI` pela connection string do Atlas.

### 2. Configurar Frontend

```bash
cd frontend
npm install
```

### 3. Executar

```bash
# Terminal 1 - Backend
cd backend
npm start
# Servidor em http://localhost:3001

# Terminal 2 - Frontend
cd frontend
npm run dev
# Aplicação em http://localhost:3000
```

### 4. Utilizar

1. Aceder a `http://localhost:3000`
2. Registar conta ou fazer login
3. Criar, completar e eliminar tarefas

---

## API Endpoints

Todos os endpoints requerem header: `Authorization: Bearer <token>`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/auth/register` | Registar utilizador |
| POST | `/auth/login` | Login |
| POST | `/tasks` | Criar tarefa |
| GET | `/tasks` | Listar tarefas |
| PATCH | `/tasks/:id` | Atualizar tarefa |
| DELETE | `/tasks/:id` | Eliminar tarefa |

---




