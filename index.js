const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

client.commands = new Discord.Collection();

// Grab all files under the commands folder that end with .js
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
commandFiles.forEach(file => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
})

const prefix = '!hax:'

client.once('ready', () => {
    console.log('ready!');
});

client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot ) return;

    console.log(`user: ${message.author.username} content: ${message.content}`);

    // remove prefix from message, split rest of message by spaces into an array
    // '/ +/' is regex. This particular pattern means 1 or more spaces.
    // so for '!hax:coinflip sandwich'
    // args == ['coinflip', 'sandwich']
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase(); // grab first item from array. 'coinflip'


    if (client.commands.has(command)) {
        client.commands.get(command).execute(message, args);
    } else {
        message.channel.send('I... don\'t think I\'m allowed to do that...');
        console.log('Command not found.')
    }


});

// const processCommand = (command, args, message) => {
//     if (command === 'hello') {
//         message.channel.send(`Hello ${message.author.username}`);
//     } else if (command === 'coinflip') {
//         const randomNum = Math.floor(Math.random() * 2);
//         const result = randomNum === 0 ? 'heads' : 'tails';
//         message.channel.send(result);
//     } else if (command === 'serverinfo') {
//         message.channel.send(`Server Name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`)
//     } else {
//         message.channel.send('Listen here wise guy I\'m not programmed to do that');
//     }
// };

// const commands = {
//     hello: {
//         execute: (message) => {
//             message.channel.send(`Hello ${message.author.username}`);
//         },
//         info: '!hax:hello - Says hello!'
//     },
//     coinflip: {
//         execute: (message) => {
//             const randomNum = Math.floor(Math.random() * 2);
//             const result = randomNum === 0 ? 'heads' : 'tails';
//             message.channel.send(result);
//         },
//         info: '!hax:coinflip - settle disputes with a coinflip'
//     },
//     serverinfo: {
//         execute: (message) => {
//             message.channel.send(`Server Name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`)
//         },
//         info: '!hax:serverinfo - outputs basic info about the server'

//     },
//     help: {
//         execute: (message) => {

//         },
//         info: '!hax:help - Display all available commands'
//     }
// }

client.login(process.env.token);