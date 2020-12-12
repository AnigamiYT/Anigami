/* eslint-disable max-len */
const constants = require('../../constants.js');

module.exports = {
  name: 'give_character',
  description: 'Give Character',
  usage: 'PREFIX + GIVE_CHARACTER',
  args: true,
  dmAllow: true,
  channels: [],
  execute: (message, userData, msgArr) => {
    const tempUserData = userData;
    try {
      if (message.author.id === '197673134885699585') {
        const targetUser = msgArr[1].slice(3, 21);
        if (msgArr[1]) {
          if (tempUserData[targetUser]) {
            if (constants.characters.includes(msgArr[2])) {
              if (tempUserData[targetUser].inventory[msgArr[2]]) { tempUserData[targetUser].inventory[msgArr[2]] += 1; } else { tempUserData[targetUser].inventory[msgArr[2]] = 1; }
              message.channel.send(`You have given ${msgArr[2]} to ${msgArr[1]}`);
            } else {
              message.channel.send('Please enter a valid character');
            }
          } else {
            message.channel.send('The user specified doesn\'t exist');
          }
        } else {
          message.channel.send('Please provide a user');
        }
      }
      return tempUserData;
    } catch (err) { console.log(err); }
    return userData;
  },
};
