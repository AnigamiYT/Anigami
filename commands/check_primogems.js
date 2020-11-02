module.exports = {
    name: 'check_primogems',
    description: 'Check your amount of Primogems',
    usage: 'PREFIX + PRIMOGEMS',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData) {
        const sender = message.author;
    
        try {
            if (userData[sender.id]) {
                message.channel.send(`<@${sender.id}> you have ${userData[sender.id].primogems} Primogems`);
            }
            else {
                message.channel.send(`<@${sender.id}> you have no primogems`)
            }
        } catch (err) { console.log(err) }
	},
}