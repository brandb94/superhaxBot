module.exports = {
    name: 'coinflip',
    description: '!hax:coinflip - settle disputes with a coinflip',
    execute: (message, args) => {
        const randomNum = Math.floor(Math.random() * 2);
        const result = randomNum === 0 ? 'heads' : 'tails';
        message.channel.send(result);
    }
}