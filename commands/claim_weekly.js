module.exports = {
    name: 'claim_weekly',
    description: 'Claim weekly reward',
    usage: 'PREFIX + WEEKLY',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData) {
        const sender = message.author;
        const weeklyCooldown = 8.64e+7 * 7;

        try {
            if (!userData[sender.id])
                return userData;
            if (!userData[sender.id].lastWeekly)
                userData[sender.id].lastWeekly = 0;
            if (Date.now() - userData[sender.id].lastWeekly > weeklyCooldown) {
                userData[sender.id].primogems += 10000;
                userData[sender.id].lastWeekly = Date.now();            
                message.channel.send(`<@${sender.id}> you have claimed your daily 10000 Primogems`);
            }
            else {
                const cond = Math.floor((weeklyCooldown - Date.now() + userData[sender.id].lastWeekly)/3600000) > 48;
                const daysRemaining = `${Math.floor((weeklyCooldown - Date.now() + userData[sender.id].lastWeekly)/(3600000)/24)} days`;
                const hoursRemaining = `${Math.floor((weeklyCooldown - Date.now() + userData[sender.id].lastWeekly)/(3600000))} hours`;
                message.channel.send(`<@${sender.id}> you have already claimed your weekly. Claim it again after ${cond ? daysRemaining : hoursRemaining}.`);
            }
            return userData;
        } catch (err) { console.log(err) }
	},
}