import axios from 'axios';
import config from '../../config.cjs';

const githubUser = async (m, gss) => {
  try {
    const prefix = config.PREFIX;
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();
    const args = text.split(' ');

    const validCommands = ['githubuser', 'ghuser'];

    if (validCommands.includes(cmd)) {
      if (!args[0]) return m.reply('⚠️ Please provide a GitHub username.');

      const username = args[0];

      try {
        const githubResponse = await axios.get(`https://joeljamestech-api.vercel.app/githubuser?username=${username}`);
        const userData = githubResponse.data;

        if (!userData.status) {
          return m.reply('❌ User not found.');
        }

        let responseMessage = `
🧑‍💻 **GitHub User Info**

**Username:** @${userData.username}
**Name:** ${userData.name || '⟨N/A⟩'}
**Bio:** ${userData.bio || '⟨No bio⟩'}
**Location:** ${userData.location || '⟨Unknown⟩'}
**Profile:** [View Profile](${userData.profile})

**Followers:** ${userData.followers}  |  **Following:** ${userData.following}
**Public Repos:** ${userData.public_repos}

**Avatar:** ${userData.avatar}

---

🌟 **Top Repositories:**
`;

        if (userData.repositories.length > 0) {
          const reposList = userData.repositories.slice(0, 5).map(repo => {
            return `🔗 [${repo.name}](${repo.url}) 
📝 *Description:* ${repo.description || '⟨No description⟩'}
⭐ *Stars:* ${repo.stars} | 🍴 *Forks:* ${repo.forks || '0'}`;
          });

          responseMessage += reposList.join('\n\n');
        } else {
          responseMessage += `No public repositories found.`;
        }

        responseMessage += `

───────────────
Powered by *HUNTER-MD-BOT*`;

        await gss.sendMessage(m.from, {
          image: { url: userData.avatar },
          caption: responseMessage
        }, { quoted: m });

      } catch (err) {
        console.error('GitHub fetch error:', err);
        await m.reply('❌ Something went wrong while fetching GitHub data.');
      }
    }
  } catch (err) {
    console.error('Command error:', err);
    m.reply('⚠️ Something went wrong while processing your request.');
  }
};

export default githubUser;