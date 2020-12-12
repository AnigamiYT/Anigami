module.exports = {
  name: 'check_messages',
  description: 'Check the number of messages',
  usage: 'PREFIX + MESSAGES',
  args: true,
  dmAllow: true,
  channels: [],
  execute(message, userData) {
    const sender = message.author;

    try {
      message.channel.send(`<@${sender.id}> you have ${userData.messageSent} messages`);
    } catch (err) { console.log(err); }
  },
};
