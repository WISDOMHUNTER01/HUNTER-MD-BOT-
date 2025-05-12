import axios from 'axios';
import os from 'os';
import fs from 'fs';
import config from '../../config.cjs';

const startTime = Date.now();

const handleCommands = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  // UPTIME Function
  const getUptime = () => {
    const ms = Date.now() - startTime;
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // ALIVE / UPTIME CMD
  if (["alive", "uptime"].includes(cmd)) {
    const uptime = getUptime();

    const botStatus = `*HUNTER-MD-BOT is Alive!*\n\n` +
      `*Prefix:* ${prefix}\n` +
      `*Status:* Online\n` +
      `*Uptime:* ${uptime}\n` +
      `*Mode:* Public\n` +
      ``;

    sock.sendMessage(
      m.from,
      {
        text: botStatus,
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363317462952356@newsletter',
            newsletterName: "HUNTER-MD-BOT",
            serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
            title: "HUNTER-MD-BOT v1.0",
            body: "Bot status & uptime information.",
            thumbnailUrl: 'https://raw.githubusercontent.com/WISDOMHUNTER01/HUNTER-MD-BOT-/refs/heads/main/media/menu.jpg',
            sourceUrl: 'https://github.com/WISDOMHUNTER01/HUNTER-MD-BOT',
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        },
      },
      { quoted: m }
    );
  }
};

export default handleCommands;