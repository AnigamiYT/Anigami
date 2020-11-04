module.exports = {
    name: 'claim_daily',
    description: 'Claim daily reward',
    usage: 'PREFIX + DAILY',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData, multiplier) {
        const sender = message.author;
        const dailyReward = 1600 * multiplier;
        const dailyCooldown = 8.64e+7;

        try {
            if (!userData)
                return userData;
            if (!userData.lastDaily)
                userData.lastDaily = 0;
            if (Date.now() - userData.lastDaily > dailyCooldown) {
                userData.primogems += dailyReward;
                userData.lastDaily = Date.now() - Date.now() % dailyCooldown;            
                message.channel.send(`<@${sender.id}> you have claimed your daily ${dailyReward} Primogems`);
            }
            else {
                message.channel.send(`<@${sender.id}> you have already claimed your daily. Claim it again after ${Math.ceil((dailyCooldown - Date.now() + userData.lastDaily)/3600000)} hours.`);
            }
        return userData;
    } catch (err) { console.log(err) }
	},
}