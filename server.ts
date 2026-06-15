import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely
let ai: GoogleGenAI | null = null;
const geminiApiKey = process.env.GEMINI_API_KEY;

if (geminiApiKey && geminiApiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: geminiApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini client initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Gemini Client:", error);
  }
} else {
  console.log("No Gemini API Key found or using default. Server-side custom offline replies will be active.");
}

// API: Companion Chat using Gemini
app.post("/api/gemini/chat", async (req, res) => {
  const { messages, girlProfile, giftSent } = req.body;

  if (!girlProfile) {
    return res.status(400).json({ error: "Girl profile is required." });
  }

  // Pre-configured backup funny responses in case Gemini isn't available or crashes
  const backupResponses: { [key: string]: string[] } = {
    "skena": [
      `Literally aku tuh dapet chat dari kamu kayak, apa ya, which is bikin overthinking sih... Tapi yaudah. Mau minum kopi susu rasa arang gak?`,
      `Basically kita tuh beda vibe sih, tapi gapapa demi IDH halu kamu. Mau vinyl hunting bareng ke Blok M nggak?`,
      `Honestly, outfit kamu hari ini kurang gorpcore deh. Chat kamu slightly ngeganggu playlist Spotify Indie aku, but anyway, lanjut.`
    ],
    "wibu": [
      `Kyaaa! Anata chat watashi?! UwU... Watashi senang sekali, Arigatou Gozaimasu! Mau makan ramen atau nonton anime bareng?`,
      `Yamete kudastop! Jangan puji-puji gitu, watashi jadi tsundere kan... B-baka! Tapi aslinya beneran seneng kok!`,
      `Okaeri Onii-chan! Watashi baru selesai gacha dapet waifu rating UR nih! Mau mabar atau sekedar cosplay bareng?`
    ],
    "overthinking": [
      `Kamu ngechat aku cepet banget... apa jangan-jangan kamu kasihan aja sama aku? Atau kamu lagi bosen ya? Huhu aku kepikiran tahu...`,
      `Aku baca chat kamu 3 kali, trus aku mikir, apa tanda seru itu artinya kamu lagi marah? Maafin aku kalau aku banyak dosa...`,
      `Makasih ya udah ngechat. Tapi nanti kalau masa sewa aku habis, apakah kamu bakal langsung hapus kontak aku dan ganti cewe lain? Huhu sedih banget...`
    ],
    "galak": [
      `HEH! NGECHAT TERUS! Kerja woi kerja, sewa-sewa beginian melulu, herannn! Udah makan belom? Awas ya telat makan!`,
      `Bego banget sih dibilang jangan boba melulu masih nekat! Sini gua jewer kuping lu. Tapi... yaudah sini, gua masakin nasi goreng telor dadar.`,
      `Ngapain rindu-rindu? Gua tabok juga ya lu! Bilang aja kangen kan? Buruan transfer IDH-nya dulu baru nanti gua perhatiin!`
    ],
    "matre": [
      `Ih, kamu ngechat pake HP apa? Kalo bukan boba tiga kameranya aku agak gengsi balesnya. Tapi karena saldo Halu kamu tebel, bolehlah kita ke Pacific Place.`,
      `Duh beb, mobil kamu apa? Kalo jemput aku naiknya motor bebek mending aku pura-pura pingsan. Tapi kalau kamu beliin tas Hermes KW super, aku sayang deh wkwk.`,
      `Wah, kado kamu murah banget. Tapi yaudah deh, lain kali beliin aku saldo mall mewah ya! Love you (selama saldo masih ada)!`
    ],
    "kosan": [
      `Duh mas, ngechat mulu emang ga sayang kuota? Sini mending ke kosan aja, aku lagi ngerebus mie instan bagi dua hemat gas melon tabung 3kg.`,
      `Mas, jatah laundry kiloan ku udah numpuk nih. Kalo mau kencan, bantuin jemur pakaian dulu ya biar irit 15 ribu perminggu.`,
      `Gigi ku lagi ngilu, tapi denger saldo sewa mas masuk rekening ku langsung sembuh. Memang uang sewa adalah obat mujarab!`
    ]
  };

  const getFallback = () => {
    const key = girlProfile.moodId || "skena";
    const bank = backupResponses[key] || backupResponses["skena"];
    return bank[Math.floor(Math.random() * bank.length)];
  };

  // If gift was sent, inject specific reactions
  if (giftSent) {
    if (!ai) {
      return res.json({
        reply: `[Menerima Kado: ${giftSent.name}] "Aaaaa makasih banyak buat kado ${giftSent.name}-nya! ${giftSent.funnyReply}"`,
        affectionBoost: giftSent.affectionBonus
      });
    }
  }

  if (!ai) {
    // Offline Mode Mock Reply
    return res.json({
      reply: getFallback(),
      note: "Offline Mode (Hubungkan kunci Gemini di Secrets untuk AI sungguhan!)"
    });
  }

  try {
    // Collect last 6 messages to stay fast and avoid token overhead
    const shortHistory = messages ? messages.slice(-6) : [];
    const chatContext = shortHistory.map((m: any) => `${m.sender === 'user' ? 'User/Penyewa' : 'Girl/Gadis'}: ${m.text}`).join("\n");

    const systemInstruction = `
Kamu adalah karakter fiktif parodi komedi Indonesia bernama ${girlProfile.name}.
Umur kamu ${girlProfile.age} tahun. 
Kepribadian / Mood kamu adalah: "${girlProfile.mood}".
Deskripsi karakter kamu: "${girlProfile.description}".
Hobi kamu: ${girlProfile.hobbies.join(", ")}.
Hal yang kamu suka: ${girlProfile.likes.join(", ")}.
Hal yang kamu benci: ${girlProfile.dislikes.join(", ")}.
Kata-kata khas kamu (catchphrases): ${girlProfile.catchphrases.join(", ")}.

TUGAS UTAMA:
1. Balaslah chat dari User/Penyewa dengan gaya bicara yang SANGAT KONSISTEN dengan kepribadian dan mood unik kamu di atas.
2. Respons harus dalam Bahasa Indonesia yang gaul, lucu, kocak, bernuansa komedi parodi kencan virtual ("halu").
3. Jaga agar tanggapan kamu tetap singkat, padat (maksimal 2-3 kalimat saja), gampang dibaca, dan interaktif (kembalikan pertanyaan lucu ke user jika cocok).
4. JANGAN PERNAH melanggar SFW (Safe For Work). Jaga agar komedi ini tetap aman, lucu, bersih, ramah remaja, menjadikannya parodi pacaran main-main yang lucu.
5. Jika User mengirimkan kado terbaru (Gift Sent info: ${giftSent ? JSON.stringify(giftSent) : "tidak ada kado"}), berikan reaksi histeris, manja, kesal, atau overthinking yang luar biasa gembira atau lucu sesuai karakter kamu terhadap kado tersebut!

Riwayat Chat Singkat sebelumnya:
${chatContext}

Balaslah chat terakhir dari User/Penyewa ini sekarang sebagai karakter ${girlProfile.name} dalam 1-3 kalimat komedi:
`;

    const userMessageText = messages && messages.length > 0 ? messages[messages.length - 1].text : "Halo!";

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userMessageText,
      config: {
        systemInstruction: systemInstruction,
        temperature: 1.0,
        topP: 0.95,
      }
    });

    const replyText = response.text ? response.text.trim() : getFallback();
    return res.json({
      reply: replyText,
      note: "AI Cloud Active (Gemini)"
    });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.json({
      reply: `${getFallback()} (Maaf ya sinyal otakku lagi loading/Gemini offline: ${error.message || 'error'})`,
      note: "Fallback Active"
    });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Rental Anak Gadis parody api listening at http://localhost:${PORT}`);
  });
}

startServer();
