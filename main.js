const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));


bot.once('ready', () => {
    console.log('Anigami is Here!');
})

bot.login('NzcyNDYwNDA0MzQ1NTM2NTc0.X56_0A.ZUAhNu12-Ef1ZAhVMQxMZti9hSk')

bot.on('message', message => {
    
    var sender = message.author;
    var msg = message.content.toUpperCase();
    var prefix = 'A_';

    if (sender.id === '772460404345536574') {
        return;
    }

    // COMMANDS FOR ALL

    if (msg === prefix + 'RNG'){
        message.channel.send('I bless you my RNG');
    }

    if (msg === prefix + 'PRIMOGEMS') {
        message.channel.send(`You have ${Math.floor(userData[sender.id].messageSent/10)} Primogems`);
    }

    if (!userData[sender.id]) userData[sender.id] = {
        messagesSent: 0
    }

    userData[sender.id].messageSent++;
    fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
        if (err) console.error(err);
    });
});