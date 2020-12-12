/* eslint-disable max-len */
const { readFileSync, writeFile, unlinkSync } = require('fs');
const DBL = require('dblapi.js');
const YoutubeAPI = require('discord-youtube-api');
const { createConnection } = require('mysql');
const { Client } = require('discord.js');
const constants = require('./constants.js');
const { token, database } = require('./credentials.js');
const commandList = require('./commands/index.js');

// Push command list into commands
const commands = {
  ...commandList.admin_commands,
  ...commandList.reaction_commands,
  ...commandList.user_commands.general_commands,
  ...commandList.user_commands.genshin_commands,
  ...commandList.user_commands.music_commands,
};

const { userInitialState } = constants;
const bot = new Client();

const dbl = new DBL('', {
  webhookPort: 8055,
  webhookAuth: 'SomeSuperRandom12901&$!*($&*($!',
});

const youtube = new YoutubeAPI('AIzaSyCMMoseDz8dNM5dv_qo9R-xMzveKgM_U7Q');
const con = createConnection(database);

// Global Constants
const channelListPath = './config/channelList.json';
const flagsListPath = './flags.json';
const isMainBot = 1;
const prefix = isMainBot === 1 ? '!' : '~';

// Global Variables
let connectionCurrent = null;
let musicListId = null;
let musicListIndex = 0;

// ======================================================= //

con.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected!');
});

bot.once('ready', () => {
  console.log('Anigami is Here!');
  const minute = 1000 * 60;
  setInterval(() => {
    con.query('UPDATE USERDATA SET RESIN=RESIN + 1 WHERE RESIN < 120');
  }, minute);
});

// This part is for TOP.GG voting

dbl.webhook.on('ready', (hook) => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});

dbl.webhook.on('vote', (vote) => {
  console.log(`User with ID ${vote.user} just voted!`);
  con.query(`UPDATE USERDATA SET LASTVOTE=${Date.now()} WHERE DISCORDID=${vote.user};`);
});

bot.login(token);

bot.on('voiceStateUpdate', (oldMember, newMember) => {
  // User Joins a voice channel
  if (newMember.channelID === '785841402960543745') {
    const member = newMember.guild.members.cache.get(newMember.id);
    const role = newMember.guild.roles.cache.find((r) => r.name === 'hideout-access');
    member.roles.add(role);

  // User Joins a voice channel
  } else if (oldMember.channelID === '785841402960543745') {
    const member = newMember.guild.members.cache.get(newMember.id);
    const role = newMember.guild.roles.cache.find((r) => r.name === 'hideout-access');
    member.roles.remove(role);
  }
});

bot.on('messageReactionAdd', async (reaction) => {
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.error('Something went wrong when fetching the message: ', error);
      return;
    }
  }
  if (reaction.message.id === musicListId) {
    musicListIndex = commands.musiclist_page_change.execute(reaction, musicListIndex);
  }
});

// MESSAGE CONSTANTS

