const Music = require("../models/music");

exports.gets = (req, res, next) => {
  return res.status(200).json(Music.gets());
};

exports.search = (req, res, next) => {
  // console.log(req.params.sessionId);
  return res.status(200).json(Music.search(req.query.title));
};

exports.findMusicById = (req, res, next) => {
  res.status(200).json(Music.findMusicById(req.params.songId));
};

exports.deleteMusicById = (req, res, next) => {
  return res.status(200).json(Music.remove(req.params.songId));
};
