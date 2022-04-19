// const express = require("express");
const User = require("../models/user");

exports.gets = (req, res, next) => {
  return res.status(200).json(User.gets());
};

exports.getById = (req, res, next) => {
  res.status(200).json(User.getById(req.params.userId));
};

exports.getAuthenticatedUser = (req, res, next) => {
  return res
    .status(200)
    .json(User.getAuthenticatedUser(req.body.userName, req.body.password));
};

// exports.createUser = (req, res, next) => {
//   const user = new User(
//     req.body.userId == 0 ? User.getKey() : req.body.userId,
//     "",
//     req.body.firstName,
//     req.body.lastName,
//     req.body.userName,
//     req.body.password
//   );
//   user.save();
//   return res.status(200).json(user);
// };

exports.updateUser = (req, res, next) => {
  const user = new User(
    req.body.userId,
    "",
    req.body.firstName,
    req.body.lastName,
    req.body.userName,
    req.body.password
  );
  user.update();
  return res.status(200).json(user);
};

exports.removeUser = (req, res, next) => {
  return res.status(200).json(User.remove(req.params.userId));
};

exports.enqueueSong = (req, res, next) => {
  return res
    .status(200)
    .json(User.enqueueSong(req.body.sessionId, req.body.songId));
};

exports.dequeueSong = (req, res, next) => {
  return res
    .status(200)
    .json(User.dequeueSong(req.body.sessionId, req.body.songId));
};
