module.exports = {
    name: 'check_weapons',
    description: 'Check your weapons',
    usage: 'PREFIX + WEAPONS',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData, msg_arr) {
        const sender = message.author;
        const { printWeapons } = require('../functions.js');

        try {
            message.channel.send(`<@${sender.id}>\n\n${printWeapons(userData.inventory.weapons)}`);

            // ADD NEW COMMAND FOR !weapons <weapon_name> TO DISPLAY UPGRADED WEAPON CONDITION

        } catch (err) { console.log(err) }
	},
}