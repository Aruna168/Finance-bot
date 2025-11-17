# FinBot Backend Server

This is the backend server for the FinBot chatbot application. It handles API requests to the Gemini API securely.

## Setup

1. Install dependencies:
```bash
npm install
```

2. The `.env` file has been created with your API key. If you need to update it, edit the `.env` file in the `server` directory:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

3. Start the server:
```bash
npm start
```

Or use the PowerShell script:
```powershell
.\start-server.ps1
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:3000` by default.

**Important:** Make sure the server is running before using the frontend chatbot. You should see:
```
Server is running on http://localhost:3000
Gemini API Key configured: Yes
```

## API Endpoints

### POST `/api/chat`
Sends a message to the chatbot and returns the AI response.

**Request Body:**
```json
{
  "message": "What is a credit score?"
}
```

**Response:**
```json
{
  "reply": "A credit score is a number that represents..."
}
```

### GET `/api/health`
Health check endpoint to verify the server is running.

**Response:**
```json
{
  "status": "ok"
}
```

## Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key (required)
- `PORT`: Server port (optional, defaults to 3000)

