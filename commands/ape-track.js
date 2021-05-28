const yahooStockPrices = require('yahoo-stock-prices');
module.exports = {
    name: 'ape-track',
    description: '!hax:ape-track 0:[stock symbol] 1:[interval(seconds)] 2:[max time (minutes)]',
    execute: async (message, args) => {
        const stockPrice = await yahooStockPrices.getCurrentPrice(args[0].toUpperCase());
        const refreshInterval = args[1] * 1000;
        const timeToRun = args[2];

        const startTime = new Date();
        let timesUpdated = 0;
        message.channel.send(`Stonk Price: ${stockPrice}`).then(sentMessage => {
            sentMessage.pin();
            const updateLoop = setInterval( async () => {
                const endTime = new Date();
                const timeElapsedInMinutes = Math.round((endTime - startTime) / 1000) / 60;
                if (timeElapsedInMinutes > timeToRun) {
                    console.log('exiting!');
                    sentMessage.unpin();
                    clearInterval(updateLoop);
                } 
                const updatedPrice = await yahooStockPrices.getCurrentPrice(args[0].toUpperCase());
                console.log(`Times updated: ${++timesUpdated}`);
                sentMessage.edit(`Stonk Price: ${updatedPrice}`);
            }, refreshInterval);
        });
    }
};