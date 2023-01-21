const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let StudentDeatails = new Schema({
    FirstName: {
        type: String
    },
    LastName: {
        type: String
    },
    Phone: {
        type: String
    },
    Email: {
        type: String
    },
    Password: {
        type: String
    },
    HighestEducation: {
        type: String
    },
    NIC: {
        type: String
    },
    EnglishLevel: {
        type: String
    },
    WorkingStatus: {
        type: String
    },
    StudentID: {
        type: String
    },
});

module.exports = mongoose.model('studentDetails', StudentDeatails);