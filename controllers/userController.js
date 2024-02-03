const User = require('../models/user');
const Property = require('../models/property');

function user_login (req, res) {
  res.render('users/login');
}