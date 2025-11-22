// server.js
import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

// Your bot token (keep secret)
const BOT_TOKEN = "YOUR_BOT_TOKEN_HERE";

// Staff list
const staffMembers = [
  { role: "Founder", name: "Meow", id: "1275059869799415819" },
  { role: "Co Owner", name: "Lisa", id: "1000315559868645427" },
  { role: "Co Owner", name: "SleePy", id: "889306635456106506" },
  { role: "General Manager", name: "Seahl", id: "925634940408856686" },
  { role: "Administrator", name: "Jake", id: "1308500243448336478" },
  { role: "Administrator", name: "Piorun", id: "1356076318319575190" },
  { role: "Administrator", name: "Zal", id: "747060313597411380" },
  { role: "Administrator", name: "Azy", id: "907189767731568660" },
  { role: "Community Manager", name: "Dogo", id: "1335596631374041181" },
  { role: "Moderator", name: "Abyss", id: "1046159416082305115" },
  { role: "Moderator", name: "Fish", id: "1082216499445518397" },
  { role: "Moderator", name: "Qin", id: "957506592784388096" },
  { role: "Moderator", name: "Elan", id: "950386138651189258" },
  { role: "Moderator", name: "Shivam", id: "748050700092571659" },
];

// Endpoint to fetch staff with avatars
app.get("/api/staff", async (req, res) => {
  const results = await Promise.all(staffMembers.map(async s => {
    try {
      const r = await fetch(`https://discord.com/api/v10/users/${s.id}`, {
        headers: { "Authorization": `Bot ${BOT_TOKEN}` }
      });
      const data = await r.json();
      const avatarUrl = data.avatar
        ? `https://cdn.discordapp.com/avatars/${s.id}/${data.avatar}.png?size=128`
        : `https://cdn.discordapp.com/embed/avatars/${parseInt(s.id, 10) % 5}.png`;
      return { ...s, avatar: avatarUrl, username: data.username };
    } catch {
      return { ...s, avatar: `https://cdn.discordapp.com/embed/avatars/${parseInt(s.id, 10) % 5}.png` };
    }
  }));

  res.json(results);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
