module.exports = {
    name: 'claim_daily',
    description: 'Claim daily reward',
    usage: 'PREFIX + DAILY',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData) {
        const sender = message.author;
        const dailyCooldown = 8.64e+7;

        try {
            if (!userData[sender.id])
                return userData;
            if (!userData[sender.id].lastDaily)
                userData[sender.id].lastDaily = 0;
            if (Date.now() - userData[sender.id].lastDaily > dailyCooldown) {
                userData[sender.id].primogems += 1600;
                userData[sender.id].lastDaily = Date.now();            
                message.channel.send(`<@${sender.id}> you have claimed your daily 1600 Primogems`);
            }
            else {
                message.channel.send(`<@${sender.id}> you have already claimed your daily. Claim it again after ${Math.ceil((dailyCooldown - Date.now() + userData[sender.id].lastDaily)/3600000)} hours.`);
            }
        return userData;
    } catch (err) { console.log(err) }
	},
}