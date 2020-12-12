module.exports = {
  name: 'give_primogems',
  description: 'Give Primogems',
  usage: 'PREFIX + GIVE',
  args: true,
  dmAllow: true,
  channels: [],
  execute(message, msgArr, con) {
    try {
      if (msgArr[1] !== undefined && msgArr[2] !== undefined && message.member.id === '197673134885699585') {
        const targetUser = msgArr[1].slice(3, 30).split('>')[0];
        let userData;
        con.query(`SELECT DATA FROM USERDATA WHERE DISCORDID=${targetUser}`, (err, result) => {
          if (err) throw err;

          userData = JSON.parse(result[0].DATA.toString());
          if (userData) {
            if (/^\d+$/.test(msgArr[2])) {
              userData.primogems += parseInt(msgArr[2], 10);
              userData = JSON.stringify(userData).replace(/'/g, "\\'");
              con.query(`UPDATE USERDATA SET DATA='${userData}' WHERE DISCORDID=${targetUser};`);
              message.channel.send(`You have given ${msgArr[2]} Primogems to ${msgArr[1]}`);
            } else {
              message.channel.send('Please enter a proper amount of primogem');
            }
          } else {
            message.channel.send('The user specified doesn\'t exist');
          }
        });
      } else {
        message.channel.send('Invalid input');
      }
      return;
    } catch (err) { console.log(err, message.member.id); }
  },
};
