import { readFileSync, writeFile } from 'fs';

/* eslint-disable camelcase */
export default {
  name: 'add_music',
  description: 'Add music at index',
  usage: 'PREFIX + ADDMUSIC',
  args: true,
  dmAllow: true,
  channels: [],
  execute: async (message, youtube) => {
    try {
      const hasDJRole = message.member.roles.cache.find((r) => r.name === 'cafe-dj');
      if (hasDJRole) {
        const musicData = JSON.parse(readFileSync('./data/music.json', 'utf8'));
        const musicName = message.content.slice(10, 9999);
        const songInfo = await youtube.searchVideos(musicName);
        musicData.musicList.push({
          name: songInfo.title,
          link: `https://www.youtube.com/watch?v=${songInfo.id}`,
        });
        writeFile('data/music.json', JSON.stringify(musicData, null, 4), (error) => {
          if (error) console.error(error);
        });
        message.channel.send(`${songInfo.title} has been added to the playlist`);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
