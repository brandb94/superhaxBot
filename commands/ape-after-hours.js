const cheerio = require('cheerio');
const axios = require('axios');

const getAfterHoursPrice = async (url) => {
    const pageResponse = await axios.get(url);
    const html = pageResponse.data;
    const $ = cheerio.load(html);

   // const html = await page.evaluate(() => document.body.innerHTML);
    // const aferHoursPrice = $('span.symbol-page-header__pricing-price', html).text();
    const afterHoursPrice = $('div.css-65fur7').text();

    console.log(afterHoursPrice);

    const cleansedPrice = afterHoursPrice.split('-')[0].replace('$', '');
    const priceFloat = parseFloat(cleansedPrice).toFixed(2);


    return `$${priceFloat}`;
}

module.exports = {
    name: 'ape-after-hours',
    description: '!hax:ape-after-hours [stock symbol]',
    execute: async (message, args) => {
        const symbol = args[0];
        const url = `https://www.robinhood.com/stocks/${symbol}`;

        const afterHoursPrice = await getAfterHoursPrice(url);
        message.channel.send(`${symbol.toUpperCase()} After hours price: ${afterHoursPrice}`);
    }
}