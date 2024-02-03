const Suburb = require('../models/suburb');
const Property = require('../models/property');

exports.suburb_list = async (req, res) => {
    try {
        const suburbs = await Suburb.find();
        res.render('suburbs/index', { suburbs });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};

exports.suburb_detail = async (req, res) => {
    try {
        const suburb = await Suburb.findById(req.params.id);
        const properties = await Property.find({ suburb: suburb._id }).populate('owner');
        res.render('suburbs/detail', { suburb, properties });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};
