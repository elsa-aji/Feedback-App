# MERN Stack Feedback Admin Panel

A production-ready Feedback Application Admin Panel built using MongoDB Atlas, Express.js, React.js, and Node.js. Developed under strict time constraints for the final exit evaluation examination.

## 📂 Project Structure
- `backend/`: Node.js & Express server engine with MongoDB Atlas integration.
- `frontend/`: React.js administration dashboard styled with responsive Tailwind CSS.

## 🚀 Quick Start Guide

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```
Set `MONGODB_URI` in `backend/.env` before starting the backend. A template is available in `backend/.env.example`.

### 2. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
The frontend uses `http://localhost:5000/api/feedback` by default. Set `VITE_API_URL` in `frontend/.env` to override it; see `frontend/.env.example`.

## Deploy both services to Render

The root `render.yaml` defines a Node web service for the API and a static site for the Vite frontend.

1. Push the project to a Git provider connected to Render, then create a new **Blueprint** in Render and select this repository.
2. When prompted, set the `MONGODB_URI` secret to a production MongoDB connection string. Do not commit this value.
3. Deploy the Blueprint. It builds the frontend with the API URL and configures the API to allow the deployed frontend origin.
4. The API health check is available at `/health`; it reports healthy only after MongoDB connects.

The Render service names and URLs in `render.yaml` are `feedback-api` and `feedback-frontend`. If you change either name or use a custom domain, update `VITE_API_URL` and `FRONTEND_ORIGIN` to match, then redeploy.

## ✨ Core Features Evaluated
- **Full CRUD Endpoints:** Add, Read, Update, and Delete feedback models.
- **Auto-Metrics Mapping:** Automatic generation of Course IDs and Course Durations.
- **Responsive Layout:** Adaptive desktop and mobile layouts via modern UI flex grids.
- **Client Routing:** Page management using React Router DOM.
