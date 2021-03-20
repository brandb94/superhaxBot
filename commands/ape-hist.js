const yahooStockPrices = require('yahoo-stock-prices');
const moment = require('moment');


const getFromDate = (timeframe) => {
    if (timeframe.toLowerCase() === 'today')  {
        return moment().subtract('1', 'days');
    }
    if (timeframe.toLowerCase() === 'week') {
        const date = moment();
        date.subtract(7, 'days');
        return date;
    }
    if (timeframe.toLowerCase() === 'month') {
        const date = moment();
        date.subtract('1', 'months');
        return date;
    }
}

const getHighAndLowPrice = (priceHistory) => {
    let highValue = priceHistory[0].high;
    let lowValue = priceHistory[0].low;

    let highVolume = priceHistory[0].volume;
    let lowVolume = priceHistory[0].volume;
    priceHistory.forEach(item => {
        if (item.high > highValue) highValue = item.high;
        if (item.low < lowValue) lowValue = item.low;
        if (item.volume > highVolume) highVolume = item.volume;
        if (item.volume < lowVolume) lowVolume = item.volume;

    });

    return [highValue, lowValue, highVolume, lowVolume];
}

module.exports = {
    name: 'ape-hist',
    description: '!hax:ape-hist [stockSymbol] [timeframe]',
    execute: async (message, args) => {

        if (args.length !== 2) return;

        const [stockSymbol, timeframe] = args;

        const fromDate = getFromDate(timeframe);
        const toDate = moment(); //now

        const startMonth = fromDate.month();
        const startDay = fromDate.date();
        const startYear = fromDate.year();

        const endMonth = toDate.month();
        const endDay = toDate.date();
        const endYear = toDate.year();

        const frequency = '1d' // 1 day


        try{
            const priceHistory = await yahooStockPrices.getHistoricalPrices(startMonth, startDay, startYear, endMonth, endDay, endYear, stockSymbol, frequency);
            console.log(priceHistory);

            const [highPrice, lowPrice, highVolume, lowVolume] = getHighAndLowPrice(priceHistory);
            message.channel.send(`Stock: ${stockSymbol}\nHighest Price: ${highPrice}\nLowest Price: ${lowPrice}\nHighest single day volume: ${highVolume}\nLowest single day volume: ${lowVolume}`);


        } catch (err) {
            console.log(err);
            message.channel.send('Oops. Something went wrong fetching those stock prices. Tell the dev to fix it.');
        }
    }
}