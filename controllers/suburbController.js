const Property = require("../models/property");
const Suburb = require("../models/suburb");

// more efficient way to export multiple functions just to include exports. in front of each function
async function index(req, res) {
  try {
    const suburbs = await Suburb.find().populate('properties')
    res.render("suburbs/index", { title: "All Suburbs", suburbs });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

async function show(req, res) {
  try {
    const suburb = await Suburb.findById(req.params.id).populate("properties");
    res.render("suburbs/show", {
      title: suburb.name,
      properties: suburb.properties,
      suburb,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

async function newSuburb(req, res) {
  if (!req.user) {
    // If the user is not logged in, redirect to login page or handle accordingly
    return res.redirect("/login");
  }
  try {
    const suburbs = await Suburb.find();

    res.render("suburbs/new", {
      title: "Add Suburb",
      errorMsg: "",
      ownerId: req.user._id.toString(),
      suburbs,
    });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
}

async function create(req, res) {
  // Remove empty fields so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  try {
    // Update this line because now we need the _id of the new property
    const suburb = await Suburb.create(req.body);
    // Redirect to the new property's show functionality
    res.redirect(`/suburbs/${suburb._id}`);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render("suburbs/new", {
      errorMsg: err.message,
      title: "Add New Suburb",
      ownerId: req.user._id.toString(),
    });
  }
}

module.exports = {
  index,
  show,
  new: newSuburb,
  create,
};
