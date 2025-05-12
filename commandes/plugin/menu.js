import axios from 'axios';
import os from 'os';
import fs from 'fs';
import config from '../../config.cjs';

const startTime = Date.now();

const handleCommands = async (m, sock) => {
  
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

    const botStatus = `
╭────❍ *HUNTER-MD-BOT MENU*
│ *Prefix:* ${prefix}
│ *Owner:*  
│ *Uptime:* ${uptime}
│ *Users:* 
╰──────────────────────╯

┌───〔 ⚙️ GENERAL 〕
│ ${prefix}ping
│ ${prefix}alive
│ ${prefix}owner
│ ${prefix}sudo
│ ${prefix}infobot
│ ${prefix}menu
└─────────────

┌───〔 🤖 AI & CHAT 〕
│ ${prefix}ai
│ ${prefix}gpt
│ ${prefix}bot
│ ${prefix}chatbot
│ ${prefix}lydea
│ ${prefix}lydia
│ ${prefix}automreply
│ ${prefix}chat
│ ${prefix}remini
└─────────────

┌───〔 🧰 TOOLS 〕
│ ${prefix}calculator
│ ${prefix}tempfile
│ ${prefix}checkmail
│ ${prefix}trt
│ ${prefix}tts
│ ${prefix}ss
│ ${prefix}qr
│ ${prefix}readqr
│ ${prefix}shortenerurl
│ ${prefix}profile
│ ${prefix}sapk
│ ${prefix}url
│ ${prefix}url2
│ ${prefix}tourl
│ ${prefix}support
│ ${prefix}inc
│ ${prefix}i
│ ${prefix}app
│ ${prefix}appsearch
│ ${prefix}playstore
└─────────────

┌───〔 🔁 CONVERTERS 〕
│ ${prefix}attp
│ ${prefix}binary
│ ${prefix}ebinary
│ ${prefix}emomix
└─────────────

┌───〔 💰 ECONOMY 〕
│ ${prefix}economy
│ ${prefix}balance
│ ${prefix}daily
│ ${prefix}leaderboard
│ ${prefix}earn <amount>
│ ${prefix}spend <amount>
│ ${prefix}deposit <amount>
│ ${prefix}withdraw <amount>
│ ${prefix}transfer <user> <amount>
└─────────────

┌───〔 🎮 GAMES & FUN 〕
│ ${prefix}ttt
│ ${prefix}resetttt
│ ${prefix}wcg
│ ${prefix}resetwcg
│ ${prefix}connect4
│ ${prefix}resetc4
│ ${prefix}score
│ ${prefix}joke
│ ${prefix}advice
│ ${prefix}meme
│ ${prefix}rank
│ ${prefix}quote
└─────────────

┌───〔 ⬇️ DOWNLOADS 〕
│ ${prefix}apk
│ ${prefix}facebook
│ ${prefix}insta
│ ${prefix}tiktok
│ ${prefix}mediafire
│ ${prefix}pinterestdl
│ ${prefix}gdrive
│ ${prefix}play
│ ${prefix}song
│ ${prefix}video
│ ${prefix}smedia
│ ${prefix}movie
│ ${prefix}image
│ ${prefix}yts
│ ${prefix}lyrics
└─────────────

┌───〔 👥 GROUP MANAGEMENT 〕
│ ${prefix}occ
│ ${prefix}linkgroup
│ ${prefix}setppg
│ ${prefix}setname
│ ${prefix}setdesc
│ ${prefix}group
│ ${prefix}groupinfo
│ ${prefix}welcome
│ ${prefix}kick
│ ${prefix}kickall
│ ${prefix}add
│ ${prefix}promote
│ ${prefix}demote
│ ${prefix}pick
│ ${prefix}tagall
│ ${prefix}tagadmin
│ ${prefix}tagnotadmin
│ ${prefix}hidetag
│ ${prefix}antilink
│ ${prefix}antibot
│ ${prefix}antileft
│ ${prefix}gcsetting
│ ${prefix}vcf
│ ${prefix}poll
│ ${prefix}getbio
└─────────────

┌───〔 🕵️ STALKER TOOLS 〕
│ ${prefix}truecaller
│ ${prefix}instastalk
│ ${prefix}tiktokstalk
│ ${prefix}githubstalk
│ ${prefix}npmstalk
└─────────────

┌───〔 🔞 HENTAI 〕
│ ${prefix}hwaifu
│ ${prefix}trap
│ ${prefix}blowjob
│ ${prefix}neko
│ ${prefix}hneko
└─────────────

┌───〔 ✨ REACTIONS 〕
│ ${prefix}highfive
│ ${prefix}glomp
│ ${prefix}handhold
│ ${prefix}shinobu
│ ${prefix}cuddle
│ ${prefix}cringe
│ ${prefix}sad
│ ${prefix}happy
│ ${prefix}dance
│ ${prefix}smug
│ ${prefix}blush
│ ${prefix}awo
│ ${prefix}wave
│ ${prefix}smile
└─────────────

┌───〔 ⚡ AUDIO EDIT 〕
│ ${prefix}say
│ ${prefix}tts
│ ${prefix}bass
│ ${prefix}blowin
│ ${prefix}deep
│ ${prefix}earrape
│ ${prefix}fast
│ ${prefix}fat
│ ${prefix}nighttime
│ ${prefix}reverse
│ ${prefix}robot
│ ${prefix}slow
│ ${prefix}smooth
│ ${prefix}typai
└─────────────

┌───〔 👑 OWNER PANEL 〕
│ ${prefix}vv
│ ${prefix}vv1
│ ${prefix}vv2
│ ${prefix}vv3
│ ${prefix}update
│ ${prefix}pair
│ ${prefix}forward
│ ${prefix}getall
│ ${prefix}jid
│ ${prefix}join
│ ${prefix}leave
│ ${prefix}block
│ ${prefix}unblock
│ ${prefix}allcmds
│ ${prefix}anticall
│ ${prefix}setstatus
│ ${prefix}autobio
│ ${prefix}autotyping
│ ${prefix}alwaysonline
│ ${prefix}autoread
│ ${prefix}autosview
└─────────────`;

    sock.sendMessage(
      m.from,
      {
        text: botStatus,
        contextInfo: {
          isForwarded: false,
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





