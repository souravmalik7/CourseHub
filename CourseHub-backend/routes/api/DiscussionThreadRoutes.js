/**
 * @Author  Jay Bipinchandra Patel
 * @Banner  B00886902
 * @NetID   jy439129
 * @EmailId jy439129@dal.ca
 */
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
 
const router = express.Router()
router.use(bodyParser.json());

const topicCollection = require('./../../models/DiscussionThreadTopic')
const commentCollection = require('./../../models/DiscussionThreadComment')

const app = require('../../app');
const { routes } = require('../../app');
const req = require('express/lib/request');
const res = require('express/lib/response');

router.get("/topics", async(req, res) => {
    topicCollection.find({}).exec().then(result => {
        return res.status(200).json({
            success: true,
            topics: result
        });
    }).catch(err => {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    });
});

router.get("/topic/:topicId", async(req, res) => {
    topicCollection.findOne({_id: req.params.topicId}).exec().then(result => {
        return res.status(200).json({
            success: true,
            topic: result
        });
    }).catch(err => {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    });
});

router.delete("/topic/:topicId", async(req, res) => {
    topicCollection.deleteOne({_id: req.params.topicId}).exec().then((result) => {
        commentCollection.deleteMany({topicId: req.params.topicId}).exec().then((result1) => {
        });
        return res.status(200).json({
            success: true,
            message: "topic deleted."
        });
    }).catch((error) => {
        return res.status(400).json({
            success: false,
            message: "Bad Request."
        });
    });
});

router.get("/comments/:topicId", async(req, res) => {
    commentCollection.find({topicId: req.params.topicId}).exec().then(result => {
        return res.status(200).json({
            success: true,
            comments: result
        });
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: "Bad Request."
        });
    });
});

router.delete("/comment/:commentId", async(req, res) => {
    commentCollection.deleteOne({_id: req.params.commentId}).exec().then((result) => {
        return res.status(200).json({
            success: true,
            message: "comment deleted."
        })
    }).catch((error) => {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Bad Request."
        })
    });
});

router.post("/topic", async(req, res) => {
    const topic = new topicCollection({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        topic: req.body.topic,
        description: req.body.description
    });
    topic.save().then(result => {
        return res.status(200).json({
            success: true,
        });
    }).catch(err => {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    });
});

router.post("/comment", async(req, res) => {
    const comment = new commentCollection({
        _id : new mongoose.Types.ObjectId(),
        topicId: new mongoose.Types.ObjectId(req.body.topicId),
        userId: req.body.userId,
        comment: req.body.comment
    });
    comment.save().then(result => {
        return res.status(200).json({
            success: true
        });
    }).catch(err => {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        })
    });
});

module.exports = router