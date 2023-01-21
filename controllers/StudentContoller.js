const express = require('express');
const router = express.Router();
var _ = require("underscore");
const APITWIe = require("twitter-api-sdk")
let CourseData = require('../models/courseDetails');
let EnrollCouse = require('../models/enrollCourse');
let TweetData = require('../models/tweedData');
let StudentDta = require('../models/StudentDetails');
let DataOnline = require('../models/OnlineLibrary');
var rn = require('random-number');
const jwt = require('jsonwebtoken')

module.exports = function () {

    router.post('/add-student', function (req, res) {
        let StudentDtaJSON = new StudentDta(req.body);
        console.log(req.body)
        StudentDtaJSON.save()
            .then(Course => {
                var data = {
                    Status: "Sucess",
                    Message: "Student Sucessfully Enrolled"
                }
                res.status(201).send(data);
            }).catch(err => {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            });

    })

    router.post('/add-data-Online', function (req, res) {
        let DataOnlineJSON = new DataOnline(req.body);
        console.log(req.body)
        DataOnlineJSON.save()
            .then(Course => {
                var data = {
                    Status: "Sucess",
                    Message: "Student Sucessfully Enrolled"
                }
                res.status(201).send(data);
            }).catch(err => {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            });

    })




    router.post('/student-login', function (req, res) {
        var found = false;
        const Data = []
        var token = "";
        console.log(req.body)
        StudentDta.find(function (err, data) {
            if (!err) {
                data.forEach(element => {
                    console.log(element)
                    if (element.Email == req.body.Email) {
                        console.log("here")
                        if (element.Password == req.body.Password) {
                            const ID = parseInt(req.body.EmpoyeeID)
                            token = jwt.sign({ ID }, "jwtSecret", {
                                expiresIn: 30000,
                            })
                            console.log(token, "Token Dataaaaa")
                            console.log("here2")
                            Data.push(element)
                            found = true;

                        }

                    }

                })
                if (found == false) {
                    var data = {
                        Status: "Fail",
                        Message: "Unauthorized Acess"
                    }
                    res.status(200).send(data);

                } else {
                    var dataX = {
                        FinalData: Data,
                        token: token,
                        Status: "Pass",
                        Message: "Authorized Acess"
                    }
                    res.status(200).send(dataX);
                }




            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })

    const verifyJWT = (req, res, next) => {
        const token = req.headers["x-access-token"]



        console.log(token, 'lol')

        if (!token) {
            res.json({
                auth: false,
                Login: false,
                Message: "Authenication 1Failed"
            });
        } else {
            jwt.verify(token, "jwtSecret", (err, decoded) => {
                if (err) {
                    res.json({
                        auth: false,
                        Login: false,
                        Message: "Authenication Failed"
                    });
                } else {
                    req.userID = decoded.id;
                    next();

                }
            })

        }
    }



    router.get('/Authenicate', verifyJWT, function (req, res) {


        res.json({
            Login: true,
            auth: true,
            Message: "User Authenicated"
        });

    })






    router.post('/get-all-data-online', function (req, res) {
        var found = false;
        const Data = []
        console.log(req.body)
        DataOnline.find(function (err, data) {
            if (!err) {

                res.status(200).send(data);





            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })
    router.post('/get-all-students', function (req, res) {
        var found = false;
        const Data = []
        console.log(req.body)
        StudentDta.find(function (err, data) {
            if (!err) {

                res.status(200).send(data);





            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })


    router.post('/gte-student-by-ID', function (req, res) {
        var found = false;
        const Data = []
        console.log(req.body)
        StudentDta.find(function (err, data) {
            if (!err) {
                data.forEach(element => {
                    console.log(element)
                    if (element.StudentID == req.body._id) {

                        console.log("here2")
                        Data.push(element)
                        found = true;


                    }

                })
                if (found == false) {
                    var data = {
                        Status: "Fail",
                        Message: "Unauthorized Acess"
                    }
                    res.status(200).send(data);

                } else {
                    res.status(200).send(Data);
                }




            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })



    return router;
}