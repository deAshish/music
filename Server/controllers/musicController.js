const Music = require("../models/music");

exports.gets = (req, res, next) => {
  return res.status(200).json(Music.gets());
};

// exports.createMusic = (req, res, next) => {
//   const music = req.body.music;
//   const saveMusic = new Music(
//     null,
//     music.title,
//     music.url,
//     music.genre,
//     music.artist,
//     music.releaseDate
//   ).save();
//   res.status(201).json(savedMusic);
// };
// exports.updateMusic = (req, res, next) => {
//   const music = req.body;
//   const updatedMusic = new Music(
//     req.params.songId,
//     music.title,
//     music.url,
//     music.genre,
//     music.artist,
//     music.releaseDate
//   ).update();
//   res.status(200).json(updatedBook);
// };

exports.findMusicById = (req, res, next) => {
  res.status(200).json(Music.findMusicById(req.params.songId));
};

exports.deleteMusicById = (req, res, next) => {
  return res.status(200).json(Music.remove(req.params.songId));
};
