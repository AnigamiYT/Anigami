/* eslint-disable max-len */
const fs = require('fs');
const { MUSIC_PAGINATION_COUNT } = require('../../constants.js');

module.exports = {
  name: 'musiclist_page_change',
  description: 'Change music list page',
  usage: 'PREFIX + LISTMUSIC, then react on the message',
  args: true,
  dmAllow: true,
  channels: [],
  execute: (reaction, musicListIndex) => {
    let tempIndex = musicListIndex;
    try {
      const musicData = JSON.parse(fs.readFileSync('data/music.json', 'utf8'));
      let tempMsg = 'Music Playlist:\n';
      if (reaction.emoji.name === '⬅' && tempIndex > 0) {
        tempIndex -= 1;
        const musicList = musicData.musicList.slice(tempIndex * MUSIC_PAGINATION_COUNT, (tempIndex + 1) * MUSIC_PAGINATION_COUNT);
        musicList.forEach((item, index) => {
          tempMsg += `${tempIndex * MUSIC_PAGINATION_COUNT + index + 1}. ${item.name}\n`;
        });
        tempMsg += `\nPage ${tempIndex + 1} of ${Math.floor((musicData.musicList.length - 1) / MUSIC_PAGINATION_COUNT) + 1}`;
        reaction.message.edit(tempMsg);
      }
      if (reaction.emoji.name === '➡' && tempIndex < (Math.floor((musicData.musicList.length - 1) / MUSIC_PAGINATION_COUNT))) {
        tempIndex += 1;
        const musicList = musicData.musicList.slice(tempIndex * MUSIC_PAGINATION_COUNT, (tempIndex + 1) * MUSIC_PAGINATION_COUNT);
        musicList.forEach((item, index) => {
          tempMsg += `${tempIndex * MUSIC_PAGINATION_COUNT + index + 1}. ${item.name}\n`;
        });
        tempMsg += `\nPage ${tempIndex + 1} of ${Math.floor((musicData.musicList.length - 1) / MUSIC_PAGINATION_COUNT) + 1}`;
        reaction.message.edit(tempMsg);
      }
      return tempIndex;
    } catch (err) { console.log(err); }
    return musicListIndex;
  },
};
