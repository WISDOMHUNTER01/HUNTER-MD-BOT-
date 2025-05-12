import config from '../../config.cjs';

const thumbnail = 'https://raw.githubusercontent.com/WISDOMHUNTER01/HUNTER-MD-BOT-/refs/heads/main/media/menu.jpg';

const ping = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "ping") {
    const start = Date.now();
    await m.React('⏳');
    const end = Date.now();
    const responseTime = (end - start).toFixed(2);

    const responseText = `*pong *${responseTime} ms*`;

    await m.React('✅');

    await sock.sendMessage(
      m.from,
      {
        text: responseText,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          externalAdReply: {
            title: "ʜᴜɴᴛᴇʀ-ᴍᴅ-ʙᴏᴛ ⚡",
            body: "System Latency Monitor",
            thumbnailUrl: thumbnail,
            sourceUrl: "https://github.com/WISDOMHUNTER01/HUNTER-MD-BOT-",
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        },
      },
      { quoted: m }
    );
  }
};

export const command = ['ping'];
export default ping;
