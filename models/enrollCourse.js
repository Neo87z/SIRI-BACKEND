const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CourseDetails = new Schema({
    CourseID: {
        type: String
    },
    StudentName: {
        type: String
    },
    StudenTID: {
        type: String
    },
    EnrollStatus: {
        type: String
    },
    EnrollDate: {
        type: String
    },
    CompletedDate: {
        type: String
    },
    CourseName: {
        type: String
    },
    
});

module.exports = mongoose.model('enrolldetail', CourseDetails);