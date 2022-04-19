const express = require("express");
const musicController = require("../controllers/musicController");

const router = express.Router();

router.get("/", musicController.gets);

router.get("/:songId", musicController.findMusicById);

// router.post("/", musicController.createMusic);

// router.post("/:songId", musicController.updateMusic);

router.delete("/:songId", musicController.deleteMusicById);

module.exports = router;
