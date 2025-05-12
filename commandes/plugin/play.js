import axios from "axios";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require("../../config.cjs");

const playCommand = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(" ")[0].toLowerCase()
    : "";

  const validCommands = ["play", "song", "ytmp3", "sing"];
  if (!validCommands.includes(cmd)) return;

  const query = m.body.split(" ").slice(1).join(" ");
  if (!query) {
    await gss.sendMessage(
      m.from,
      { text: `*✳️ Usage:* ${prefix}play <song name>` },
      { quoted: m }
    );
    return;
  }

  const api = `https://joeljamestech-api.vercel.app/play?query=${encodeURIComponent(query)}`;

  try {
    const { data } = await axios.get(api);
    if (data.status !== "success" || !data.download_url) {
      await gss.sendMessage(
        m.from,
        { text: "*❌ Failed to get the song. Try another keyword.*" },
        { quoted: m }
      );
      return;
    }

    const {
      title,
      author,
      views,
      duration,
      thumbnail,
      download_url,
      quality,
      filename,
    } = data;

    const caption = `*🎧 Title:* ${title}\n*🎙 Artist:* ${author}\n*👁️ Views:* ${views.toLocaleString()}\n*⏱ Duration:* ${duration}\n*🎵 Quality:* ${quality}`;

    // Send external ad preview message
    await gss.sendMessage(
      m.from,
      {
        text: caption,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          externalAdReply: {
            title: "HUNTER-MD-BOT - Audio Found!",
            body: "Tap to download or wait to receive file.",
            thumbnailUrl: thumbnail,
            sourceUrl: download_url,
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );

    // Send audio file
    await gss.sendMessage(
      m.from,
      {
        audio: { url: download_url },
        mimetype: "audio/mp4",
        fileName: filename || "song.mp3",
      },
      { quoted: m }
    );
  } catch (e) {
    console.error("Play Command Error:", e.message || e);
    await gss.sendMessage(
      m.from,
      { text: "*❌ Error fetching or sending audio.*" },
      { quoted: m }
    );
  }
};

export default playCommand;