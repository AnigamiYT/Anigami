module.exports = {
    name: 'claim_monthly',
    description: 'Claim monthly reward',
    usage: 'PREFIX + MONTHLY',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData) {
        const sender = message.author;
        const monthlyCooldown = 8.64e+7 * 30;

        try {
            if (!userData[sender.id])
                return userData;
            if (!userData[sender.id].lastMonthly)
                userData[sender.id].lastMonthly = 0;
            if (Date.now() - userData[sender.id].lastMonthly > monthlyCooldown) {
                userData[sender.id].primogems += 30000;
                userData[sender.id].lastMonthly = Date.now();            
                message.channel.send(`<@${sender.id}> you have claimed your monthly 30000 Primogems`);
            }
            else {
                const cond = Math.floor((monthlyCooldown - Date.now() + userData[sender.id].lastMonthly)/3600000) > 48;
                const daysRemaining = `${Math.ceil((monthlyCooldown - Date.now() + userData[sender.id].lastMonthly)/(3600000)/24)} days`;
                const hoursRemaining = `${Math.ceil((monthlyCooldown - Date.now() + userData[sender.id].lastMonthly)/(3600000))} hours`;
                message.channel.send(`<@${sender.id}> you have already claimed your monthly. Claim it again after ${cond ? daysRemaining : hoursRemaining}.`);
            }
            return userData;
        } catch (err) { console.log(err) }
	},
}