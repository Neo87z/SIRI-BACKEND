const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let bet = new Schema({
    Name: {
        type: String
    },
    URL: {
        type: String
    }
  

});

module.exports = mongoose.model('datamet', bet);