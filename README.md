# 🚀 FinBot – AI‑Powered Personal Finance Assistant

A modern, interactive, and intelligent **personal finance management web application** designed to help users track income, expenses, budgets, categories, financial insights, and receive smart guidance from an **AI Finance Chatbot (FinBot AI)** powered by **Google Gemini**.

---

## 🌟 Features

### **💰 Personal Finance Tracking**

* Add, update, delete income entries
* Add, update, delete expense entries
* Custom categories (user-defined)
* Local persistence using `localStorage`
* Automatic balance calculation

### **📊 Interactive Dashboard**

* Expense/Income charts using Chart.js
* Category-wise visualization
* Month-wise summaries
* Clean card-based UI with smooth interactions

### **🤖 FinBot – AI Finance Assistant**

* Integrated finance chatbot using Google Gemini
* Helps with:

  * Budgeting
  * Saving strategies
  * Understanding EMIs
  * Credit score basics
  * Personal finance tips
  * Investment fundamentals
* Chat panel with message bubbles & smooth UI

### **⚙️ Settings Page**

* Light/Dark mode toggle
* Change currency (₹, $, €, etc.)
* Manage custom categories

### **🧩 Professional Frontend Architecture**

* React + TypeScript + Vite
* Tailwind CSS
* shadcn-ui components
* Reusable UI modules
* Mobile responsive layout

### **🛡 Secure Backend**

* Node.js + Express server
* Gemini API key stored in `.env` (NOT exposed)
* Clean `/chat` endpoint for AI responses
* CORS-enabled API communication

---

## 🧱 Tech Stack

### **Frontend**

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn-ui
* Chart.js

### **Backend**

* Node.js
* Express
* Google Gemini API
* dotenv
* CORS

---

## 📁 Project Structure

```
finbot-assistant/
│
├── client/                  # React + Vite frontend
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── ...
│
├── server/                  # Express backend
│   ├── index.js
│   ├── package.json
│   ├── .env                 # (ignored in git)
│   └── ...
│
└── README.md
```

---

# ⚙️ Backend Setup

### 1️⃣ Navigate to backend directory

```sh
cd server
```

### 2️⃣ Install dependencies

```sh
npm install
```

### 3️⃣ Create `.env` file

```
GEMINI_API_KEY=your_real_key_here
PORT=3000
```

### 4️⃣ Start backend

```sh
npm start
```

Backend runs at:

```
http://localhost:3000
```

---

# 💻 Frontend Setup

### 1️⃣ Move into client folder

```sh
cd client
```

### 2️⃣ Install dependencies

```sh
npm install
```

### 3️⃣ Start development server

```sh
npm run dev
```

Frontend runs at:

```
http://localhost:8080
```

To use a custom backend URL:
Create `.env` inside **client/**:

```
VITE_API_URL=http://localhost:3000
```

---

## 🔌 API Route

### **POST /chat**

Request:

```json
{
  "message": "How do I plan my expenses?"
}
```

Response:

```json
{
  "reply": "Start by tracking your monthly essentials..."
}
```

---

# 🚀 Deployment Guide

## **Frontend Deployment (Netlify or Vercel):**

1. Build project:

```sh
npm run build
```

2. Upload `dist/` folder to Netlify/Vercel

## **Backend Deployment (Railway or Render):**

1. Push backend folder to GitHub
2. Create new service on Railway/Render
3. Add environment variable:

```
GEMINI_API_KEY=your_key_here
```

4. Deploy

Update frontend `.env`:

```
VITE_API_URL=https://your-backend-url
```

Rebuild + redeploy frontend.

---

# 🖼 Screenshots / Demo (Optional)

*Add screenshots here once UI is finalized.*

```
📌 EXAMPLE
- Dashboard Overview
- Add Expense Page
- Category Manager
- AI Chatbot Panel
```

---

# 🔒 Security Notes

* Your `.env` must **never** be pushed to GitHub
* Use `.gitignore`:

```
server/.env
node_modules/
```

* Gemini key must stay server-side only

---

# 🧪 Tests (optional)

Add Jest or Vitest tests for frontend logic.

---

# 🤝 Contributing

Pull requests are welcome.

---

# 📜 License

MIT License.

---

# ⭐ Acknowledgments

* Google Gemini API
* React, Vite, Tailwind, shadcn-ui
* Open-source community

---

**If you found this project helpful, star the repo ⭐**
