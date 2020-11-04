module.exports = {
    name: 'give_weapon',
    description: 'Give Weapon',
    usage: 'PREFIX + GIVE_WEAPON',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData, msg_arr) {
        const constants = require('../constants.js');
        try {
            if (message.member.hasPermission("ADMINISTRATOR")) {
                const targetUser = msg_arr[1].slice(3, 21);
                if (msg_arr[1]) {
                    if (userData[targetUser]) {
                        if (constants.weapons.includes(msg_arr[2])) {
                            if (userData[targetUser].inventory[msg_arr[2]])
                                userData[targetUser].inventory[msg_arr[2]]++;
                            else
                                userData[targetUser].inventory[msg_arr[2]] = 1;
                            message.channel.send(`You have given ${msg_arr[2]} to ${msg_arr[1]}`);
                        }
                        else {
                            message.channel.send('Please enter a valid weapon');
                        }
                    }
                    else {
                        message.channel.send('The user specified doesn\'t exist');
                    }
                }
                else {
                    message.channel.send('Please provide a user');
                }
            }
            return userData;
        } catch (err) { console.log(err) }
	},
}