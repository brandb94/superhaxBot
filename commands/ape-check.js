const yahooStockPrices = require('yahoo-stock-prices');
module.exports = {
    name: 'ape-check',
    description: '!hax:ape-check [stock symbol]',
    execute: async (message, args) => {
        const stockPrice = await yahooStockPrices.getCurrentPrice(args[0].toUpperCase());
        message.channel.send(`Stonk Price: ${stockPrice}`);
    }
}