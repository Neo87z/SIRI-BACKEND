const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CourseDetails = new Schema({
    Vedioname: {
        type: String
    },
    SectionNumber: {
        type: String
    },
    CourseID: {
        type: String
    },
    VedioURL: {
        type: String
    },
});

module.exports = mongoose.model('vediodetails', CourseDetails);