bot.on('message', async (message) => {
  if (!message.member) {
    return;
  }

  const sender = message.author;
  const msg = message.content.toUpperCase();
  const msgArr = msg.split(' ');
  const msgArrNormalCase = message.content.split(' ');
  let multiplier = 1;
  let userData;
  let isBooster = 0;
  let isPatron = 0;

  const allowedChannels = JSON.parse(readFileSync(channelListPath, 'utf8'));
  const flags = JSON.parse(readFileSync(flagsListPath, 'utf8'));

  if (msgArr[0] === `${prefix}SQLQUERY` && sender.id === '197673134885699585') {
    msgArr.shift();
    con.query(msgArr.join(' '), console.log);
    return;
  }

  if (flags.isQuestion === true) {
    const answerData = JSON.parse(readFileSync('data/data.json', 'utf8'));
    if (answerData.targetChannel === message.channel.id) {
      answerData.userAnswers[sender.id] = msg;
      writeFile('data/data.json', JSON.stringify(answerData, null, 4), (err) => {
        if (err) console.error(err);
      });
    }
  }

  // MAIN PROGRAM AFTER SQL QUERY
  con.query(`SELECT * FROM USERDATA WHERE DISCORDID=${sender.id}`, async (err, result) => {
    if (err) {
      throw err;
    }

    if (result.length === 0) {
      con.query(`INSERT INTO USERDATA (DISCORDID, DATA) VALUES (${sender.id}, '${JSON.stringify(userInitialState)}');`);
      return;
    }
    userData = JSON.parse(result[0].DATA.toString());

    if (!userData) {
      return;
    }

    let resin = result[0].RESIN;
    let mora = result[0].MORA;
    const lastVote = result[0].LASTVOTE;

    if (message.member.hasPermission('ADMINISTRATOR') || allowedChannels[message.channel.id] === true) {
      if (message.member.roles.cache.has('769411892326039612')) {
        multiplier = 2;
        isBooster = 1;
      }

      if (message.member.roles.cache.has('769251426764455937')) {
        multiplier = 5;
        isPatron = 1;
      }

      if (message.author.bot) {
        return;
      }

      // COMMANDS FOR ALL
      switch (msgArr[0]) {
        case `${prefix}MESSAGES`: {
          commands.check_messages.execute(message, userData);
          return;
        }

        case `${prefix}PLAYMUSIC`: {
          const voiceChannel = message.member.voice.channel;
          const connection = await voiceChannel.join();
          connectionCurrent = connection;
          commands.play_music.execute(message, userData);
          return;
        }

        case `${prefix}ADDMUSIC`: {
          commands.add_music.execute(message, youtube);
          return;
        }

        case `${prefix}REMOVEMUSIC`: {
          commands.remove_music.execute(message, msgArr);
          return;
        }

        case `${prefix}LISTMUSIC`: {
          const tempMsg = commands.list_music.execute();
          musicListIndex = 0;
          message.channel.send(tempMsg).then(async (currentMessage) => {
            await currentMessage.react('⬅');
            await currentMessage.react('➡');
            musicListId = currentMessage.id;
          });
          return;
        }

        case `${prefix}NEXT`: {
          if (!(connectionCurrent === null || connectionCurrent === undefined)) {
            connectionCurrent.dispatcher.end();
          }
          return;
        }

        case `${prefix}QUEST`: {
          [userData, mora] = commands.check_quest.execute(message, userData, lastVote, mora);
          break;
        }

        case `${prefix}HELP`: {
          commands.help.execute(message);
          break;
        }

        case `${prefix}PRIMOGEMS`: {
          commands.check_primogems.execute(message, userData);
          break;
        }

        case `${prefix}RESIN`: {
          commands.check_resin.execute(message, resin);
          break;
        }

        case `${prefix}RESIN_RESET`: {
          if (sender.id === '197673134885699585') {
            con.query('UPDATE USERDATA SET RESIN=120');
            message.channel.send('All Resin has been reset...', 'utf8');
          }
          return;
        }

        case `${prefix}LEYLINE`: {
          [userData, resin, mora] = commands.fight_leyline.execute(message, userData, msgArr, resin, mora);
          break;
        }

        case `${prefix}PROFILE`: {
          commands.check_profile.execute(message, userData, mora);
          return;
        }

        case `${prefix}FLIP`: {
          userData = commands.flip_primogems.execute(message, userData, msgArr);
          break;
        }

        case `${prefix}PULLS`: {
          commands.check_pulls.execute(message, userData);
          break;
        }

        case `${prefix}SINGLEPULL`: {
          userData = commands.single_pull.execute(message, userData);
          break;
        }

        case `${prefix}MULTIPULL`: {
          userData = commands.multi_pull.execute(message, userData);
          break;
        }

        case `${prefix}WHALEPULL`: {
          userData = commands.whale_pull.execute(message, userData);
          break;
        }

        // NOT IN USE FOR NOW
        // case prefix + 'INVENTORY': {
        //     commands.check_inventory.execute(message, userData);
        //     break;
        // }

        case `${prefix}WEAPONS`: {
          commands.check_weapons.execute(message, userData, msgArrNormalCase);
          break;
        }

        case `${prefix}UPGRADE`: {
          userData = commands.upgrade_weapon.execute(message, userData, msgArrNormalCase);
          break;
        }

        case `${prefix}CHARACTERS`: {
          commands.check_characters.execute(message, userData, msgArrNormalCase);
          break;
        }

        case `${prefix}PARTY`: {
          commands.party_setup.execute(message, userData, msgArrNormalCase, isBooster, isPatron, con);
          break;
        }

        case `${prefix}EQUIP`: {
          userData = commands.equip_weapon.execute(message, userData, msgArrNormalCase);
          break;
        }

        case `${prefix}DAILY`: {
          userData = commands.claim_daily.execute(message, userData, multiplier);
          break;
        }

        case `${prefix}WEEKLY`: {
          userData = commands.claim_weekly.execute(message, userData, multiplier);
          break;
        }

        case `${prefix}MONTHLY`: {
          userData = commands.claim_monthly.execute(message, userData, multiplier);
          break;
        }

        case `${prefix}QUESTION`: {
          if (sender.id === '197673134885699585' && flags.isQuestion === false) {
            const answerData = JSON.parse(readFileSync('data/data.json', 'utf8'));
            const targetChannel = msgArr[1].slice(2, 30).split('>')[0];
            flags.isQuestion = true;
            // eslint-disable-next-line prefer-destructuring
            answerData.answer = msgArr[2];
            answerData.targetChannel = targetChannel;
            writeFile('data/data.json', JSON.stringify(answerData, null, 4), (error) => {
              if (error) console.error(error);
            });
            writeFile('flags.json', JSON.stringify(flags, null, 4), (error) => {
              if (error) console.error(error);
            });
            console.log(targetChannel);
          } else if (sender.id === '197673134885699585' && flags.isQuestion === true) {
            const answerData = JSON.parse(readFileSync('data/data.json', 'utf8'));
            const connectedMembers = message.guild.channels.cache.find((c) => c.id === '780036535369990144').members;
            flags.isQuestion = false;
            writeFile('flags.json', JSON.stringify(flags, null, 4), (error) => {
              if (error) console.error(error);
            });
            // eslint-disable-next-line no-restricted-syntax
            for (const [memberID] of connectedMembers) {
              console.log(answerData.userAnswers[memberID], answerData.answer);
              if (answerData.userAnswers[memberID] === undefined) {
                message.guild.member(memberID).voice.setChannel('780036569700499488');
              } else if (answerData.userAnswers[memberID].toUpperCase() === answerData.answer.toUpperCase());
              else {
                message.guild.member(memberID).voice.setChannel('780036569700499488');
              }
            }
            message.channel.send('DONE');
          }
          return;
        }

        case `${prefix}WHITELIST`: {
          commands.channel_whitelist.execute(message, allowedChannels);
          return;
        }

        case `${prefix}BLACKLIST`: {
          commands.channel_blacklist.execute(message, allowedChannels);
          return;
        }

        case `${prefix}GENERATE_WEAPON_CONSTANTS`: {
          commands.generate_weapon_constants.execute(message);
          return;
        }

        case `${prefix}GENERATE_CHARACTER_CONSTANTS`: {
          commands.generate_character_constants.execute(message);
          return;
        }

        // case prefix + 'DELETE_FOLDER': {
        //     if (message.member.id === '197673134885699585') {
        //         message.channel.send(`Deleting...`);
        //         fs.rmdir(msgArrNormalCase[1], { recursive: true }, (err) => {
        //             if (err) {
        //                 throw err;
        //             }
        //         });
        //         message.channel.send(`${msgArr[1]} is deleted!`);
        //     }
        //     return;
        // }

        case `${prefix}PRINT_FILE`: {
          if (message.author.id === '197673134885699585') {
            userData = JSON.parse(readFileSync(msgArrNormalCase[1], 'utf8'));
            console.log(userData);
          }
          return;
        }

        case `${prefix}DELETE_FILE`: {
          if (message.author.id === '197673134885699585') {
            try {
              unlinkSync(msgArrNormalCase[1]);
            } catch (error) {
              console.error(error);
            }
            message.channel.send('File successfully deleted...', 'utf8');
          }
          return;
        }

        // COMMANDS FOR ADMIN
        case `${prefix}GIVE`: {
          commands.give_primogems.execute(message, msgArr, con);
          return;
        }

        // case prefix + 'GIVEALL': {
        //     commands.give_all_primogems.execute(message, msgArr, con);
        //     message.channel.send('im here');
        //     return;
        // }

        case `${prefix}ENABLE`: {
          if (message.author.id === '197673134885699585' && flags.isEnabled === false) {
            commands.give_all_primogems.execute(message, msgArr);
            message.channel.send('Chat has been enabled.');
          } else {
            message.channel.send('Chat is already enabled.');
          }
          return;
        }

        // case prefix + 'GIVE_WEAPON': {
        //     if (msgArr[1] !== undefined && msgArr[2] !== undefined)
        //         userData = commands.give_weapon.execute(message, msgArrNormalCase);
        //     break;
        // }

        // case prefix + 'GIVE_CHARACTER': {
        //     if (msgArr[1] !== undefined && msgArr[2] !== undefined)
        //         userData = commands.give_character.execute(message, msgArrNormalCase);
        //     break;
        // }

        default: {
          break;
        }
      }

      // ALL EXECUTE
      try {
        // eslint-disable-next-line no-plusplus
        userData.messageSent++;
      } catch {
        console.log(msg);
      }
      if (msg.length < 20) {
        userData.primogems += msg.length * multiplier;
      } else {
        userData.primogems += 20 * multiplier;
      }
      userData = JSON.stringify(userData).replace(/'/g, '\\\'');
      con.query(`UPDATE USERDATA SET DATA='${userData}', RESIN=${resin}, MORA=${mora} WHERE DISCORDID=${sender.id};`);
    }
  });
});
