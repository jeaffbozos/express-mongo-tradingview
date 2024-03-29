var express = require('express')
var path = require('path');
var bp = require('body-parser')
var app = express()
var fs = require('fs')
const { promisify } = require('util')
const connect_db = require('./connect_db')
const Products = require('./models/Products')
const Reveals = require('./models/Reveals')
const axios = require('axios');

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
var cors = require('cors')
app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({extended:true}))
connect_db()

app.set("view engine", "hbs");

/*app.get('/', (req, res) => {
    res.sendStatus(200)
}) */

app.get('/search/username=:username', async (req, res) => {
    const username = req.params.username;
    const bunniesUrl = `https://prod-api.kosetto.com/search/users?username=${username}`;

    const headers = {
        "accept": "application/json",
        "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHhlMDE2ZmZmNTc3OGIyMTY2MmRhZjA5YzhjNTEzNjc4ZmY1Y2NmNjQxIiwiaWF0IjoxNjkyMTYzODMxLCJleHAiOjE2OTQ3NTU4MzF9.v5sA2sSt_omoVZKf5uAi-i_pWpQmIAEayazAbPHbIOM",
        "content-type": "application/json",
        "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\""
    };

    try {
        const response = await axios.get(bunniesUrl, { headers });

        // Forward the response from bunnies.com to the client
        res.json(response.data);
    } catch (error) {
        // Handle any errors that occur during the request
        res.status(500).json({ error: 'An error occurred while fetching data from bunnies.com' });
    }
});


app.get('/getData', async (req, res) => {
    await Products.find()
    .then(products=>{
        res.json(products)
    })
    /*
    await Products.remove().then(() => {
        console.log("Data deleted")
    }) */
    
})

app.get('/deleteData', async (req, res) => {
    await Products.deleteMany()
    .then(() => {
        res.sendStatus(200)
    })
    
})

app.get('/deleteReveal', async (req, res) => {
    await Reveals.deleteMany()
    .then(() => {
        res.sendStatus(200)
    })
    
})


app.post('/postData', async (req, res) => {
    const ticker = req.body.ticker
    const timeframe = req.body.timeframe
    const status = req.body.status
    const closePrice = req.body.closePrice

    const product = new Products({
        "ticker":ticker,
        "timeframe":timeframe,
        "status":status,
        "closePrice":closePrice,
    })
    await product.save()
    res.sendStatus(200)
    
  });

app.post('/revealData', async (req, res) => {
    const mint = req.body.mint
    const price = req.body.price
    const image = req.body.imageURL
    const attributes = req.body.attributes
    const listed = req.body.listedStatus

    const reveal = new Reveals({
        "mint":mint,
        "price":price,
        "imageURL":image,
        "attributes":attributes,
        "listedStatus":listed,
    })
    await reveal.save()
    res.sendStatus(200)
    
  });

app.get('/fetchReveal', async (req, res) => {
    await Reveals.find()
    .then(reveal=>{
        res.json(reveal)
    })
    /*
    await Products.remove().then(() => {
        console.log("Data deleted")
    }) */
    
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running on port 5000')
})
