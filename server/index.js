import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file in the server directory
dotenv.config({ path: join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Gemini API key is not configured' });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are FinBot, a simple friendly finance helper. Explain investments, budgeting, credit score, EMI, loans, and money topics in very simple terms. User question: ${message}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: data.error?.message || 'Failed to get response from Gemini API' 
      });
    }

    const aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that.";

    res.json({ reply: aiReply });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Gemini API Key configured: ${process.env.GEMINI_API_KEY ? 'Yes' : 'No'}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Error: Port ${PORT} is already in use!`);
    console.error(`Please stop the process using port ${PORT} or change the PORT in .env file.\n`);
    console.error('To find and kill the process on Windows:');
    console.error(`  netstat -ano | findstr :${PORT}`);
    console.error(`  taskkill /PID <process_id> /F\n`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});

