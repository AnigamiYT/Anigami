module.exports = {
    name: 'check_weapons',
    description: 'Check your weapons',
    usage: 'PREFIX + WEAPONS',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData) {
        const sender = message.author;
        const { printWeapons } = require('../functions.js');

        try {
            if (userData[sender.id]) {
                message.channel.send(`<@${sender.id}>\n\n${printWeapons(userData[sender.id].inventory)}`);
            }
        } catch (err) { console.log(err) }
	},
}