const handleCommands = async (m, sock) => {
  import config from '../../config.cjs';
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';

  if (cmd === 'menu') {
    const caption = `
╭────❍ *HUNTER-MD-BOT MENU*
│ *Prefix:* ${prefix}
│ *Owner:* ${config.OWNER_NAME}
│ *Uptime:* ${runtime(process.uptime())}
│ *Users:* ${global.db.data ? Object.keys(global.db.data.users).length : 'N/A'}
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
└─────────────
    `.trim();

    sock.sendMessage(
      m.from,
      {
        text: caption,
        contextInfo: {
          isForwarded: false,
          forwardingScore: 1000,
          externalAdReply: {
            title: "HUNTER-MD-BOT Full Command Menu",
            body: "",
            thumbnailUrl: "https://raw.githubusercontent.com/WISDOMHUNTER01/HUNTER-MD-BOT-/refs/heads/main/media/menu.jpg",
            mediaType: 1,
            sourceUrl: "https://github.com/WISDOMHUNTER01/HUNTER-MD-BOT",
            renderLargerThumbnail: true
          }
        }
      },
      { quoted: m }
    );
  }
};

function runtime(seconds) {
  const pad = (s) => (s < 10 ? '0' + s : s);
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${pad(hrs)}h ${pad(mins)}m ${pad(secs)}s`;
}

export default handleCommands;
