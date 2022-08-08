const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
ticker:{
    type: String,
},
timeframe: {
    type: String,
},
status:{
    type: String,
},
closePrice:{
    type: String,
}

})

const Products = mongoose.model('Products', ProductsSchema);

module.exports = Products;