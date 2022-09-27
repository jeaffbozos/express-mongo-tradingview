const mongoose = require('mongoose')
 function connect (){

    const uri = 'mongodb+srv://jeaff:uFmPbInum93Pdh75@cluster0.mg3i8.mongodb.net/?retryWrites=true&w=majority'
    try{
         mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
        const connection = mongoose.connection;
        connection.once('open', () => {
        console.log("MongoDB database connection established successfully");
        })
    }catch(e){
        console.log(e)
    }
}

module.exports = connect
