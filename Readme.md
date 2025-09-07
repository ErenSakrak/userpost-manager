# React + NestJS CRUD Project

This project is a simple web application for managing Users and Posts. It demonstrates a **React + TypeScript frontend** with **NestJS backend**, including CRUD operations and user-post relationships.

---

## Table of Contents

- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Usage](#usage)
- [Notes](#notes)

---

## Technologies

### Frontend
- React
- TypeScript
- Vite
- TailwindCSS
- ESLint

### Backend
- Node.js
- NestJS
- TypeScript
- Express (built into NestJS)

---

## Project Structure

/project-root
│
├─ /frontend
│ ├─ src/
│ │ ├─ components/ # UserList, PostList, HomePage
│ │ ├─ services/ # API calls (fetchUsers, fetchPosts, etc.)
│ │ ├─ App.tsx
│ │ └─ main.tsx
│ ├─ package.json
│ └─ vite.config.ts
│
├─ /backend
│ ├─ src/
│ │ ├─ modules/
│ │ │ ├─ users/
│ │ │ │ ├─ users.controller.ts
│ │ │ │ ├─ users.service.ts
│ │ │ │ └─ users.module.ts
│ │ │ └─ posts/
│ │ │ ├─ posts.controller.ts
│ │ │ ├─ posts.service.ts
│ │ │ └─ posts.module.ts
│ │ ├─ app.controller.ts
│ │ ├─ app.service.ts
│ │ ├─ app.module.ts
│ │ └─ main.ts
│ ├─ package.json
│ └─ tsconfig.json
│
└─ README.md

yaml
Kodu kopyala

---

## Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend
Install dependencies:

bash
Kodu kopyala
npm install
Start the development server:

bash
Kodu kopyala
npm run dev
Open your browser and go to http://localhost:5173.

Backend Setup
Navigate to the backend folder:

bash
Kodu kopyala
cd backend
Install dependencies:

bash
Kodu kopyala
npm install
Start the backend server:

bash
Kodu kopyala
npm run start:dev
The backend will run on http://localhost:3000.

Usage
Open the homepage.

Click Users to manage users (CRUD).

Click Posts to manage posts (CRUD) and see the relation with users.

All changes on the frontend update the backend in real-time.

Notes
This project uses in-memory data on the backend (no database is required).

ESLint is configured for both frontend and backend; ensure no linting errors appear.

The frontend and backend run on separate ports:

Frontend: 5173

Backend: 3000

Deployed versions can be hosted using Netlify, Vercel, or any Node.js server.

yaml
Kodu kopyala

---

Bu README hem PHASE 1 hem PHASE 2’yi kapsıyor.  

İstersen ben bunu bir **GitHub için hazır markdown hâline getirip deploy önerileri ile birlikte** biraz daha geliştirebilirim. Bunu yapayım mı?






Şunu dedin:
bu README.md yi direk yazar mısın tek bir blokta


ChatGPT:
Tabii! İşte README.md dosyasının tek bir blok hâli, doğrudan kopyalayıp kullanabilirsin:

markdown
Kodu kopyala
# React + NestJS CRUD Project

This project is a simple web application for managing Users and Posts. It demonstrates a **React + TypeScript frontend** with **NestJS backend**, including CRUD operations and user-post relationships.

---

## Table of Contents

- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Usage](#usage)
- [Notes](#notes)

---

## Technologies

### Frontend
- React
- TypeScript
- Vite
- TailwindCSS
- ESLint

### Backend
- Node.js
- NestJS
- TypeScript
- Express (built into NestJS)

---

## Project Structure

/project-root
│
├─ /frontend
│ ├─ src/
│ │ ├─ components/ # UserList, PostList, HomePage
│ │ ├─ services/ # API calls (fetchUsers, fetchPosts, etc.)
│ │ ├─ App.tsx
│ │ └─ main.tsx
│ ├─ package.json
│ └─ vite.config.ts
│
├─ /backend
│ ├─ src/
│ │ ├─ modules/
│ │ │ ├─ users/
│ │ │ │ ├─ users.controller.ts
│ │ │ │ ├─ users.service.ts
│ │ │ │ └─ users.module.ts
│ │ │ └─ posts/
│ │ │ ├─ posts.controller.ts
│ │ │ ├─ posts.service.ts
│ │ │ └─ posts.module.ts
│ │ ├─ app.controller.ts
│ │ ├─ app.service.ts
│ │ ├─ app.module.ts
│ │ └─ main.ts
│ ├─ package.json
│ └─ tsconfig.json
│
└─ README.md

yaml
Kodu kopyala

---

## Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend
Install dependencies:

bash
Kodu kopyala
npm install
Start the development server:

bash
Kodu kopyala
npm run dev
Open your browser and go to http://localhost:5173.

Backend Setup
Navigate to the backend folder:

bash
Kodu kopyala
cd backend
Install dependencies:

bash
Kodu kopyala
npm install
Start the backend server:

bash
Kodu kopyala
npm run start:dev
The backend will run on http://localhost:3000.

Usage
Open the homepage.

Click Users to manage users (CRUD).

Click Posts to manage posts (CRUD) and see the relation with users.

All changes on the frontend update the backend in real-time.

Notes
This project uses in-memory data on the backend (no database is required).

ESLint is configured for both frontend and backend; ensure no linting errors appear.

The frontend and backend run on separate ports:

Frontend: 5173

Backend: 3000