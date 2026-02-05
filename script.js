// server.js
import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

// ⚠️ እነዚህን በEnvironment Variables ያስቀምጡ
// export TELEGRAM_BOT_TOKEN="NEW_TOKEN_HERE"
// export TELEGRAM_CHAT_ID="8542308552"
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID  = process.env.TELEGRAM_CHAT_ID;

function buildMessage({ issue, city, phone, gps }) {
  return (
`📨 የእባኮች መልእክት
━━━━━━━━━━━━━━
🧾 ችግኝ: ${issue}
🏙️ ከተማ: ${city}
📞 ስልክ: ${phone}
📍 GPS: ${gps || 'N/A'}
━━━━━━━━━━━━━━
⏰ ${new Date().toLocaleString()}`
  );
}

app.post('/send-telegram', async (req, res) => {
  try {
    const { issue, city, phone, gps } = req.body;
    if (!issue || !city || !phone) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const text = buildMessage({ issue, city, phone, gps });

    const body = new URLSearchParams({
      chat_id: CHAT_ID,
      text
    });

    const r = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      { method: 'POST', body }
    );
    const j = await r.json();

    if (!j.ok) return res.status(500).json({ error: j.description });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(3000, () => console.log('Server running on :3000'));
