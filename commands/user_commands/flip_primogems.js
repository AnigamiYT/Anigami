module.exports = {
    name: 'flip_primogems',
    description: 'Gamble your Primogems',
    usage: 'PREFIX + FLIP + AMOUNT',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData, msg_arr) {
        const sender = message.author;
        const fs = require('fs');

        try {
            if (!/^\d+$/.test(msg_arr[1])) {
                message.channel.send(`<@${sender.id}> Enter a Valid Number`);
                return userData;
            }
            if (msg_arr[1] > 10000000000000  || msg_arr[1] < 1) {
                message.channel.send(`<@${sender.id}> Enter a Smaller Number`);
                return userData;
            }
            if (userData.primogems <  msg_arr[1]) {
                message.channel.send(`<@${sender.id}> Not enough Primogems`);
                return userData;
            }
            if (Math.random() > 0.5) {
                userData.primogems += parseInt(msg_arr[1]);
                message.channel.send(`<@${sender.id}>\nYou won ${msg_arr[1] * 2} Primogems!\nYou now have ${userData.primogems} <:A_primogem:769909799872626690>`);
            }
            else {
                userData.primogems -= parseInt(msg_arr[1]);
                message.channel.send(`<@${sender.id}>\nPaimon ate your Primogems!\nYou now only have ${userData.primogems} <:A_primogem:769909799872626690>`);
            }
        return userData;
        } catch (err) { console.log(err) }
	},
}