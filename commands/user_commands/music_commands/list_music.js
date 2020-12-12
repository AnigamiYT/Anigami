const { readFileSync } = require('fs');

const { MUSIC_PAGINATION_COUNT } = require('../../../constants.js');

/* eslint-disable camelcase */
module.exports = {
  name: 'list_music',
  description: 'List music at index',
  usage: 'PREFIX + LISTMUSIC',
  args: true,
  dmAllow: true,
  channels: [],
  execute: () => {
    try {
      const musicData = JSON.parse(readFileSync('./data/music.json', 'utf8'));
      let tempMsg = 'Music Playlist:\n';
      musicData.musicList.slice(0, MUSIC_PAGINATION_COUNT).forEach((item, index) => {
        tempMsg += `${index + 1}. ${item.name}\n`;
      });
      tempMsg += `\nPage 1 of ${Math.floor((musicData.musicList.length - 1) / MUSIC_PAGINATION_COUNT) + 1}`;
      return tempMsg;
    } catch (err) {
      console.log(err);
    }
    return '';
  },
};
