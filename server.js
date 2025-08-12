import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(express.static(__dirname)); // serve index.html

app.post("/send", async (req, res) => {
  const { username, message } = req.body;

  if (!username || !message) {
    return res.json({ status: "Data tidak lengkap" });
  }

  try {
    const response = await fetch(`https://ngl.link/api/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0"
      },
      body: new URLSearchParams({
        username: username,
        question: message,
        deviceId: "xxxxxx", // random id
        gameSlug: "",
        referrer: ""
      })
    });

    if (response.ok) {
      res.json({ status: "✅ Terkirim" });
    } else {
      res.json({ status: "❌ Gagal kirim" });
    }
  } catch (err) {
    res.json({ status: "❌ Error koneksi" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));