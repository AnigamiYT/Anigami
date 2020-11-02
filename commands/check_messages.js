module.exports = {
    name: 'check_messages',
    description: 'Check the number of messages',
    usage: 'PREFIX + MESSAGES',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData) {
        const sender = message.author;
    
        try {
            if (userData[sender.id]) {
                message.channel.send(`<@${sender.id}> you have ${userData[sender.id].messageSent} messages`);
            }
            else {
                message.channel.send(`<@${sender.id}> you have no messages yet`)
            }
        } catch (err) { console.log(err) }
	},
}