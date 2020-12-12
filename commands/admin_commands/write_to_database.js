/* eslint-disable no-restricted-syntax */
const fs = require('fs');;

module.exports = {
  name: 'write_to_database',
  description: 'Write to Database',
  usage: 'PREFIX + WRITE_TO_DATABASE',
  args: true,
  dmAllow: true,
  channels: [],
  execute: (con) => {
    const giveAllPath = 'Storage/players/';
    const userFiles = fs.readdirSync(giveAllPath).filter((file) => file.endsWith('.json'));
    console.log(userFiles.length);
    for (const file of userFiles) {
      try {
        const userData = JSON.stringify(fs.readFileSync(`${giveAllPath + file}`, 'utf8'));
        con.query(`INSERT INTO USERDATA (DISCORDID, DATA) VALUES (${file.split('.')[0]}, ${userData})`);
      } catch {
        console.log(file);
      }
    }
  },
};
