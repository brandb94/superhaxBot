module.exports = {
    name: 'hello',
    description:'greets user',
    execute: (message, args = '') => {
        message.channel.send(`Hello ${message.author.username}`);
    }
}