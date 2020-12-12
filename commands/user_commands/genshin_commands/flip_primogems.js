module.exports = {
  name: 'flip_primogems',
  description: 'Gamble your Primogems',
  usage: 'PREFIX + FLIP + AMOUNT',
  args: true,
  dmAllow: true,
  channels: [],
  execute: (message, userData, msgArr) => {
    const sender = message.author;
    const tempUserData = userData;
    try {
      if (!/^\d+$/.test(msgArr[1])) {
        message.channel.send(`<@${sender.id}> Enter a Valid Number`);
        return tempUserData;
      }
      if (msgArr[1] > 10000000000000 || msgArr[1] < 1) {
        message.channel.send(`<@${sender.id}> Enter a Smaller Number`);
        return tempUserData;
      }
      if (tempUserData.primogems < msgArr[1]) {
        message.channel.send(`<@${sender.id}> Not enough Primogems`);
        return tempUserData;
      }
      if (Math.random() > 0.5) {
        tempUserData.primogems += parseInt(msgArr[1], 10);
        message.channel.send(`<@${sender.id}>\nYou won ${msgArr[1] * 2} Primogems!\nYou now have ${tempUserData.primogems} <:A_primogem:769909799872626690>`);
      } else {
        tempUserData.primogems -= parseInt(msgArr[1], 10);
        message.channel.send(`<@${sender.id}>\nPaimon ate your Primogems!\nYou now only have ${tempUserData.primogems} <:A_primogem:769909799872626690>`);
      }
      return tempUserData;
    } catch (err) { console.log(err); }
    return userData;
  },
};
