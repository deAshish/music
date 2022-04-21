const express = require("express");
const musicController = require("../controllers/musicController");

const router = express.Router();

router.get("/", musicController.gets);

router.get("/search", musicController.search);

router.get("/:songId", musicController.findMusicById);

router.delete("/:songId", musicController.deleteMusicById);

module.exports = router;
