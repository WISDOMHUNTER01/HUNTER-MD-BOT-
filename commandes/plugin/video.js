import axios from "axios";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require("../../config.cjs");

const videoCommand = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(" ")[0].toLowerCase()
    : "";

  const validCommands = ["video", "mp4", "vid"];
  if (!validCommands.includes(cmd)) return;

  const query = m.body.split(" ").slice(1).join(" ");
  if (!query) {
    await gss.sendMessage(
      m.from,
      { text: `*✳️ Usage:* ${prefix}video <video name>` },
      { quoted: m }
    );
    return;
  }

  const api = `https://joeljamestech-api.vercel.app/video?query=${encodeURIComponent(query)}`;

  try {
    const { data } = await axios.get(api);
    if (data.status !== "success" || !data.download_url) {
      await gss.sendMessage(
        m.from,
        { text: "*❌ Failed to get the video. Try another keyword.*" },
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

    const caption = `*🎞 Title:* ${title}\n*🎙 Author:* ${author}\n*👁️ Views:* ${views.toLocaleString()}\n*⏱ Duration:* ${duration}\n*📺 Quality:* ${quality}`;

    // Send external ad preview message
    await gss.sendMessage(
      m.from,
      {
        text: caption,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          externalAdReply: {
            title: "HUNTER-MD-BOT - Video Ready!",
            body: "Tap to preview or wait to receive file.",
            thumbnailUrl: thumbnail,
            sourceUrl: download_url,
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );

    // Send video file
    await gss.sendMessage(
      m.from,
      {
        video: { url: download_url },
        caption: title,
        mimetype: "video/mp4",
        fileName: filename || "video.mp4",
      },
      { quoted: m }
    );
  } catch (e) {
    console.error("Video Command Error:", e.message || e);
    await gss.sendMessage(
      m.from,
      { text: "*❌ Error fetching or sending video.*" },
      { quoted: m }
    );
  }
};

export default videoCommand;