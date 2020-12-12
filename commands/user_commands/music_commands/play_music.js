const { play } = require('../../../functions.js');

/* eslint-disable camelcase */
module.exports = {
  name: 'play_music',
  description: 'Play music at index',
  usage: 'PREFIX + PLAYMUSIC',
  args: true,
  dmAllow: true,
  channels: [],
  execute: async (message, msg_arr, connection) => {
    try {
      const hasDJRole = message.member.roles.cache
        .find((r) => r.name === 'cafe-dj');
      if (hasDJRole) {
        let music_index = 1;
        if (msg_arr[1] !== undefined) {
          music_index = parseInt(msg_arr[1], 10);
        }
        play(connection, music_index - 1, message);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  },
};
