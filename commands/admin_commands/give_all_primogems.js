module.exports = {
    name: 'give_all_primogems',
    description: 'Give Primogems to All',
    usage: 'PREFIX + GIVEALL',
    args: true,
    dmAllow: true,
    channels: [],
	execute: (message, msg_arr, con) => {
        if (/^\d+$/.test(msg_arr[1]) && msg_arr[1] !== undefined && message.member.id === '197673134885699585') {
            con.query(`SELECT * FROM USERDATA`, (err, result, fields) => {
                if (err) throw err;
                var userData;
                var userID;
                result.forEach((item) => {
                    userData = JSON.parse(item.DATA.toString());
                    userID = item.DISCORDID;
                    console.log(userID);
                    userData.primogems += parseInt(msg_arr[1]);
                    userData = JSON.stringify(userData).replace(/'/g,"\\'");
                    // con.query(`UPDATE USERDATA SET DATA='${userData}' WHERE DISCORDID=${userID};`, () => {
                    //     console.log(userID);
                    // });
                });
                message.channel.send(`Successfully given ${msg_arr[1]} to all users.`);
                return;
            });
        }
    },
}