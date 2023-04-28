const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    email : {
        type : String,
        required : true,
    },
    token : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now,
        expires : 600,
        index: true
    }
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
