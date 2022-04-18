/*=======================================================
 Author: [Abhishek Pareshbhai Pethani] (ab823206@dal.ca)
========================================================= */
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const router = express.Router()
router.use(bodyParser.json());

const reviews = require('../../models/courseReview')

router.get("/:courseName", (req, res) => { 
    // fetch all the review for specified course from the database
    reviews.find({courseName: req.params.courseName}).exec().then(result => {
        if(! result.length) {
            return res.status(404).json({
                message: "No reviews available for " + req.params.courseName,
                success: false,
            })    
        }
        return res.status(200).json({
            message: "Reviews for the course " + req.params.courseName + " are retrieved successfully!",
            success: true,
            reviews: result
        })
    }).catch(error => {
        console.log(error)
        return res.status(500).json({
            message:"Internal server errors!!", 
            success:"false"
        })
    })
})

router.post("/add-review", (req, res) => {
    // extract review's data from request's body
    const courseName = req.body.courseName
    const userName = req.body.userName
    const stars = req.body.stars
    const description = req.body.description
    // create object of reviews model
    const review = new reviews({
        _id: new mongoose.Types.ObjectId(),
        courseName,
        userName,
        stars,
        description
    }) 
    // save the review in database
    review.save().then(result => {
        return res.status(201).json({
            message: "Review added for the course " + courseName + " in database!",
            success: true,
        })
    }).catch(error => {
        console.log(error)
        return res.status(500).json({
            message:"Internal server errors!!", 
            success:"false"
        })
    })
})

router.delete('/delete-review/:id', (req, res) => {
    // delete specified review 
    reviews.findByIdAndDelete(req.params.id).then((review) => {
        if(!review){
            return res.status(404).json({
                message: "Review is not available",
                success: false
            })
        }
        return res.status(200).json({
            message: 'Reviews is deleted permenently!',
            success: 'true'
        })
    }).catch(error => {
        console.log(error)
        return res.status(500).json({
            message:"Internal server errors!!", 
            success:"false"
        })
    })
})

module.exports = router