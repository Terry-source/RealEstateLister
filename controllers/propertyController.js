const Property = require('../models/property');
const Suburb = require('../models/suburb');

// more efficient way to export multiple functions just to include exports. in front of each function
exports.property_list = async (req, res) => {
    try {
        const properties = await Property.find().populate('owner').populate('suburb');
        res.render('properties/index', { properties });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};

exports.property_detail = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('owner').populate('suburb');
        res.render('properties/detail', { property });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};

exports.propertyNew = (req, res) => {
    // Render form to create a new property
};

exports.propertyCreatePost = async (req, res) => {
    // Handle post request to create a new property
};
