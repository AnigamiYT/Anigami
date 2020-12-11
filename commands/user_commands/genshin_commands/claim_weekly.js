/* eslint-disable max-len */
export default {
  name: 'claim_weekly',
  description: 'Claim weekly reward',
  usage: 'PREFIX + WEEKLY',
  args: true,
  dmAllow: true,
  channels: [],
  execute: (message, userData, multiplier) => {
    const sender = message.author;
    const weeklyCooldown = 8.64e+7 * 7;
    const weeklyReward = 10000 * multiplier;
    const tempUserData = userData;

    try {
      if (!tempUserData) { return tempUserData; }
      if (!tempUserData.lastWeekly) { tempUserData.lastWeekly = 0; }
      if (Date.now() - tempUserData.lastWeekly > weeklyCooldown) {
        tempUserData.primogems += weeklyReward;
        tempUserData.lastWeekly = Date.now() - (Date.now() % weeklyCooldown);
        message.channel.send(`<@${sender.id}> you have claimed your weekly ${weeklyReward} Primogems`);
      } else {
        const cond = Math.floor((weeklyCooldown - Date.now() + tempUserData.lastWeekly) / 3600000) > 48;
        const daysRemaining = `${Math.ceil((weeklyCooldown - Date.now() + tempUserData.lastWeekly) / (3600000) / 24)} days`;
        const hoursRemaining = `${Math.ceil((weeklyCooldown - Date.now() + tempUserData.lastWeekly) / (3600000))} hours`;
        message.channel.send(`<@${sender.id}> you have already claimed your weekly. Claim it again after ${cond ? daysRemaining : hoursRemaining}.`);
      }
      return tempUserData;
    } catch (err) { console.log(err); }
    return userData;
  },
};
