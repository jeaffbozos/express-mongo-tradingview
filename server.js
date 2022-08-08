var express = require('express')
var path = require('path');
var bp = require('body-parser')
var app = express()
var fs = require('fs')
const { promisify } = require('util')
const connect_db = require('./connect_db')
const Products = require('./models/Products')

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
var cors = require('cors')
app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({extended:true}))
connect_db()

app.set("view engine", "hbs");

app.get('/', (req, res) => {
    res.sendStatus(200)
})

app.get('/getData', async (req, res) => {
    await Products.find()
    .then(products=>{
        res.json(products)
    })

    await Products.remove().then(() => {
        console.log("Data deleted")
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running on port 5000')
})