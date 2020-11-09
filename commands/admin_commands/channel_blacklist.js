module.exports = {
    name: 'channel_blacklist',
    description: 'Blacklist a Channel',
    usage: 'PREFIX + BLACKLIST',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, channels) {
        if (message.member.hasPermission("ADMINISTRATOR")) {    
        const fs = require('fs');
            try {
                if (channels[message.channel.id]) {
                    delete channels[message.channel.id];
                    fs.writeFile(`config/channelList.json`, JSON.stringify(channels, null, 4), (err) => {
                        if (err) console.error(err);
                    });        
                }
                message.channel.send(`<#${message.channel.id}> is now Blacklisted`);
            } catch (err) { console.log(err) }    
        }
	},
}