const { readFileSync, writeFile } = require('fs');

/* eslint-disable camelcase */
module.exports = {
  name: 'remove_music',
  description: 'Remove music at index',
  usage: 'PREFIX + REMOVEMUSIC',
  args: true,
  dmAllow: true,
  channels: [],
  execute: async (message, msgArr) => {
    try {
      const hasDJRole = message.member.roles.cache.find((r) => r.name === 'cafe-dj');
      if (hasDJRole) {
        const musicIndex = parseInt(msgArr[1], 10) - 1;
        const musicData = JSON.parse(readFileSync('./data/music.json', 'utf8'));
        if (musicIndex < musicData.musicList.length) {
          message.channel.send(`${musicData.musicList[musicIndex].name} has been removed`);
        } else {
          message.channel.send('Enter a valid index');
          return;
        }
        musicData.musicList.splice(musicIndex, 1);
        writeFile('data/music.json', JSON.stringify(musicData, null, 4), (error) => {
          if (error) console.error(error);
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
