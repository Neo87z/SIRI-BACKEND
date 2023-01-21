const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let bet = new Schema({
    TweedID: {
        type: String
    },

 

});

module.exports = mongoose.model('tweetdata', bet);