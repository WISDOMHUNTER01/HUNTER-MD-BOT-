// HUNTER-MD-BOT config.js
const fs = require("fs");
require("dotenv").config();

const config = {

  //==============================//
  //        BOT IDENTITY         //
  //==============================//
  BOT_NAME: process.env.BOT_NAME || "HUNTER-MD-BOT",
  BOT: process.env.BOT || "Hello from HUNTER-MD-BOT 👋",
  OWNER_NAME: process.env.OWNER_NAME || "ʟᴏʀᴅ ᴊᴏᴇʟ",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "255654464348",
  SUDO_NUMBER: process.env.SUDO_NUMBER || "255654464348",
  SESSION_ID: process.env.SESSION_ID || "HUNTER~MD~SESSION",
  PREFIX: process.env.PREFIX || '.',
  MODE: process.env.MODE || "public",
  CAPTION: process.env.CAPTION || "ᴘᴏᴡᴇʀᴇᴅ ʙʏ HUNTER-MD-BOT",
  NEW_CMD: process.env.NEW_CMD || "ᴀᴅᴅᴠᴀʀ\n│ sᴜᴅᴏ\n| hunter",

  //==============================//
  //     STATUS & PRESENCE       //
  //==============================//
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN === 'true',
  AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT === 'true',
  AUTO_BIO: process.env.AUTO_BIO === 'false',
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE === 'true',
  STATUS_READ_MSG: process.env.STATUS_READ_MSG || 'Status Viewed by HUNTER-MD',
  AUTOLIKE_EMOJI: process.env.AUTOLIKE_EMOJI || '💚',

  //==============================//
  //       AUTO ACTIONS          //
  //==============================//
  AUTO_READ: process.env.AUTO_READ === 'false',
  AUTO_TYPING: process.env.AUTO_TYPING === 'false',
  AUTO_RECORDING: process.env.AUTO_RECORDING === 'false',
  AUTO_REACT: process.env.AUTO_REACT === 'false',
  AUTO_STICKER: process.env.AUTO_STICKER === 'true',
  AUTO_REPLY_STATUS: process.env.AUTO_REPLY_STATUS === 'false',

  //==============================//
  //     SECURITY & GUARDS       //
  //==============================//
  ANTILINK: process.env.ANTILINK === 'false',
  ANTI_DELETE: process.env.ANTI_DELETE === 'true',
  ANTI_LEFT: process.env.ANTI_LEFT !== undefined ? process.env.ANTI_LEFT === 'true' : false,
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : false,
  REJECT_CALL: process.env.REJECT_CALL === 'true',
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : false,

  //==============================//
  //        CHATBOT SETTINGS     //
  //==============================//
  CHAT_BOT: process.env.CHAT_BOT === 'false',
  CHAT_BOT_MODE: process.env.CHAT_BOT_MODE || "public",
  LYDEA: process.env.LYDEA === 'false',

  //==============================//
  //      INTEGRATIONS / API     //
  //==============================//
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",

  //==============================//
  //         LOGGING             //
  //==============================//
  DELETED_MESSAGES_CHAT_ID: process.env.DELETED_MESSAGES_CHAT_ID || "255781144539@s.whatsapp.net",
};

module.exports = config;