const fs = require('fs');

module.exports = {
  name: 'channel_whitelist',
  description: 'Whitelist a Channel',
  usage: 'PREFIX + WHITELIST',
  args: true,
  dmAllow: true,
  channels: [],
  execute(message, channels) {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      try {
        const tempChannels = channels;
        tempChannels[message.channel.id] = true;
        fs.writeFile('config/channelList.json', JSON.stringify(tempChannels, null, 4), (err) => {
          if (err) console.error(err);
        });
        message.channel.send(`<#${message.channel.id}> is now Whitelisted`);
      } catch (err) { console.log(err); }
    }
  },
};
