const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RevealSchema = new Schema({
mint:{
    type: String,
},
price: {
    type: String,
},
imageURL:{
    type: String,
}

})

const Products = mongoose.model('Reveal', RevealSchema);

module.exports = Reveals;
