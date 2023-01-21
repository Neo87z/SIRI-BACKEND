const express = require('express');
const router = express.Router();
var _ = require("underscore");
const APITWIe = require("twitter-api-sdk")
let CourseData = require('../models/courseDetails');
let EnrollCouse = require('../models/enrollCourse');
let SectionAddd = require('../models/SectionDetails');
let VedioAddd = require('../models/courseVedio');
let TweetData = require('../models/tweedData');
const jwt = require('jsonwebtoken')

module.exports = function () {

    router.post('/enroll-course', function (req, res) {
        let EnrollCouseJSON = new EnrollCouse(req.body);
        EnrollCouseJSON.save()
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

    router.post('/add-section', function (req, res) {
        let SectionAdddJSON = new SectionAddd(req.body);
        SectionAdddJSON.save()
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
    router.post('/add-vedio', function (req, res) {
        let VedioAdddJSON = new VedioAddd(req.body);
        VedioAdddJSON.save()
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


    router.get('/get-courses-per-catergory-count', function (req, res) {
        console.log(req.body.CourseFilterID, "ID")
        var found = false;
        const Data = [];
        var CAAP = 0;
        var FC = 0;
        var IBSL = 0;
        var ORPP = 0;
        var OH = 0;
        var PXQP = 0;
        var HN = 0;
        var FN = 0;

        CourseData.find(function (err, data) {
            if (!err) {

                data.forEach(element => {
                    if (element.Language == "CAAP") {
                        CAAP++;

                    }
                    if (element.Language == "FC") {
                        FC++;

                    }
                    if (element.Language == "IBSL") {
                        IBSL++;

                    }
                    if (element.Language == "OH") {
                        OH++;

                    }
                    if (element.Language == "PXQP") {
                        PXQP++;

                    }
                    if (element.Language == "HN") {
                        HN++;

                    }
                    if (element.Language == "FN") {
                        FN++;

                    }
                    if (element.Language == "ORPP") {
                        ORPP++;

                    }


                })
                var FinalData = {
                    CAAPCount: CAAP,
                    FCCount: FC,
                    IBSLCount: IBSL,
                    OHCount: OH,
                    PXQPCount: PXQP,
                    HNCount: HN,
                    FNCount: FN,
                    ORPPCount: ORPP,
                   
                }
                res.status(200).send(FinalData);


            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })

    router.post('/get-courses-per-catergory', function (req, res) {
        console.log(req.body.CourseFilterID, "ID")
        var found = false;
        const Data = []
        CourseData.find(function (err, data) {
            if (!err) {

                data.forEach(element => {
                    if (element.Language == req.body.CourseFilterID) {
                        console.log(element)
                        Data.push(element)

                    }

                })
                res.status(200).send(Data);


            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })

    router.post('/get-section-per-seubject', function (req, res) {
        console.log(req.body.subjectID)
        var found = false;
        const Data = []
        SectionAddd.find(function (err, data) {
            if (!err) {
                data.forEach(element => {
                    if (element.CourseID == req.body.subjectID) {

                        Data.push(element)


                    }

                })
                res.status(200).send(Data);



            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })


    router.post('/get-vedio-per-seubject', function (req, res) {
        console.log(req.body.subjectID)
        var found = false;
        const Data = []
        VedioAddd.find(function (err, data) {
            if (!err) {
                data.forEach(element => {
                    if (element.CourseID == req.body.subjectID) {

                        Data.push(element)


                    }

                })
                res.status(200).send(Data);



            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })

    router.post('/get-enrollmets-per-subject', function (req, res) {
        console.log(req.body.subjectID)
        var found = false;
        const Data = []
        EnrollCouse.find(function (err, data) {
            if (!err) {
                data.forEach(element => {
                    if (element.CourseID == req.body.subjectID) {
                        if (element.EnrollStatus == "Enrolled") {
                            Data.push(element)
                        }

                    }

                })
                res.status(200).send(Data);



            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })

    router.post('/get-enrollmets-per-subject-pending', function (req, res) {
        console.log(req.body.subjectID)
        var found = false;
        const Data = []
        EnrollCouse.find(function (err, data) {
            if (!err) {
                data.forEach(element => {
                    if (element.CourseID == req.body.subjectID) {
                        if (element.EnrollStatus == "Pending") {
                            Data.push(element)
                        }

                    }

                })
                res.status(200).send(Data);



            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })


    router.post('/get-enrolled-Status', function (req, res) {
        console.log(req.body)
        var found = false;
        const Data = []
        EnrollCouse.find(function (err, data) {
            if (!err) {
                data.forEach(element => {
                    if (element.StudenTID == req.body.StudentID) {
                        console.log("here")
                        if (element.CourseID == req.body.CourseID) {
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


    router.post('/get-Student-Ennrollemts', function (req, res) {
        console.log(req.body.StudentID, "Enrolllll")
        var found = false;
        const Data = []
        EnrollCouse.find(function (err, data) {
            if (!err) {
                data.forEach(element => {
                    console.log(data)
                    if (element.StudenTID == req.body.StudentID) {
                        found = true
                        console.log("here2")
                        Data.push(element)


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



    router.post('/get-enrollmets-per-subject-completed', function (req, res) {
        console.log(req.body.subjectID)
        var found = false;
        const Data = []
        EnrollCouse.find(function (err, data) {
            if (!err) {
                data.forEach(element => {
                    if (element.CourseID == req.body.subjectID) {
                        if (element.EnrollStatus == "Completed") {
                            Data.push(element)
                        }

                    }

                })
                res.status(200).send(Data);



            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })




    router.post('/get-enrollmets-per-subject-declined', function (req, res) {
        console.log(req.body.subjectID)
        var found = false;
        const Data = []
        EnrollCouse.find(function (err, data) {
            if (!err) {
                data.forEach(element => {
                    if (element.CourseID == req.body.subjectID) {
                        if (element.EnrollStatus == "Declined") {
                            Data.push(element)
                        }

                    }

                })
                res.status(200).send(Data);



            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })




    router.post('/get-Tweets', async function (req, res) {

        console.log("hereeeeeeee")
        const client = new APITWIe.Client("AAAAAAAAAAAAAAAAAAAAAHV8kAEAAAAA3yIPVrP7tQg20bjEmDGlx1AqL9o%3DigI4uGnw2QGmIATLYQ68cS78AJTx4qXlrnJZcvqIFdoycUkyt2");
        const response = await client.tweets.usersIdTweets("1600089346358525952");
        console.log("response", response["data"][0]["id"]);
        let TweetDataJSON = new TweetData();
        TweetDataJSON.TweedID = response["data"][0]["id"];
        try {
            TweetData.updateOne({ _id: "638f39811bc2e147f4be1233" }, {
                TweedID: response["data"][0]["id"]
            }, function (err, docs) {
                if (!err) {
                    var data = {
                        Tweet: TweetDataJSON,
                        Status: "Sucess",
                        Message: "User Data Updated"
                    }
                    res.status(200).send(data);
                } else {
                    var data = {
                        Status: "Fail",
                        Message: "Unexpected Error PLease Contact System Admin"
                    }
                    res.status(200).send(data);
                }
            })
        } catch {
            var data = {
                Status: "Fail",
                Message: "Unexpected Error PLease Contact System Admin"
            }
            res.status(200).send(data);

        }

    })



    router.post('/add-course', function (req, res) {
        let CourseDataJSON = new CourseData(req.body);
        CourseDataJSON.save()
            .then(Course => {
                var data = {
                    Status: "Sucess",
                    Message: "Course Addedd Sucessfully"
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

    router.get('/get-courses', function (req, res) {
        var found = false;
        CourseData.find(function (err, data) {
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





    router.post('/check-enrolment-staus', function (req, res) {
        console.log(req.body.StudentID, "ID")
        var found = false;
        var Start = 1;
        const StudentEnrolledCOurses = []
        const AllCourses = []
        const FinalCourseList = []

        CourseData.find(function (err, data) {
            if (!err) {
                data.forEach(element2 => {
                    AllCourses.push(element2._id.toString())



                })
                EnrollCouse.find(function (err, data2) {

                    if (!err) {

                        data2.forEach(element2 => {


                            if (element2.StudenTID == req.body.StudentID) {
                                StudentEnrolledCOurses.push(element2.CourseID)



                            }

                        })

                        console.log(AllCourses)
                        console.log(StudentEnrolledCOurses)
                        array1 = AllCourses.filter(val => !StudentEnrolledCOurses.includes(val));
                        console.log(array1, "To Addd")

                        CourseData.find(function (err, data3) {

                            if (!err) {
                                x = 0
                                array1.forEach(element2 => {
                                    console.log("here")
                                    console.log(element2)

                                    data3.forEach(element24 => {
                                        if (element24._id.toString() == element2.toString()) {
                                            FinalCourseList.push(element24)
                                        }


                                    })
                                    x = x + 1

                                })

                                console.log("done")
                                console.log(FinalCourseList)
                                res.status(200).send(FinalCourseList);

                            } else {
                                var data = {
                                    Status: "Fail",
                                    Message: "Unexpected Error PLease Contact System Admin"
                                }
                                res.status(200).send(data);
                            }
                        })


                    } else {
                        var data = {
                            Status: "Fail",
                            Message: "Unexpected Error PLease Contact System Admin"
                        }
                        res.status(200).send(data);
                    }
                })



            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })



    router.put('/update_section', function (req, res) {
        console.log(req.body)
        try {

            SectionAddd.updateOne({ _id: req.body.ID }, {
                SectionName: req.body.SectionName, SectionNumber: req.body.SectionNumber, CourseID: req.body.CourseID,
            }, function (err, docs) {
                if (!err) {
                    var data = {
                        Status: "Sucess",
                        Message: "User Data Updated"
                    }
                    res.status(200).send(data);
                } else {
                    var data = {
                        Status: "Fail",
                        Message: "Unexpected Error PLease Contact System Admin"
                    }
                    res.status(200).send(data);
                }
            })
        } catch {
            var data = {
                Status: "Fail",
                Message: "Unexpected Error PLease Contact System Admin"
            }
            res.status(200).send(data);

        }
    })

    router.put('/update_vedio', function (req, res) {
        console.log(req.body)
        try {

            VedioAddd.updateOne({ _id: req.body.ID }, {
                Vedioname: req.body.Vedioname, SectionNumber: req.body.SectionNumber, CourseID: req.body.CourseID, VedioURL: req.body.VedioURL
            }, function (err, docs) {
                if (!err) {
                    var data = {
                        Status: "Sucess",
                        Message: "User Data Updated"
                    }
                    res.status(200).send(data);
                } else {
                    var data = {
                        Status: "Fail",
                        Message: "Unexpected Error PLease Contact System Admin"
                    }
                    res.status(200).send(data);
                }
            })
        } catch {
            var data = {
                Status: "Fail",
                Message: "Unexpected Error PLease Contact System Admin"
            }
            res.status(200).send(data);

        }
    })


    router.put('/update_enrollment', function (req, res) {
        console.log(req.body)
        try {

            EnrollCouse.updateOne({ _id: req.body.ID }, {
                CourseID: req.body.CourseID, StudentName: req.body.StudentName, StudenTID: req.body.StudenTID, EnrollStatus: req.body.EnrollStatus, EnrollDate: req.body.EnrollDate, CompletedDate: req.body.CompletedDate,
            }, function (err, docs) {
                if (!err) {
                    var data = {
                        Status: "Sucess",
                        Message: "User Data Updated"
                    }
                    res.status(200).send(data);
                } else {
                    var data = {
                        Status: "Fail",
                        Message: "Unexpected Error PLease Contact System Admin"
                    }
                    res.status(200).send(data);
                }
            })
        } catch {
            var data = {
                Status: "Fail",
                Message: "Unexpected Error PLease Contact System Admin"
            }
            res.status(200).send(data);

        }
    })


    router.put('/update-Course', function (req, res) {
        console.log(req.body)
        try {

            CourseData.updateOne({ _id: req.body.ID }, {
                CourseDetails: req.body.CourseDetails, Author: req.body.Author, BriefDescription: req.body.BriefDescription, CourseOvervview: req.body.CourseOvervview, Lessons: req.body.Lessons, Language: req.body.Language,
            }, function (err, docs) {
                if (!err) {
                    var data = {
                        Status: "Sucess",
                        Message: "User Data Updated"
                    }
                    res.status(200).send(data);
                } else {
                    var data = {
                        Status: "Fail",
                        Message: "Unexpected Error PLease Contact System Admin"
                    }
                    res.status(200).send(data);
                }
            })
        } catch {
            var data = {
                Status: "Fail",
                Message: "Unexpected Error PLease Contact System Admin"
            }
            res.status(200).send(data);

        }
    })

    router.put('/delete-course', function (req, res) {
        console.log(req.body.ID)
        try {
            CourseData.deleteOne({ _id: req.body.ID }, function (err, docs) {
                if (!err) {
                    var data = {
                        Status: "Sucess",
                        Message: "Course Deleted"
                    }
                    res.status(200).send(data);
                } else {
                    var data = {
                        Status: "Fail",
                        Message: "Unexpected Error PLease Contact System Admin"
                    }
                    res.status(200).send(data);
                }
            })
        } catch {
            var data = {
                Status: "Fail",
                Message: "Unexpected Error PLease Contact System Admin"
            }
            res.status(200).send(data);

        }
    })


    router.put('/delete-section', function (req, res) {
        console.log(req.body.ID)
        try {
            SectionAddd.deleteOne({ _id: req.body.ID }, function (err, docs) {
                if (!err) {
                    var data = {
                        Status: "Sucess",
                        Message: "Course Deleted"
                    }
                    res.status(200).send(data);
                } else {
                    var data = {
                        Status: "Fail",
                        Message: "Unexpected Error PLease Contact System Admin"
                    }
                    res.status(200).send(data);
                }
            })
        } catch {
            var data = {
                Status: "Fail",
                Message: "Unexpected Error PLease Contact System Admin"
            }
            res.status(200).send(data);

        }
    })



    router.put('/delete-vedio', function (req, res) {
        console.log(req.body.ID)
        try {
            VedioAddd.deleteOne({ _id: req.body.ID }, function (err, docs) {
                if (!err) {
                    var data = {
                        Status: "Sucess",
                        Message: "Course Deleted"
                    }
                    res.status(200).send(data);
                } else {
                    var data = {
                        Status: "Fail",
                        Message: "Unexpected Error PLease Contact System Admin"
                    }
                    res.status(200).send(data);
                }
            })
        } catch {
            var data = {
                Status: "Fail",
                Message: "Unexpected Error PLease Contact System Admin"
            }
            res.status(200).send(data);

        }
    })








    router.put('/delete-enrollment', function (req, res) {
        console.log(req.body.ID)
        try {
            EnrollCouse.deleteOne({ _id: req.body.ID }, function (err, docs) {
                if (!err) {
                    var data = {
                        Status: "Sucess",
                        Message: "Course Deleted"
                    }
                    res.status(200).send(data);
                } else {
                    var data = {
                        Status: "Fail",
                        Message: "Unexpected Error PLease Contact System Admin"
                    }
                    res.status(200).send(data);
                }
            })
        } catch {
            var data = {
                Status: "Fail",
                Message: "Unexpected Error PLease Contact System Admin"
            }
            res.status(200).send(data);

        }
    })








    return router;
}