const Property = require("../models/property");
const Suburb = require("../models/suburb");
const User = require("../models/user");

// more efficient way to export multiple functions just to include exports. in front of each function
async function index(req, res) {
  try {
    const properties = await Property.find({})
      .populate("owner")
      .populate("suburb");
    res.render("properties/index", { title: "All Properties", properties });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

async function show(req, res) {
  try {
    const property = await Property.findById(req.params.id)
      .populate("owner")
      .populate("suburb");
    res.render("properties/show", { title: property.address, property });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

async function newProperty(req, res) {
  if (!req.user) {
    // If the user is not logged in, redirect to login page or handle accordingly
    return res.redirect("/login");
  }
  try {
    const suburbs = await Suburb.find();

    res.render("properties/new", {
      title: "Add Property",
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
    const property = await Property.create(req.body);

    await Suburb.findByIdAndUpdate(property.suburb, {
      $push: { properties: property._id }, // Adds the property's ObjectId to the suburb's properties array
    });

    await User.findByIdAndUpdate(property.owner, {
      $push: { properties: property._id }, // Adds the property's ObjectId to the user's properties array
    });

    // Redirect to the new property's show functionality
    res.redirect(`/properties/${property._id}`);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render("properties/new", {
      errorMsg: err.message,
      title: "Add New Property",
      ownerId: req.user._id.toString(),
    });
  }
}

module.exports = {
  index,
  show,
  new: newProperty,
  create,
};
