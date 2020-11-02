module.exports = {
    name: 'give_primogems',
    description: 'Give Primogems',
    usage: 'PREFIX + GIVE',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData, msg_arr) {
        try {
            if (message.member.roles.cache.find(role => role.name === 'Administrator')) {
                const targetUser = msg_arr[1].slice(3, 21);
                if (msg_arr[1]) {
                    if (userData[targetUser]) {
                        if (/^\d+$/.test(msg_arr[2])) {
                            if (!userData[targetUser]) userData[targetUser] = {...constants.userInitialState, inventory: {}};
                            userData[targetUser].primogems += parseInt(msg_arr[2]);
                            message.channel.send(`You have given ${msg_arr[2]} Primogems to ${msg_arr[1]}`);
                        }
                        else {
                            message.channel.send('Please enter a proper amount of primogem');
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