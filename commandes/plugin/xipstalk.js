

/*                                   
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
─██████──────────██████████████──████████████████────████████████────────────────────────────██████──██████████████──██████████████──██████─────────
─██░░██──────────██░░░░░░░░░░██──██░░░░░░░░░░░░██────██░░░░░░░░████──────────────────────────██░░██──██░░░░░░░░░░██──██░░░░░░░░░░██──██░░██─────────
─██░░██──────────██░░██████░░██──██░░████████░░██────██░░████░░░░██──────────────────────────██░░██──██░░██████░░██──██░░██████████──██░░██─────────
─██░░██──────────██░░██──██░░██──██░░██────██░░██────██░░██──██░░██──────────────────────────██░░██──██░░██──██░░██──██░░██──────────██░░██─────────
─██░░██──────────██░░██──██░░██──██░░████████░░██────██░░██──██░░██──██████████████──────────██░░██──██░░██──██░░██──██░░██████████──██░░██─────────
─██░░██──────────██░░██──██░░██──██░░░░░░░░░░░░██────██░░██──██░░██──██░░░░░░░░░░██──────────██░░██──██░░██──██░░██──██░░░░░░░░░░██──██░░██─────────
─██░░██──────────██░░██──██░░██──██░░██████░░████────██░░██──██░░██──██████████████──██████──██░░██──██░░██──██░░██──██░░██████████──██░░██─────────
─██░░██──────────██░░██──██░░██──██░░██──██░░██──────██░░██──██░░██──────────────────██░░██──██░░██──██░░██──██░░██──██░░██──────────██░░██─────────
─██░░██████████──██░░██████░░██──██░░██──██░░██████──██░░████░░░░██──────────────────██░░██████░░██──██░░██████░░██──██░░██████████──██░░██████████─
─██░░░░░░░░░░██──██░░░░░░░░░░██──██░░██──██░░░░░░██──██░░░░░░░░████──────────────────██░░░░░░░░░░██──██░░░░░░░░░░██──██░░░░░░░░░░██──██░░░░░░░░░░██─
─██████████████──██████████████──██████──██████████──████████████────────────────────██████████████──██████████████──██████████████──██████████████─
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
made by lord joel
contact owner +2557114595078

CURRENTLY RUNNING ON BETA VERSION!!
*
   * @project_name : JOEL XMD
   * @author : LORD_JOEL
   * @youtube : https://www.youtube.com/@joeljamestech255
   * @infoription : joel Md ,A Multi-functional whatsapp user bot.
   * @version 10 
*
   * Licensed under the  GPL-3.0 License;
* 
   * ┌┤Created By joel tech info.
   * © 2025 joel md ✭ ⛥.
   * plugin date : 11/1/2025
* 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
*/






import axios from 'axios';
import config from '../../config.cjs';

const ipStalk = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();
  const args = text.split(' ');

  const validCommands = ['ipstalk', 'lookup', 'iplocate'];

  if (validCommands.includes(cmd)) {
    if (!args[0]) return m.reply('Mention an IP address to stalk.');

    const ip = args[0];

    const apiResponse = await axios.get(`https://bk9.fun/stalk/ip?q=${ip}`);
    const data = apiResponse.data;

    if (data.status) {
      const ipData = data.BK9;

      let responseMessage = `🌍 *ᴊᴏᴇʟ xᴅ ᴠ⁷ ɪᴘ sᴛᴀʟᴋᴇʀ*\n\n`;
      responseMessage += `  ◦  *IP*: ${ipData.ip}\n`;
      responseMessage += `  ◦  *Continent*: ${ipData.continent}\n`;
      responseMessage += `  ◦  *Country*: ${ipData.country} (${ipData.countryCode})\n`;
      responseMessage += `  ◦  *Region*: ${ipData.regionName}\n`;
      responseMessage += `  ◦  *City*: ${ipData.city}\n`;
      responseMessage += `  ◦  *Zip Code*: ${ipData.zip}\n`;
      responseMessage += `  ◦  *Latitude*: ${ipData.lat}\n`;
      responseMessage += `  ◦  *Longitude*: ${ipData.lon}\n`;
      responseMessage += `  ◦  *Timezone*: ${ipData.timezone}\n`;
      responseMessage += `  ◦  *Currency*: ${ipData.currency}\n`;
      responseMessage += `  ◦  *ISP*: ${ipData.isp}\n`;
      responseMessage += `  ◦  *Organization*: ${ipData.org}\n`;
      responseMessage += `  ◦  *AS*: ${ipData.as}\n`;
      responseMessage += `  ◦  *Reverse DNS*: ${ipData.reverse}\n`;
      responseMessage += `  ◦  *Mobile*: ${ipData.mobile ? 'Yes' : 'No'}\n`;
      responseMessage += `  ◦  *Proxy*: ${ipData.proxy ? 'Yes' : 'No'}\n`;
      responseMessage += `  ◦  *Hosting*: ${ipData.hosting ? 'Yes' : 'No'}\n\n`;
      responseMessage += `🔖 *ʝσєℓ χ∂ ν⁷*\n🎯 *ву ℓσє∂ ʝσєℓ*\n`;

      await gss.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } else {
      m.reply(' IP address not found. Please check the input.');
    }
  }
};

export default ipStalk;
