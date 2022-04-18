/*=======================================================
 Author: [Sourav Malik] (sr343164@dal.ca)
========================================================= */

const UserModel = require("../models/usersModel");

/** Provides list of users */
exports.list = async (req, res, next) => {
  try {
    const users = await UserModel.find().exec();
    const transformedUsers = users.map((user) => user.transform());
    res.json(transformedUsers);
  } catch (error) {
    next(error);
  }
};

/** Create user */
exports.create = async (req, res, next) => {
  try {
    const user = req.body;
    await UserModel.create(user);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

/** Get User by Id */
exports.get = async (req, res, next) => {
  const { userId } = req.params;
  const user = await UserModel.findById(userId).exec();
  if (user) {
    res.json(user.transform());
  } else {
    res.status(404).send({ error: "user does not exist" });
  }
};

/** Remove user by id */
exports.remove = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findByIdAndRemove(userId).exec();
    const message = user ? user.transform() : { error: "user does not exist" };
    res.status(200).send(message);
  } catch (error) {
    next(error);
  }
};

/** Update User details */
exports.replace = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const payload = req.body;

    if (!payload) {
      res.status(400).send({ error: "missing payload" });
    }

    const user = await UserModel.findByIdAndUpdate(userId, {
      firstName: payload.firstName,
      lastName: payload.lastName,
      coursePurchased: payload.coursePurchased,
    }).exec();

    const message = user ? user.transform() : { error: "user does not exist" };

    res.status(200).send(message);
  } catch (error) {
    next(error);
  }
};
