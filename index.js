const dotenv = require('dotenv');
dotenv.config();

const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '!hax'

client.once('ready', () => {
    console.log('ready!');
});

client.on('message', (message) => {
    console.log(`user: ${message.author.username} content: ${message.content}`);

    const splitMessage = message.content.split(':');
    const messagePrefix = splitMessage[0];
    const command = splitMessage[1];

   // const fitsCommandPattern = message.content.startsWith(prefix);
    if (messagePrefix === prefix) {
        console.log('contains prefix!');
        processCommand(command, message);
    }  else {
        console.log('does not contain prefix');
    }


});

const processCommand = (command, message) => {
    if (command === 'hello') {
        message.channel.send(`Hello ${message.author.username}`);
    }
    if (command === 'coinflip') {
        const randomNum = Math.floor(Math.random() * 2);
        const result = randomNum === 0 ? 'heads' : 'tails';
        message.channel.send(result);
    }
    if (command === 'serverinfo') {
        message.channel.send(`Server Name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`)
    }
};

client.login(process.env.token);