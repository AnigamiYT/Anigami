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
                message.channel.send(`<@${sender.id}>\n${userData[sender.id].primogems} <:A_primogem:769909799872626690>`);
            }
            else {
                message.channel.send(`<@${sender.id}> you have no primogems`)
            }
        } catch (err) { console.log(err) }
	},
}