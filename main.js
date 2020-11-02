const { token } = require('./token.js');
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const constants = require('./constants.js');
const { generalBanner, printObject } = require('./functions.js');

const userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

const dailyCooldown = 8.64e+7;
var ctr;

bot.once('ready', () => {
    console.log('Anigami is Here!');
})

bot.login(token);

bot.on('message', message => {

    const sender = message.author;
    const msg = message.content.toUpperCase();
    const prefix = '!';
    const msg_arr = msg.split(" ");

    if (sender.id === '772460404345536574') {
        return;
    }

    if (!userData[sender.id]) userData[sender.id] = {...constants.userInitialState, inventory: {}};
    
    // COMMANDS FOR ALL

    if (msg === prefix + 'MESSAGES'){
        if (userData[sender.id])
            message.channel.send(`You have ${userData[sender.id].messageSent} messages`);
        else
            message.channel.send('No messages yet')
    }

    if (msg === prefix + 'PRIMOGEMS') {
        if (userData[sender.id])
            message.channel.send(`You have ${Math.floor(userData[sender.id].primogems)} Primogems`);
        else
            message.channel.send('No Primogems yet')
    }

    if (msg === prefix + 'SINGLEPULL') {
        if (userData[sender.id]) {
            if (userData[sender.id].primogems >= 160) {
                const reward = generalBanner(userData[sender.id].pityCounter4star, userData[sender.id].pityCounter5star);
                message.channel.send(`You obtained ${reward}`);
                if (!userData[sender.id].inventory[reward])
                    userData[sender.id].inventory[reward] = 1;
                else
                    userData[sender.id].inventory[reward]++;
                if (constants.generalBanner4Star.includes(reward))
                    userData[sender.id].pityCounter4star = 0;
                if (constants.generalBanner5Star.includes(reward))
                    userData[sender.id].pityCounter5star = 0;
                userData[sender.id].pityCounter4star++;
                userData[sender.id].pityCounter5star++;
                userData[sender.id].primogems -= 160;
            }
            else {
                message.channel.send('Not enough Primogems');
            }
        }
        else {
            message.channel.send('Not enough Primogems')
        }
    }

    if (msg === prefix + 'MULTIPULL') {
        if (userData[sender.id]) {
            if (userData[sender.id].primogems >= 1600) {
                var reward = [];
                var tempReward;
                for (ctr = 0; ctr < 10; ctr++) {
                    tempReward = generalBanner(userData[sender.id].pityCounter4star, userData[sender.id].pityCounter5star);
                    reward.push(tempReward);
                    if (!userData[sender.id].inventory[tempReward])
                        userData[sender.id].inventory[tempReward] = 1;
                    else
                        userData[sender.id].inventory[tempReward]++;
                    if (constants.generalBanner4Star.includes(tempReward))
                        userData[sender.id].pityCounter4star = 0;
                    if (constants.generalBanner5Star.includes(tempReward))
                    userData[sender.id].pityCounter5star = 0;
                        userData[sender.id].pityCounter4star++;
                    userData[sender.id].pityCounter5star++;
                }
                userData[sender.id].primogems -= 1600
                message.channel.send(`You obtained the following:\n${reward.join("\n")}`);    
            }
            else {
                message.channel.send('Not enough Primogems');
            }
        }
        else {
            message.channel.send('Not enough Primogems')
        }
    }

    if (msg === prefix + 'INVENTORY') {
        if (userData[sender.id]) {
            message.channel.send('INVENTORY:\n\n' + printObject(userData[sender.id].inventory));
        }
    }

    if (msg === prefix + 'DAILY') {
        if (Date.now() - userData[sender.id].lastDaily > dailyCooldown) {
            userData[sender.id].primogems += 1600;
            userData[sender.id].lastDaily = Date.now();            
            message.channel.send('You have claimed your daily 1600 Primogems');
        }
        else {
            message.channel.send(`You have already claimed your daily. Claim it again after ${Math.floor((dailyCooldown - Date.now() + userData[sender.id].lastDaily)/3600000)} hours.`);
        }
    }

    // COMMANDS FOR ADMIN

    if (msg_arr[0] === prefix + 'GIVE_PRIMOGEMS' && message.member.roles.cache.find(role => role.name === 'Administrator')) {
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

    // COMMANDS AUTO EXECUTED TO ALL
   
    userData[sender.id].messageSent++;

    if (msg.length < 20)
        userData[sender.id].primogems += msg.length;
    else
        userData[sender.id].primogems += 20;

    fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
        if (err) console.error(err);
    });
});