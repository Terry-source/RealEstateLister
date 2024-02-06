var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController");

/* GET users listing. */
router.get("/", userController.index);

router.get("/:id", userController.show);

router.get("/profile", userController.user_profile);

module.exports = router;
