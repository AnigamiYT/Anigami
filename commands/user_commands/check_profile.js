const { roundRect } = require('../../functions.js');
const Discord = require('discord.js');
const Canvas = require('canvas')


module.exports = {
    name: 'check_profile',
    description: 'Check your Profile',
    usage: 'PREFIX + PROFILE',
    args: true,
    dmAllow: true,
    channels: [],
	execute: async (message, userData, mora) => {
        Canvas.registerFont('fonts/HYWenHei.ttf', { family: 'HYWenHei', style: 'Heavy', weight: 'Normal' });
        const { 
            ARLevelUpBaseExp,
        } = require('../../constants.js');
        const sender = message.author;
        try {
            const canvas = Canvas.createCanvas(700, 250);
            const ctx = canvas.getContext('2d');
        
            const background = await Canvas.loadImage('img/playerinfo.jpg');
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
            ctx.strokeStyle = '#74037b';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
        
            // Print name
            ctx.font = "29px HYWenHei";
            ctx.fillStyle = 'rgb(236, 229, 216)';
            ctx.fillText(message.member.displayName, 263, 59);

            // Print exp
            ctx.textAlign = "end"
            ctx.font = "13px HYWenHei";
            ctx.fillStyle = "rgb(236, 229, 216)"
            ctx.fillText(`${userData.exp || 0}/${userData.level * ARLevelUpBaseExp || ARLevelUpBaseExp}`, 677, 86.4);
        
            // Print Primogems
            ctx.textAlign = "start"
            ctx.fillStyle = "#ffffff"
            ctx.font = "17px HYWenHei";
            ctx.fillText(`${userData.primogems || 0}`, 307, 219.5);

            // Print Mora
            ctx.fillText(`${mora || 0}`, 536, 219.5);

            // Print World Rank
            ctx.textAlign = "end"
            ctx.font = "23px HYWenHei";
            ctx.fillStyle = "rgb(208, 219, 228)"
            ctx.fillText(`${userData.level || 0}`, 670, 136);
            ctx.fillText(`${Math.floor(userData.level/5) || 0}`, 670, 175);
        
            // To change the color on the rectangle, just manipulate the context
            ctx.strokeStyle = "rgba(255, 0, 0, 0)";
            ctx.fillStyle = "rgb(204, 255, 102)";
            
            ctx.beginPath();
            ctx.rect(300.8, 93.7, 375.2 * (userData.exp/(userData.level * ARLevelUpBaseExp)), 6.7);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.arc(127, 127, 100, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
        
            const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar, 27, 27, 200, 200);
        
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
        
            message.channel.send(`Here is your profile, ${message.member}!`, attachment);

            return;
        } catch (err) { console.log(err) }
	},
}