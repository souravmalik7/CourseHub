/*=======================================================
 Author: [Ridampreet Singh Jaggi] [rd285404@dal.ca]
========================================================= */
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
var users = require("../../models/usersModel");

router.get("/users", (req, res) => {
  users
    .find()
    .exec()
    .then(result => {
      if (users || users.length) {
        return res.status(200).json({
          message: "Users retrived!!",
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

router.delete("/delete", (req, res) => {
  var query = { email: req.body.currentUser };
  console.log(req.body.currentUser);
  users
    .deleteOne(query)
    .then(result => {
      if (users || users.length) {
        return res.status(200).json({
          message: "Users retrived!!",
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

router.put("/update", (req, res) => {
  n_password = req.body.password;

  console.log(req.body.currentUser, "&&&&&&&&");
  const filter = { email: req.body.currentUser };
  const updateDoc = {
    $set: {
      password: n_password
    }
  };
  users
    .updateOne(filter, updateDoc)
    .then(result => {
      if (users || users.length) {
        return res.status(200).json({
          message: "Users retrived!!",
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
router.post("/add", (req, res) => {
  var email = req.body.inputEmail;
  var firstName = req.body.inputName;
  var password = req.body.inputPassword;
  var lastName = req.body.inputLName;
  var answer = req.body.inputAnswer;
  console.log(email);
  const newUser = new users({
    _id: new mongoose.Types.ObjectId(),
    email,
    firstName,
    password,
    lastName,
    answer
  });
  newUser
    .save()
    .then(result => {
      return res.status(201).json({
        message: "User created",
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

router.get("/:id", (req, res) => {
  users
    .find({ email: req.params.id })
    .exec()
    .then(result => {
      if (users || users.length) {
        return res.status(200).json({
          message: "Users retrived!!",
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

router.delete("/delete", (req, res) => {
  var query = { email: req.body.email };

  users
    .deleteOne(query)
    .then(result => {
      if (users || users.length) {
        return res.status(200).json({
          message: "Users retrived!!",
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

// router.put("update", (req, res) => {
//   var query = { id: req.body.id };

//   users
//     .deleteOne(query)
//     .then(result => {
//       if (users || users.length) {
//         return res.status(200).json({
//           message: "Users retrived!!",
//           success: true,
//           users: result
//         });
//       }
//     })
//     .catch(err => {
//       console.log(err => {
//         return res.status(500).json({
//           message: "Internal server error",
//           success: false
//         });
//       });
//     });
// });
module.exports = router;
