const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CourseDetails = new Schema({
    CourseDetails: {
        type: String
    },
    Author: {
        type: String
    },
    BriefDescription: {
        type: String
    },
    CourseOvervview: {
        type: String
    },
    Lessons: {
        type: String
    },
    Language: {
        type: String
    },
});

module.exports = mongoose.model('coursedetails', CourseDetails);