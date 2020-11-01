const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));


bot.once('ready', () => {
    console.log('Anigami is Here!');
})

bot.login('NzcyNDYwNDA0MzQ1NTM2NTc0.X56_0A.sC235rNymyi_XAm6vF6JF6yxB-U')

bot.on('message', message => {
    
    const sender = message.author;
    const msg = message.content.toUpperCase();
    const prefix = 'A_';
    const msg_arr = msg.split(" ");

    if (sender.id === '772460404345536574') {
        return;
    }

    if (!userData[sender.id]) userData[sender.id] = {
        messageSent: 0,
        primogems: 0,
    }
    
    // COMMANDS FOR ALL

    if (msg === prefix + 'RNG'){
        message.channel.send('I bless you my RNG');
    }

    if (msg === prefix + 'MESSAGES'){
        if (userData[sender.id])
            message.channel.send(`You have ${Math.floor(userData[sender.id].messageSent)} messages`);
        else
            message.channel.send('No messages yet')
    }

    if (msg === prefix + 'PRIMOGEMS') {
        if (userData[sender.id])
            message.channel.send(`You have ${Math.floor(userData[sender.id].primogems)} Primogems`);
        else
            message.channel.send('No Primogems yet')
    }

    // COMMANDS FOR ADMIN

    if (msg_arr[0] === prefix + 'GIVE_PRIMOGEMS' && message.member.roles.cache.find(role => role.name === 'Administrator')) {
        const targetUser = msg_arr[1].slice(3, 21);
        if (msg_arr[1]) {
            if (userData[targetUser]) {
                if (/^\d+$/.test(msg_arr[2])) {
                    if (!userData[targetUser]) userData[targetUser] = {
                        messageSent: 0,
                        primogems: 0,
                    }                
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

    // COMMANDS AUTO EXECUTED TO ALL
   
    userData[sender.id].messageSent++;
    userData[sender.id].primogems++;

    fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
        if (err) console.error(err);
    });
});