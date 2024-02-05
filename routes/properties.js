var express = require("express");
var router = express.Router();
const propertyController = require("../controllers/propertyController");
const ensureLoggedIn = require("../config/ensureLoggedIn");

router.get("/", propertyController.index);

router.get("/new", ensureLoggedIn, propertyController.new);

router.get("/:id", propertyController.show);

router.post("/", ensureLoggedIn, propertyController.create);

router.get("/:id/edit", ensureLoggedIn, propertyController.edit);

router.put("/:id", ensureLoggedIn, propertyController.update);

router.delete("/:id", ensureLoggedIn, propertyController.delete);

module.exports = router;
