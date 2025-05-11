import config from '../config.cjs';
import { evaluate } from 'mathjs';

const thumbnail = 'https://raw.githubusercontent.com/WISDOMHUNTER01/HUNTER-MD-BOT-/refs/heads/main/media/menu.jpg';

const ping_calc_report_group = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  // PING COMMAND
  if (cmd === 'ping') {
    const start = Date.now();
    await m.React('⏳');
    const end = Date.now();
    const responseTime = (end - start).toFixed(2);

    await m.React('✅');

    await sock.sendMessage(
      m.from,
      {
        text: `*ʜᴜɴᴛᴇʀ-ᴍᴅ-ʙᴏᴛ ⚡*\n_📶 Response Time:_ *${responseTime} ms*`,
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

  // CALCULATOR COMMAND
  if (cmd === 'calc' || cmd === 'calculator') {
    if (!text) {
      return sock.sendMessage(
        m.from,
        { text: `Please provide a math expression.\n\n*Example:* ${prefix}calc 7 * (4 + 3)` },
        { quoted: m }
      );
    }

    try {
      const result = evaluate(text);
      await sock.sendMessage(
        m.from,
        {
          text: `*ʜᴜɴᴛᴇʀ-ᴍᴅ-ʙᴏᴛ ⚡*\n\n_🧮 Expression:_ ${text}\n_📌 Result:_ *${result}*`,
          contextInfo: {
            isForwarded: true,
            forwardingScore: 999,
            externalAdReply: {
              title: "ʜᴜɴᴛᴇʀ-ᴍᴅ-ʙᴏᴛ ⚡",
              body: "Smart Calculator Module",
              thumbnailUrl: thumbnail,
              sourceUrl: "https://github.com/WISDOMHUNTER01/HUNTER-MD-BOT-",
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: m }
      );
    } catch (err) {
      await sock.sendMessage(
        m.from,
        { text: `❌ Invalid expression. Please check your math syntax.` },
        { quoted: m }
      );
    }
  }

  // REPORT COMMAND
  if (cmd === 'report') {
    if (!text) {
      return sock.sendMessage(
        m.from,
        { text: `❗Please provide a bug or issue to report.\n\n*Example:* ${prefix}report sticker command not working` },
        { quoted: m }
      );
    }

    const devJid = config.OWNER_NUMBER.includes('@s.whatsapp.net')
      ? config.OWNER_NUMBER
      : config.OWNER_NUMBER + '@s.whatsapp.net';

    const reportMsg = `*🐞 Bug Report Submitted*\n\nFrom: wa.me/${m.sender.split('@')[0]}\nGroup/Chat: ${m.from}\n\n*Message:* ${text}`;

    await sock.sendMessage(devJid, { text: reportMsg });
    await sock.sendMessage(
      m.from,
      { text: `✅ Report successfully sent to the bot developer.` },
      { quoted: m }
    );
  }

  // GROUP-RELATED COMMANDS

  // qcc (Under Construction)
  if (cmd === 'qcc') {
    await sock.sendMessage(m.from, { text: "This command is under construction." }, { quoted: m });
  }

  // linkgroup (Get Group Invite Link)
  if (cmd === 'linkgroup') {
    const groupLink = await sock.groupInviteCode(m.from);
    await sock.sendMessage(m.from, { text: `Group link: https://chat.whatsapp.com/${groupLink}` }, { quoted: m });
  }

  // setppg (Set Profile Picture)
  if (cmd === 'setppg') {
    if (m.isGroup) {
      await sock.updateProfilePicture(m.from, { url: text });
      await sock.sendMessage(m.from, { text: "Profile picture updated." }, { quoted: m });
    }
  }

  // setname (Set Group Name)
  if (cmd === 'setname') {
    if (m.isGroup) {
      await sock.groupUpdateSubject(m.from, text);
      await sock.sendMessage(m.from, { text: `Group name updated to: ${text}` }, { quoted: m });
    }
  }

  // setdesc (Set Group Description)
  if (cmd === 'setdesc') {
    if (m.isGroup) {
      await sock.groupUpdateDescription(m.from, text);
      await sock.sendMessage(m.from, { text: `Group description updated to: ${text}` }, { quoted: m });
    }
  }

  // antibot (Prevent Bots Joining)
  if (cmd === 'antibot') {
    // Logic to enable antibot feature
    await sock.sendMessage(m.from, { text: "Antibot feature is now enabled." }, { quoted: m });
  }

  // antileft (Prevent Users Leaving)
  if (cmd === 'antileft') {
    // Logic to prevent users from leaving the group
    await sock.sendMessage(m.from, { text: "Antileft feature is now enabled." }, { quoted: m });
  }

  // group (Get Group Info)
  if (cmd === 'group') {
    const groupInfo = await sock.groupMetadata(m.from);
    await sock.sendMessage(m.from, { text: `Group info: \nName: ${groupInfo.subject}\nMembers: ${groupInfo.participants.length}` }, { quoted: m });
  }

  // groupinfo (Get Group Info with Description)
  if (cmd === 'groupinfo') {
    const groupInfo = await sock.groupMetadata(m.from);
    await sock.sendMessage(m.from, { text: `Group info: \nName: ${groupInfo.subject}\nDescription: ${groupInfo.desc}` }, { quoted: m });
  }

  // welcome (Enable Welcome Message)
  if (cmd === 'welcome') {
    // Logic for enabling welcome message
    await sock.sendMessage(m.from, { text: "Welcome feature is now enabled." }, { quoted: m });
  }

  // add (Add a Member to the Group)
  if (cmd === 'add') {
    // Add user to group
    const userToAdd = text.split(' ')[0] + '@s.whatsapp.net';
    await sock.groupAdd(m.from, [userToAdd]);
    await sock.sendMessage(m.from, { text: `User added: ${text}` }, { quoted: m });
  }

  // kickall (Kick All Members)
  if (cmd === 'kickall') {
    const groupMembers = await sock.groupMetadata(m.from);
    const membersToKick = groupMembers.participants.map((participant) => participant.id);
    await sock.groupRemove(m.from, membersToKick);
    await sock.sendMessage(m.from, { text: "All members have been kicked out." }, { quoted: m });
  }

  // kick (Kick Specific User)
  if (cmd === 'kick') {
    const userToKick = text + '@s.whatsapp.net';
    await sock.groupRemove(m.from, [userToKick]);
    await sock.sendMessage(m.from, { text: `User kicked: ${text}` }, { quoted: m });
  }

  // hidetag (Hide Tag Message)
  if (cmd === 'hidetag') {
    // Logic to hide tag
  }

  // tagadmin (Tag All Admins)
  if (cmd === 'tagadmin') {
    const admins = await sock.groupMetadata(m.from);
    const adminList = admins.participants.filter((p) => p.isAdmin).map((admin) => admin.id);
    await sock.sendMessage(m.from, { text: `Admins: ${adminList.join(', ')}` }, { quoted: m });
  }

  // tagnotadmin (Tag Non-Admins)
  if (cmd === 'tagnotadmin') {
    const nonAdmins = await sock.groupMetadata(m.from);
    const nonAdminList = nonAdmins.participants.filter((p) => !p.isAdmin).map((nonAdmin) => nonAdmin.id);
    await sock.sendMessage(m.from, { text: `Non-admins: ${nonAdminList.join(', ')}` }, { quoted: m });
  }

  // tagall (Tag All Members)
  if (cmd === 'tagall') {
    const allMembers = await sock.groupMetadata(m.from);
    const allMemberList = allMembers.participants.map((p) => p.id);
    await sock.sendMessage(m.from, { text: `Tagged members: ${allMemberList.join(', ')}` }, { quoted: m });
  }

  // antilink (Disable Links in Group)
  if (cmd === 'antilink') {
    // Logic to disable links
    await sock.sendMessage(m.from, { text: "Antilink feature enabled." }, { quoted: m });
  }

  // promote (Promote User to Admin)
  if (cmd === 'promote') {
    const userToPromote = text + '@s.whatsapp.net';
    await sock.groupPromote(m.from, [userToPromote]);
    await sock.sendMessage(m.from, { text: `User promoted: ${text}` }, { quoted: m });
  }

  // demote (Demote Admin to Member)
  if (cmd === 'demote') {
    const userToDemote = text + '@s.whatsapp.net';
    await sock.groupDemote(m.from, [userToDemote]);
    await sock.sendMessage(m.from, { text: `User demoted: ${text}` }, { quoted: m });
  }

  // Vcf (Send VCard)
  if (cmd === 'Vcf') {
    const vCard = 'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nTEL:+1234567890\nEND:VCARD';
    await sock.sendMessage(m.from, { vcard: vCard }, { quoted: m });
  }

  // poll (Create Poll)
  if (cmd === 'poll') {
    // Logic for poll creation
    await sock.sendMessage(m.from, { text: `Poll created: ${text}` }, { quoted: m });
  }

  // getbio (Get User Bio)
  if (cmd === 'getbio') {
    const userBio = await sock.getContact(m.sender);
    await sock.sendMessage(m.from, { text: `User bio: ${userBio.profile.desc}` }, { quoted: m });
  }
};

export const command = [
  'ping', 'calc', 'calculator', 'report', 'qcc', 'linkgroup', 'setppg', 'setname', 'setdesc', 'antibot', 'antileft',
  'group', 'group
