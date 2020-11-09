module.exports = {
    name: 'channel_whitelist',
    description: 'Whitelist a Channel',
    usage: 'PREFIX + WHITELIST',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, channels) {
        if (message.member.hasPermission("ADMINISTRATOR")) {    
        const fs = require('fs');
            try {
                channels[message.channel.id] = true;
                fs.writeFile(`config/channelList.json`, JSON.stringify(channels, null, 4), (err) => {
                    if (err) console.error(err);
                });        
                message.channel.send(`<#${message.channel.id}> is now Whitelisted`);
            } catch (err) { console.log(err) }    
        }
	},
}