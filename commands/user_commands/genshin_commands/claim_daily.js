export default {
  name: 'claim_daily',
  description: 'Claim daily reward',
  usage: 'PREFIX + DAILY',
  args: true,
  dmAllow: true,
  channels: [],
  execute: (message, userData, multiplier) => {
    const sender = message.author;
    const dailyReward = 1600 * multiplier;
    const dailyCooldown = 8.64e+7;
    const tempUserData = userData;

    try {
      if (!tempUserData) { return tempUserData; }
      if (!tempUserData.lastDaily) { tempUserData.lastDaily = 0; }
      if (Date.now() - tempUserData.lastDaily > dailyCooldown) {
        tempUserData.primogems += dailyReward;
        tempUserData.lastDaily = Date.now() - (Date.now() % dailyCooldown);
        message.channel.send(`<@${sender.id}> you have claimed your daily ${dailyReward} Primogems`);
      } else {
        message.channel.send(`<@${sender.id}> you have already claimed your daily. Claim it again after ${Math.ceil((dailyCooldown - Date.now() + tempUserData.lastDaily) / 3600000)} hours.`);
      }
      return tempUserData;
    } catch (err) { console.log(err); }
    return userData;
  },
};
