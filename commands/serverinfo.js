module.exports = {
    name: 'serverinfo',
    description: '!hax:serverinfo - outputs basic info about the server',
    execute: (message, args) => {
        message.channel.send(`Server Name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`)
    }
}