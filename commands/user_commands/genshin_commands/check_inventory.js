import { printObject } from '../../../functions.js';

export default {
  name: 'check_inventory',
  description: 'Check your inventory',
  usage: 'PREFIX + INVENTORY',
  args: true,
  dmAllow: true,
  channels: [],
  execute(message, userData) {
    const sender = message.author;

    try {
      if (userData[sender.id]) {
        message.channel.send(`<@${sender.id}> INVENTORY:\n\n${printObject(userData[sender.id].inventory)}`);
      }
    } catch (err) { console.log(err); }
  },
};
