var express = require('express');
var router = express.Router();
const propertyController = require('../controllers/propertyController');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', propertyController.index);

router.get('/new', ensureLoggedIn, propertyController.new);

router.get('/:id', propertyController.show);

router.post('/', ensureLoggedIn, propertyController.create);

module.exports = router;
