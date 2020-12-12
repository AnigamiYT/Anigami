module.exports = {
  name: 'give_all_primogems',
  description: 'Give Primogems to All',
  usage: 'PREFIX + GIVEALL',
  args: true,
  dmAllow: true,
  channels: [],
  execute: (message, msgArr, con) => {
    if (/^\d+$/.test(msgArr[1]) && msgArr[1] !== undefined && message.member.id === '197673134885699585') {
      con.query('SELECT * FROM USERDATA', (err, result) => {
        if (err) throw err;
        let userData;
        let userID;
        result.forEach((item) => {
          userData = JSON.parse(item.DATA.toString());
          userID = item.DISCORDID;
          console.log(userID);
          userData.primogems += parseInt(msgArr[1], 10);
          userData = JSON.stringify(userData).replace(/'/g, "\\'");
          // con.query(`UPDATE USERDATA SET DATA='${userData}' WHERE DISCORDID=${userID};`, () => {
          //     console.log(userID);
          // });
        });
        message.channel.send(`Successfully given ${msgArr[1]} to all users.`);
      });
    }
  },
};
