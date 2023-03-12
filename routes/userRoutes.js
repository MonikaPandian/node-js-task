const express = require("express");
const { loginController, registerController, updateController, deleteController } = require("../controllers/userController");

// router object
const router = express.Router();

// login route
router.post("/login", loginController);

// register route
router.post("/register", registerController);

// update route
router.put("/:userId", updateController);

// delete route
router.delete("/:userId", deleteController);

module.exports = router;