const express = require('express');
const app = express();
const router = express.Router();
const Currency = require('../convertation/compiler.js');


router.get('/', (req, res) => {
	let currency = new Currency();
	//Здесь я пытался каким-то образом вывести в браузер, но у меня не получилось :) позже доделаю.
	let jade = require('pug');
	let fn = jade.compileFile('./views/index.pug');
	let html = currency.ConvertUAHToEUR(1000);
	
  res.render('index', { title: 'Hey', message: html} );
});

router.get('/ConvertBoth', (req, res) => {
	let currency = new Currency();
	let c = currency.UaUSConvertBoth(1000);;
	
  res.render('index', { title: 'It`s another page'} );
});


module.exports = router;
