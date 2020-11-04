module.exports = {
    name: 'claim_weekly',
    description: 'Claim weekly reward',
    usage: 'PREFIX + WEEKLY',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData, multiplier) {
        const sender = message.author;
        const weeklyCooldown = 8.64e+7 * 7;
        const weeklyReward = 10000 * multiplier;

        try {
            if (!userData)
                return userData;
            if (!userData.lastWeekly)
                userData.lastWeekly = 0;
            if (Date.now() - userData.lastWeekly > weeklyCooldown) {
                userData.primogems += weeklyReward;
                userData.lastWeekly = Date.now() - Date.now() % weeklyCooldown;
                message.channel.send(`<@${sender.id}> you have claimed your weekly ${weeklyReward} Primogems`);
            }
            else {
                const cond = Math.floor((weeklyCooldown - Date.now() + userData.lastWeekly)/3600000) > 48;
                const daysRemaining = `${Math.ceil((weeklyCooldown - Date.now() + userData.lastWeekly)/(3600000)/24)} days`;
                const hoursRemaining = `${Math.ceil((weeklyCooldown - Date.now() + userData.lastWeekly)/(3600000))} hours`;
                message.channel.send(`<@${sender.id}> you have already claimed your weekly. Claim it again after ${cond ? daysRemaining : hoursRemaining}.`);
            }
            return userData;
        } catch (err) { console.log(err) }
	},
}