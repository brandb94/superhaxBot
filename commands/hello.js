const hello = (message) => {
    message.channel.send(`Hello ${message.author.username}`);
}
export default hello;