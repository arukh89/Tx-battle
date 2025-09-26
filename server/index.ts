import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Simpan player sementara di memory (nanti bisa DB)
const players: Record<string, string> = {};

/**
 * GET player data from Neynar API by FID
 * Example: GET /api/player/5650
 */
app.get("/api/player/:fid", async (req, res) => {
  try {
    const fid = req.params.fid;

    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
      {
        headers: {
          accept: "application/json",
          api_key: process.env.NEYNAR_API_KEY || "",
        },
      }
    );

    const data = await response.json();

    if (!data?.users || data.users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const username = data.users[0].username;

    // Simpan ke memory
    players[fid] = username;

    res.json({ fid, username });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch player data" });
  }
});

/**
 * GET all saved players
 * Example: GET /api/players
 */
app.get("/api/players", (req, res) => {
  res.json(players);
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
