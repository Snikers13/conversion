let Currency = require('./compiler');


let currency = new Currency();

//ConvertionBoth may have 2 param, or default 100;
currency.UaUSConvertBoth(1000);
currency.ConvertUAHToUSD(5000);
currency.ConvertUAHToEUR(10000);

