const { play } = require('../../../functions.js');

/* eslint-disable camelcase */
module.exports = {
  name: 'play_music',
  description: 'Play music at index',
  usage: 'PREFIX + PLAYMUSIC',
  args: true,
  dmAllow: true,
  channels: [],
  execute: async (message, msgArr, connection) => {
    try {
      const hasDJRole = message.member.roles.cache
        .find((r) => r.name === 'cafe-dj');
      if (hasDJRole) {
        let music_index = 1;
        if (msgArr[1] !== undefined) {
          music_index = parseInt(msgArr[1], 10);
        }
        play(connection, music_index - 1, message);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  },
};
