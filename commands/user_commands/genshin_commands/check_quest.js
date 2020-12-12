module.exports = {
  name: 'check_quest',
  description: 'Check your quest',
  usage: 'PREFIX + QUEST',
  args: true,
  dmAllow: true,
  channels: [],
  execute: (message, userData, lastVote, mora) => {
    const sender = message.author;
    let msg = '';
    const tempUserData = userData;
    let tempMora = mora;
    const hours12Cooldown = 8.64e+7 / 2;
    try {
      if (!userData.lastClaim) {
        tempUserData.lastClaim = 120;
      }
      if (lastVote !== tempUserData.lastClaim) {
        tempUserData.lastClaim = lastVote;
        tempUserData.primogems += 10000;
        tempMora += 100000;
        message.channel.send(`<@${sender.id}> You have claimed 10,000 <:A_primogem:769909799872626690> and 100,000 <:A_mora:769909934359838721> from the quest`);
        return [tempUserData, tempMora];
      }

      if (Date.now() - tempUserData.lastClaim >= hours12Cooldown) {
        msg += '\nQuest #1: 10,000 <:A_primogem:769909799872626690> , 100,000 <:A_mora:769909934359838721> - Upvote the server in https://top.gg/servers/767057375545786368';
      } else {
        msg += `\nQuest #1: You can do this quest again after ${Math.ceil((hours12Cooldown - (Date.now() - tempUserData.lastClaim)) / 1000 / 60 / 60)} Hours`;
      }
      message.channel.send(`<@${sender.id}> You have the following Quests:${msg}`);
      return [tempUserData, tempMora];
    } catch (err) { console.log('Error in check_quest'); }
    return [userData, mora];
  },
};
