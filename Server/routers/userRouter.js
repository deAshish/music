const userController = require("../controllers/userController");
const express = require("express");

const router = express.Router();

router.get("/", userController.gets);
router.get("/:userId", userController.getById);
router.post("/authenticate", userController.getAuthenticatedUser);
// router.post("/", userController.createUser);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.removeUser);

router.post("/enqueueSong", userController.enqueueSong);
router.post("/dequeueSong", userController.dequeueSong);

module.exports = router;
