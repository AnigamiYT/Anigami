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
            message.channel.send(`<@${sender.id}>\n${Math.floor(userData.primogems/160)} <:A_Afate:769909854201446441>`);
        } catch (err) { console.log(err) }
	},
}