/*=======================================================
 Author: [Sourav Malik] (sr343164@dal.ca)
========================================================= */

const express = require('express');
const userController = require('../../controllers/AdminUserController');

const router = express.Router();

/** Register end points for Users API */
router.route("/").get(userController.list).post(userController.create);

router
    .route("/:userId")
    .get(userController.get)
    .put(userController.replace)
    .delete(userController.remove);

module.exports = router;
