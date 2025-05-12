import axios from "axios";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require("../../config.cjs");

const ytsCommand = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(" ")[0].toLowerCase()
    : "";
  const validCommands = ["yts", "ytsearch"];

  if (!validCommands.includes(cmd)) return;

  const query = m.body.split(" ").slice(1).join(" ");
  if (!query) {
    await gss.sendMessage(
      m.from,
      { text: `*✳️ Usage:* ${prefix}yts <search terms>` },
      { quoted: m }
    );
    return;
  }

  const api = `https://joeljamestech-api.vercel.app/yts?query=${encodeURIComponent(query)}`;

  try {
    const { data } = await axios.get(api);
    if (!data.results || data.results.length === 0) {
      await gss.sendMessage(
        m.from,
        { text: "*❌ No YouTube results found.*" },
        { quoted: m }
      );
      return;
    }

    const results = data.results;
    const thumb = results[0].thumbnail;

    let text = `*🔎 YouTube Search Results:*\n*➥ Query:* ${query}\n\n`;

    results.slice(0, 10).forEach((v, i) => {
      text += `*${i + 1}. ${v.title}*\n`;
      text += `⏱ Duration: ${v.duration}\n`;
      text += `👁️ Views: ${v.views.toLocaleString()}\n`;
      text += `📅 Published: ${v.published}\n`;
      text += `🎙 Author: ${v.author}\n`;
      text += `🔗 URL: ${v.url}\n`;
      text += `━━━━━━━━━━━━━━\n`;
    });

    const msg = {
      text,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 1000,
        externalAdReply: {
          title: "HUNTER-MD-BOT",
          body: "HUNTER-MD-BOT",
          thumbnailUrl: thumb,
          sourceUrl: results[0].url,
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    };

    await gss.sendMessage(m.from, msg, { quoted: m });

  } catch (e) {
    console.error("YTS Command Error:", e.message || e);
    await gss.sendMessage(
      m.from,
      { text: "*❌ An error occurred while fetching YouTube results.*" },
      { quoted: m }
    );
  }
};

export default ytsCommand;