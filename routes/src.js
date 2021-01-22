const routerx = require('express-promise-router');
const usuarioController = require('../controllers/UsuarioController');
const auth = require('../middlewares/auth');
const cheerio = require('cheerio')
const request = require('request-promise')
var cont = 0;
const fetch = require("node-fetch");

const fs = require('fs-extra');
const writeStream = fs.createWriteStream('quotes.csv');
const router = routerx();

var parar = setInterval(() => {
    init();
}, 60000)

var url = 'https://webhook.site/14693700-0cce-4ef4-9961-e927cf90c008';
var data={} //cargar los datos 

fetch(url, {
  method: 'POST', 
  body: JSON.stringify(data),
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));


async function init() {
    try {

        const $ = await request({
            uri: 'https://dweet.io/follow/thecore',
            transform: body => cheerio.load(body)
        });

        const websiteTitle = $('title');
        console.log('Title: ', websiteTitle.html());

        //consulta a la pagina, no es visible los datos 

        const quote = $('visual');
        console.log(quote.html());

        cont++;
        if (cont == 15) {
            clearInterval(parar);
        }

    } catch (e) {
        console.log(e);
    }
}


module.exports = router;