module.exports = {
    name: 'give_all_primogems',
    description: 'Give Primogems to All',
    usage: 'PREFIX + GIVEALL',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, msg_arr) {
        const fs = require('fs');
        try {
            const targetUser = msg_arr[1].slice(3, 21);
            read = fs.readFileSync(`Storage/players/${targetUser}.json`, 'utf8');
            userData = JSON.parse(read);
            if (message.author.id === '197673134885699585') {
                if (/^\d+$/.test(msg_arr[2])) {
                    var userData;
                    if (userData) {
                        if (/^\d+$/.test(msg_arr[2])) {
                            userData.primogems += parseInt(msg_arr[2]);
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
        } catch (err) { console.log(err, message.author.id) }
	},
}