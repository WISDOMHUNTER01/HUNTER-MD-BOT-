import axios from 'axios';
import config from '../../config.cjs';

const stickerCommandHandler = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';

  const stickerCommands = [
    'cry', 'kiss', 'kill', 'kick', 'hug', 'pat', 'lick', 'bite', 'yeet',
    'bully', 'bonk', 'wink', 'poke', 'nom', 'slap', 'smile', 'wave',
    'awoo', 'blush', 'smug', 'dance', 'happy', 'sad', 'cringe', 'cuddle',
    'shinobu', 'handhold', 'glomp', 'highfive'
  ];

  if (!stickerCommands.includes(cmd)) return;

  try {
    const { data } = await axios.get(`https://joeljamestech-api.vercel.app/${cmd}`);

    if (data && data.url) {
      await gss.sendImageAsSticker(
        m.from,
        data.url,
        m,
        {
          packname: 'ʜᴜɴᴛᴇʀ-ᴍᴅ',
          author: 'bot'
        }
      );
    } else {
      await m.reply('❌ Failed to fetch sticker.');
    }
  } catch (err) {
    console.error(`Sticker API error for ${cmd}:`, err.message || err);
    await m.reply('⚠️ Error fetching sticker. Please try again later.');
  }
};

export default stickerCommandHandler;