// var Currency = function (us_currency) {
// 	this.us_currency = us_currency;

// };

// Currency.prototype.roundTwoDecimals = function(amount) {
// 	return Math.round(amount * 100) / 100;
// } 

// Currency.prototype.USToUa = function (currency) {

//  	console.log(this.roundTwoDecimals(currency * this.us_currency));

//  	return this;
//  };

//  Currency.prototype.UaToUS = function (currency) {

//  	console.log(this.roundTwoDecimals(currency / this.us_currency));
 	
//  	return this;
//  };
const compiler = require('../app');
const request = require('request');
const express = require('express');
const app = express();

function roundTwoDecimals (amount) {
	return Math.round(amount * 100) / 100;
}

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

class Currency {
 	constructor (us_currency) {
 		this.us_currency = us_currency;
 	}

 	UaUSConvertBoth(currencyUAH='100', currencyUSD='100') { 
 		request('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11', (error, res, body) =>  {
			if (!error && res.statusCode == 200) {
				this.body = body;
				let data = JSON.parse(body);
				setTimeout( () => {
					if ( isNumeric ( (currencyUAH && currencyUSD) ) ) {
						console.log('Congrats, now you have ' + (roundTwoDecimals(currencyUAH * data[data.length - 4].buy)) + ' ' +  'UAH');
						console.log('Congrats, now you have ' + (roundTwoDecimals(currencyUSD / data[data.length - 4].sale)) + ' ' +  'USD');
					
					} else {
						console.log('You must write only number');
					}
				
				}, 500);
			}
			else {
				console.warn(error);
			} 

		});
 	}


 	ConvertUAHToUSD (currency) {
 		request('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11', (error, res, body) =>  {
			if (!error && res.statusCode == 200) {
				this.body = body;
				let data = JSON.parse(body);
				console.log(roundTwoDecimals(currency / data[data.length - 4].sale));
			}
			else {
				console.warn(error);
			} 

		});
 	}

 	ConvertUAHToEUR (currency) {
		request('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11', (error, res, body) =>  {
			if (!error && res.statusCode == 200) {
				this.body = body;
				let data = JSON.parse(body);
				console.log('Today convertion UAH to EUR: ' + roundTwoDecimals(currency / data[data.length - 3].sale));			
			}
			else {
				console.warn(error);
			} 

		});

 	}
}

 module.exports = Currency;



 
