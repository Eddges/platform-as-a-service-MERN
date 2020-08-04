const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    tasks : [{
        type : String
    }]
})

module.exports = mongoose.model('User', userSchema)