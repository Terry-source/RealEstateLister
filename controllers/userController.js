const User = require('../models/user');
const Property = require('../models/property');

async function user_login(req, res) {
  res.render('/');
}

async function user_logout(req, res) {
  res.render('/');
}

async function user_profile(req, res) {
  try {
    const user = await User.findById(req.params.id);

    const properties = await Property.find({ owner: user._id });
    res.render('users/profile', { user, properties });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
};

module.exports = {
  user_login,
  user_logout,
  user_profile,
};
