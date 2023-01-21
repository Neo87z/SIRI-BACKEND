const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let wallet = new Schema({
    WalletAddress: {
        type: String
    },
    LikeInteraction: {
        type: String
    },
    RetweetInteractions: {
        type: String
    },
    CommentInteractions: {
        type: String
    },
    Balance: {
        type: String
    },
    TotalRedeems: {
        type: String
    }
});

module.exports = mongoose.model('pop', wallet);