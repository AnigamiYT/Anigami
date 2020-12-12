/* eslint-disable max-len */
const { generalBanner, assignItem } = require('../../../functions.js');
const constants = require('../../../constants.js');

module.exports = {
  name: 'whale_pull',
  description: 'Make a whale pull',
  usage: 'PREFIX + WHALE',
  args: true,
  dmAllow: true,
  channels: [],
  execute: (message, userData) => {
    const sender = message.author;
    let tempUserData = userData;

    try {
      if (tempUserData) {
        if (tempUserData.primogems >= 14400) {
          let ctr;
          let msg = '';
          const reward = {};
          for (ctr = 0; ctr < 90; ctr += 1) {
            const [tempReward, rarity] = generalBanner(tempUserData.pityCounter4star, tempUserData.pityCounter5star);
            if (!reward[tempReward]) {
              reward[tempReward] = {
                quantity: 1,
                rarity,
              };
            } else {
              reward[tempReward].quantity += 1;
            }
            tempUserData = assignItem(tempUserData, tempReward);
            if (constants.generalBanner4Star.includes(tempReward)) { tempUserData.pityCounter4star = 0; }
            if (constants.generalBanner5Star.includes(tempReward)) { tempUserData.pityCounter5star = 0; }
            tempUserData.pityCounter4star += 1;
            tempUserData.pityCounter5star += 1;
          }
          tempUserData.primogems -= 14400;
          const sortedReward = [];
          Object.keys(reward).forEach((item) => {
            sortedReward.push({
              name: item,
              quantity: reward[item].quantity,
              rarity: reward[item].rarity,
            });
          });
          sortedReward.sort((a, b) => {
            if (a.rarity > b.rarity) { return -1; }
            if (a.rarity < b.rarity) { return 1; }
            return 0;
          });
          sortedReward.forEach((item) => {
            msg += '`';
            for (let i = 0; i < item.rarity; i += 1) { msg += '⭐'; }
            msg += ` ${item.name} ${item.quantity}x\`\n`;
          });
          message.channel.send(`<@${sender.id}>\n\n${msg}`);
        } else {
          message.channel.send(`<@${sender.id}> not enough Primogems`);
        }
      } else {
        message.channel.send(`<@${sender.id}> not enough Primogems`);
      }
      return tempUserData;
    } catch (err) { console.log(err); }
    return userData;
  },
};
