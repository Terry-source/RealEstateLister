const User = require("../models/user");
const Property = require("../models/property");

async function user_login(req, res) {
  res.render("/");
}

async function user_logout(req, res) {
  res.render("/");
}

async function user_profile(req, res) {
  try {
    const currentUser = req.user;
    const creator = await User.findById(currentUser._id).populate("properties");

    res.render("users/profile", {
      title: "Profile",
      creator,
      title: creator.name,
      properties: creator.properties,
      currentUser,
      avatar: creator.avatar,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

async function index(req, res) {
  try {
    const users = await User.find({}).populate("properties");

    res.render("users/index", {
      title: "All Users",
      users,
      currentUser: req.user,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

async function show(req, res) {
  try {
    const creator = await User.findById(req.params.id).populate("properties");

    res.render("users/show", {
      creator,
      title: creator.name,
      properties: creator.properties,
      currentUser: req.user || {},
      avatar: creator.avatar,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

module.exports = {
  user_login,
  user_logout,
  user_profile,
  index,
  show,
};
