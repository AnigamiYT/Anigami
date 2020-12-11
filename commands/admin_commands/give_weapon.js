/* eslint-disable max-len */
import * as constants from '../../constants.js';

export default {
  name: 'give_weapon',
  description: 'Give Weapon',
  usage: 'PREFIX + GIVE_WEAPON',
  args: true,
  dmAllow: true,
  channels: [],
  execute: (message, userData, msgArr) => {
    try {
      const tempUserData = userData;
      if (message.author.id === '197673134885699585') {
        const targetUser = msgArr[1].slice(3, 21);
        if (msgArr[1]) {
          if (tempUserData[targetUser]) {
            if (constants.weapons.includes(msgArr[2])) {
              if (tempUserData[targetUser].inventory[msgArr[2]]) { tempUserData[targetUser].inventory[msgArr[2]] += 1; } else { tempUserData[targetUser].inventory[msgArr[2]] = 1; }
              message.channel.send(`You have given ${msgArr[2]} to ${msgArr[1]}`);
            } else {
              message.channel.send('Please enter a valid weapon');
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
