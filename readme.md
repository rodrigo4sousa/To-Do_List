# To-Do List Application

Uma aplicação de gestão de tarefas full-stack com autenticação Firebase e base de dados MongoDB.

> 📝 **Projeto desenvolvido como resposta ao Desafio Full-Stack: Lista de Tarefas**
> 
> Este projeto implementa todos os requisitos base (Backend Node.js + Express, MongoDB, API REST, Frontend React/Next.js) e os três extras opcionais (React Query/TanStack, Zustand e Autenticação JWT via Firebase).

## Features

### Requisitos Base
- ✅ **Criar tarefa** (POST /tasks)
- ✅ **Listar tarefas** (GET /tasks)
- ✅ **Marcar como concluída** (PATCH /tasks/:id)
- ✅ **Remover tarefa** (DELETE /tasks/:id)
- ✅ **Modelo Task** com `title` (String, obrigatório) e `completed` (Boolean, default: false)

### Extras Implementados
- ✅ **React Query / TanStack Query** - Gestão de estado do servidor
- ✅ **Zustand** - Gestão de estado global
- ✅ **Autenticação JWT via Firebase** - Todos os endpoints protegidos com Firebase Authentication tokens (JWT)

## Tech Stack

### Backend
- **Node.js** com **Express.js**
- **MongoDB** com **Mongoose**
- **Firebase Admin SDK** para autenticação

### Frontend
- **Next.js 16** (React 19)
- **TypeScript**
- **TailwindCSS**
- **TanStack Query** para data fetching
- **Zustand** para state management
- **Firebase** para autenticação

## Prerequisites

Antes de executar a aplicação, certifique-se de que tem instalado:

- **Node.js** (v18 ou superior) - [Download](https://nodejs.org/)
- **npm** (incluído com Node.js) ou **yarn**
- **MongoDB** - Instância local ou [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Conta Firebase** - Para autenticação (opcional se usar as credenciais existentes)

---

## Configuração e Instalação

### 1. Clonar o Repositório

```bash
git clone https://github.com/rodrigo4sousa/To-Do_List.git
cd To-Do_List
```

### 2. Configurar o Backend

```bash
cd backend
npm install
```

#### Variáveis de Ambiente

Criar um ficheiro `.env` na pasta `backend/` com as seguintes variáveis:

```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/todolist
```

> **Nota:** Se estiver a usar MongoDB Atlas, substitua `MONGO_URI` pela sua connection string.

#### Credenciais Firebase (Backend)

Colocar o ficheiro de credenciais do Firebase Service Account em:
```
backend/credentials/firebase-service-account.json
```

Um ficheiro de exemplo está disponível em `backend/credentials/firebase-service-account.json.example`.
Para obter as suas credenciais Firebase:
1. Aceder à [Firebase Console](https://console.firebase.google.com/)
2. Ir para Project Settings > Service Accounts
3. Clicar em "Generate New Private Key"
4. Guardar o ficheiro como `firebase-service-account.json` na pasta `backend/credentials/`

### 3. Configurar o Frontend

```bash
cd frontend
npm install
```

> **Nota:** A configuração do Firebase no frontend já está incluída no código.

---

## Como Executar

### Iniciar o Backend

```bash
cd backend
npm start
```

O servidor irá iniciar em `http://localhost:3001`

### Iniciar o Frontend

```bash
cd frontend
npm run dev
```

A aplicação irá iniciar em `http://localhost:3000`

---

## API Endpoints

Todos os endpoints requerem **autenticação JWT** através de Firebase Authentication.

### Autenticação
Os tokens JWT são gerados pelo Firebase após login (Google Sign-In) e devem ser enviados no header:
```
Authorization: Bearer <firebase-jwt-token>
```

### Endpoints Disponíveis

| Método | Endpoint | Descrição | Body |
|--------|----------|-----------|------|
| POST | `/tasks` | Criar uma nova tarefa | `{ "title": "string" }` |
| GET | `/tasks` | Listar todas as tarefas do utilizador | - |
| PATCH | `/tasks/:id` | Marcar tarefa como concluída/não concluída | `{ "completed": boolean }` |
| DELETE | `/tasks/:id` | Eliminar uma tarefa | - |

### Modelo Task

```javascript
{
  _id: String,           // UUID gerado automaticamente
  title: String,         // Obrigatório
  completed: Boolean,    // Default: false
  userId: String,        // ID do utilizador autenticado
  createdAt: Date,       // Timestamp automático
  updatedAt: Date        // Timestamp automático
}
```

### Segurança
- ✅ Todos os endpoints protegidos com middleware de autenticação
- ✅ Cada utilizador só pode aceder às suas próprias tarefas
- ✅ Tokens JWT validados pelo Firebase Admin SDK
- ✅ Headers Authorization obrigatórios

---

## Estrutura do Projeto

```
To-Do_List/
├── backend/                    # API REST com Node.js/Express
│   ├── src/
│   │   ├── Application/        # Serviços e lógica de negócio
│   │   ├── Domain/             # Entidades e Value Objects
│   │   ├── Infrastructure/     # Base de dados, Auth, Repositórios
│   │   └── InterfaceAdapters/  # Controllers, Routes, DTOs
│   └── credentials/            # Credenciais Firebase
│
└── frontend/                   # Aplicação Next.js
    └── src/
        ├── app/                # Páginas (App Router)
        ├── components/         # Componentes partilhados
        ├── features/           # Features modulares (auth, tasks)
        └── shared/             # Utilitários partilhados
```

### Arquitetura

O projeto segue os princípios de **Clean Architecture**:

- **Domain Layer**: Entidades de negócio e Value Objects
- **Application Layer**: Use cases e serviços
- **Infrastructure Layer**: Implementações concretas (BD, Auth)
- **Interface Adapters**: Controllers, Mappers, DTOs

---

## Como Testar

1. Abrir `http://localhost:3000` no navegador
2. Fazer login com Google Sign-In
3. Adicionar tarefas através da interface
4. Marcar tarefas como concluídas
5. Eliminar tarefas

> **Nota:** A autenticação é obrigatória. Sem login, não é possível aceder às funcionalidades.

---

## Notas Importantes

### Firebase Authentication
- O projeto usa **Firebase Authentication** que gera tokens **JWT**
- O backend valida estes tokens usando o **Firebase Admin SDK**
- É uma implementação completa de autenticação JWT (requisito extra cumprido)

### Segurança
- ⚠️ O ficheiro `firebase-service-account.json` **NÃO** deve ser commitado no Git
- Este ficheiro contém credenciais sensíveis
- Deve ser adicionado ao `.gitignore`

---

## Requisitos do Desafio ✅

### Requisitos Base
- ✅ Backend Node.js + Express
- ✅ MongoDB com modelo Task (`title`, `completed`)
- ✅ API REST com todos os endpoints (POST, GET, PATCH, DELETE)
- ✅ Frontend React (Next.js)
- ✅ Consumo da API
- ✅ Código no GitHub
- ✅ README com instruções

### Extras Implementados
- ✅ React Query / TanStack Query
- ✅ Zustand
- ✅ Autenticação JWT (via Firebase)

---

## Autor

Rodrigo Sousa

## Licença

Este projeto foi desenvolvido para fins de avaliação técnica.

