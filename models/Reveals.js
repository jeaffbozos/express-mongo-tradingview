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
},
attributes:{
    type: String
},
listedStatus:{
    type: String
}

})

const Reveals = mongoose.model('Reveal', RevealSchema);

module.exports = Reveals;
