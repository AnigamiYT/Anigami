/* eslint-disable max-len */
const { generalBanner, assignItem } = require('../../../functions.js');
const { generalBanner4Star, generalBanner5Star } = require('../../../constants.js');

module.exports = {
  name: 'single_pull',
  description: 'Make a single pull',
  usage: 'PREFIX + SINGLEPULL',
  args: true,
  dmAllow: true,
  channels: [],
  execute: (message, userData) => {
    const sender = message.author;
    let tempUserData = userData;

    try {
      if (tempUserData.primogems >= 160) {
        const [reward, rarity] = generalBanner(tempUserData.pityCounter4star, tempUserData.pityCounter5star);
        let msg = `<@${sender.id}> \n\n\``;
        for (let i = 0; i < rarity; i += 1) { msg += '⭐'; }
        msg += ` ${reward}\``;
        message.channel.send(msg);

        tempUserData = assignItem(tempUserData, reward);
        if (generalBanner4Star.includes(reward)) { tempUserData.pityCounter4star = 0; }
        if (generalBanner5Star.includes(reward)) { tempUserData.pityCounter5star = 0; }
        tempUserData.pityCounter4star += 1;
        tempUserData.pityCounter5star += 1;
        tempUserData.primogems -= 160;
      } else {
        message.channel.send(`<@${sender.id}> not enough Primogems`);
      }
      return tempUserData;
    } catch (err) { console.log(err); }
    return userData;
  },
};
