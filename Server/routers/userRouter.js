const userController = require("../controllers/userController");
const express = require("express");

const router = express.Router();

router.get("/", userController.gets);
router.get("/:userId", userController.getById);
router.post("/authenticate", userController.getAuthenticatedUser);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.removeUser);

router.post("/enqueueSong", userController.enqueueSong);
router.post("/dequeueSong", userController.dequeueSong);
router.get("/getSongs/:sessionId", userController.getSongs);

module.exports = router;
