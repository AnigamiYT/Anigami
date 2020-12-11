import * as fs from 'fs';

export default {
  name: 'channel_blacklist',
  description: 'Blacklist a Channel',
  usage: 'PREFIX + BLACKLIST',
  args: true,
  dmAllow: true,
  channels: [],
  execute(message, channels) {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      try {
        if (channels[message.channel.id]) {
          const tempChannels = channels;
          delete tempChannels[message.channel.id];
          fs.writeFile('config/channelList.json', JSON.stringify(tempChannels, null, 4), (err) => {
            if (err) console.error(err);
          });
        }
        message.channel.send(`<#${message.channel.id}> is now Blacklisted`);
      } catch (err) { console.log(err); }
    }
  },
};
