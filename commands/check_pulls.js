module.exports = {
    name: 'check_pulls',
    description: 'Check the number of Pulls you can make',
    usage: 'PREFIX + pulls',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData) {
        const sender = message.author;
    
        try {
            if (userData[sender.id]) {
                message.channel.send(`<@${sender.id}>\n${Math.floor(userData[sender.id].primogems/160)} <:A_Afate:769909854201446441>`);
            }
            else {
                message.channel.send(`<@${sender.id}> you have no remaining pull`)
            }
        } catch (err) { console.log(err) }
	},
}