/*=======================================================
 Author: [Aditya Bakshi] (aditya.bakshi@dal.ca)
========================================================= */

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const router = express.Router()
router.use(bodyParser.json());

const courses = require('../../models/courseDetails');

router.get("/", (req, res) => { 
    // fetch all courses from the database
    courses.find({}).exec().then(result => {
        if(! result.length) {
            return res.status(404).json({
                message: "No courses found",
                success: false,
            })    
        }
        return res.status(200).json({
            message: "Courses retrieved successfully!",
            success: true,
            courses: result
        })
    }).catch(error => {
        console.log(error)
        return res.status(500).json({
            message:"Internal server errors!!", 
            success:"false"
        })
    })
});

router.get("/:courseName", (req, res) => { 
    // fetch specified course from the database
    courses.find({courseName: req.params.courseName}).exec().then(result => {
        if(! result.length) {
            return res.status(404).json({
                message: "No course available for " + req.params.courseName,
                success: false,
            })    
        }
        return res.status(200).json({
            message: "Course retrieved successfully!",
            success: true,
            course: result
        })
    }).catch(error => {
        console.log(error)
        return res.status(500).json({
            message:"Internal server errors!!", 
            success:"false"
        })
    })
})

router.post("/adduser", (req, res) => {
    const purchasedBy = req.body.userName
    const courseName = req.body.courseName

    courses.updateOne({ courseName: courseName }, {
        $addToSet: {
            purchasedBy: purchasedBy
        }
    }, { safe: true, upsert: true }, function (err) {
        if (err) {
            console.log(err)
        }
        else {
            res.status(200).json('User added to course')
        }

    })
})

module.exports = router;