module.exports = {
    name: 'give_primogems',
    description: 'Give Primogems',
    usage: 'PREFIX + GIVE',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, msg_arr, con) {
        try {
            if (msg_arr[1] !== undefined && msg_arr[2] !== undefined && message.member.id === '197673134885699585') {
                const targetUser = msg_arr[1].slice(3, 30).split('>')[0];
                var userData;
                con.query(`SELECT DATA FROM USERDATA WHERE DISCORDID=${targetUser}`, (err, result, fields) => {
                    if (err) throw err;

                    userData = JSON.parse(result[0].DATA.toString());
                    if (userData) {
                        if (/^\d+$/.test(msg_arr[2])) {
                            userData.primogems += parseInt(msg_arr[2]);
                            userData = JSON.stringify(userData).replace(/'/g,"\\'");
                            con.query(`UPDATE USERDATA SET DATA='${userData}' WHERE DISCORDID=${targetUser};`);
                            message.channel.send(`You have given ${msg_arr[2]} Primogems to ${msg_arr[1]}`);
                        }
                        else {
                            message.channel.send('Please enter a proper amount of primogem');
                        }
                    }
                    else {
                        message.channel.send('The user specified doesn\'t exist');
                    }
                });
            }
            else {
                message.channel.send('Invalid input');
            }
            return;
        } catch (err) { console.log(err, message.member.id) }
	},
}