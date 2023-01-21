const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CourseDetails = new Schema({
    SectionName: {
        type: String
    },
    SectionNumber: {
        type: String
    },
    CourseID: {
        type: String
    },
});

module.exports = mongoose.model('sectiondetails', CourseDetails);