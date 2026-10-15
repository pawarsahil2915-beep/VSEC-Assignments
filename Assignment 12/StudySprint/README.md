# StudySprint — Smart Study Planner

A beginner-friendly full-stack study planner built with React, Vite, Node.js, Express, and MongoDB.

You can add study tasks, choose a subject and due date, set priority, search/filter tasks, mark them complete, and delete them.

## 1. Install the required software

Install:
- **Node.js LTS** (includes npm)
- **MongoDB Community Server** for saving tasks locally

After installing Node.js, open a new VS Code terminal and check:

```bash
node -v
npm -v
```

## 2. Start MongoDB

If you installed MongoDB Community Server as a Windows service, make sure the MongoDB service is running. You can also use MongoDB Atlas; see section 5.

## 3. Start the backend (Terminal 1)

1. Open the extracted `VSEC` folder in VS Code.
2. Open **Terminal → New Terminal**.
3. Run these commands one by one:

```bash
cd backend
npm install
```

4. Create your local environment file by copying `backend/.env.example` to `backend/.env`.
   On Windows PowerShell, you can run:

```powershell
Copy-Item .env.example .env
```

5. Start the API:

```bash
npm run dev
```

Expected messages:

```text
Connected to MongoDB
StudySprint API running at http://localhost:5000
```

Keep this terminal open. If MongoDB is not running, the backend will not connect.

## 4. Start the frontend (Terminal 2)

Open a **second** terminal in VS Code and run:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

Keep both terminals open while using the full application.

### Quick frontend preview

You can run only the frontend using the commands above even if the backend is not ready. The website will show sample preview tasks, but adding, completing, or deleting tasks will not be saved until the backend and MongoDB are connected.

## 5. Use MongoDB Atlas instead of local MongoDB

Edit `backend/.env` and set `MONGO_URI` to your Atlas connection string:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

Do not share your `.env` file or publish it to GitHub.

## 6. Test the backend

When the backend is running, open:

- `http://localhost:5000/api/health` — should return a message saying the API is running.
- `http://localhost:5000/api/tasks` — should return a JSON array of tasks (usually `[]` at first).

## Common issues

- **`npm` is not recognized:** Install Node.js LTS, close and reopen VS Code, then retry.
- **`vite` not found / dependency errors:** Run `npm install` inside `frontend`. Do not copy `node_modules` from another computer or operating system.
- **MongoDB connection failed:** Start MongoDB Community Server or check the `MONGO_URI` value in `backend/.env`.
- **Website shows Preview mode:** The frontend is running, but it cannot reach the backend. Start the backend and confirm MongoDB is connected.
- **Port 5000 or 5173 is busy:** Close the other app using that port or change the relevant port configuration.

## Project structure

```text
VSEC/
├── backend/
│   ├── models/Task.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── index.html
│   ├── package.json
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       └── style.css
└── README.md
```
