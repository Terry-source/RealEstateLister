var express = require('express');
var router = express.Router();

const suburbController = require('../controllers/suburbController');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', suburbController.index);

router.get('/new', ensureLoggedIn, suburbController.new);

router.get('/:id', suburbController.show);

router.post('/', ensureLoggedIn, suburbController.create);

module.exports = router;

