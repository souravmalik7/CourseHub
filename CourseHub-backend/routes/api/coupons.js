/*=======================================================
 Author: [Ridampreet Singh Jaggi] [rd285404@dal.ca]
========================================================= */
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
var coupon = require("../../models/couponModel");

router.get("/coupons", (req, res) => {
  coupon
    .find()
    .exec()
    .then(result => {
      if (coupon || coupon.length) {
        return res.status(200).json({
          message: "Coupons retrived retrived!!",
          success: true,
          users: result
        });
      }
    })
    .catch(err => {
      console.log(err => {
        return res.status(500).json({
          message: "Internal server error",
          success: false
        });
      });
    });
});


router.get("/:couponcode", (req, res) => {
  coupon
    .find({couponCode: req.params.couponcode})
    .exec()
    .then(result => {
      if (result || result.length) {
        return res.status(200).json({
          message: "Coupon retrived!!",
          success: true,
          coupon: result
        });
      }
    })
    .catch(err => {
      console.log(err => {
        return res.status(500).json({
          message: "Internal server error",
          success: false
        });
      });
    });
});


router.post("/add", (req, res) => {
  var couponCode = req.body.name;
  var value = req.body.value;
  var src = req.body.src;

  const newUser = new coupon({
    couponCode,
    _id: new mongoose.Types.ObjectId(),
    value,
    src
  });
  newUser
    .save()
    .then(result => {
      return res.status(201).json({
        message: "Coupon created created",
        success: true
      });
    })
    .catch(err => {
      console.log(err => {
        return res.status(500).json({
          message: "Internal server error",
          success: false
        });
      });
    });
});
router.delete("/coupons/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingCoupon = await coupon.findByIdAndRemove(id).exec();
    const message = existingCoupon ? existingCoupon : { error: "coupon does not exist" };
    res.status(200).send(message);
  } catch (error) {
    next(error);
  }
});
router.put("/coupons/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    if (!payload) {
      res.status(400).send({ error: "missing payload" });
    }
    const existingCoupon = await coupon.findByIdAndUpdate(id, {
      couponCode: payload.couponCode,
      value: payload.value,
    }).exec();

    const message = existingCoupon ? existingCoupon : { error: "coupon does not exist" };
    res.status(200).send(message);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
