module.exports = {
    name: 'hello',
    description:'!hax:hello - Says hello!',
    execute: (message, args = '') => {
        message.channel.send(`Hello ${message.author.username}`);
    }
}