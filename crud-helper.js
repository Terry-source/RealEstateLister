// crud-helper.js

// Used to perform CRUD external to the application

// To use (don't type the $'s):
//   1. Open a Node REPL in Terminal:
//         $ node

//   2. Load this crud-helper.js module
//         $ .load crud-helper.js

//   3. When done CRUDing, exit the REPL with:
//         $ .exit (or ctrl-D, or ctrl-C twice)

// If any changes are made to the models,
// exit the REPL and reload this module

// If the db connection string is in a .env file, we need
// to read in those env variables just like in server.js
// const mongoose = require("mongoose");

require("dotenv").config();
// Connect to the database
require("./config/database");

// Require the app's Mongoose models
const Property = require("../models/property");
const Suburb = require("../models/suburb");
const User = require("../models/user");

// Example CRUD

// Top-level await (using await outside of an async function)
// has been available since Node v14.8
// let movies = await Movie.find({});
// console.log(movies);

// mongoose.connect('mongodb://localhost/yourDatabaseName', { useNewUrlParser: true, useUnifiedTopology: true });

const suburbs = [
  { name: "Greenfield", info: "A peaceful suburb with lots of green spaces." },
  {
    name: "Sunnyside",
    info: "Known for its sunny weather and friendly community.",
  },
];

// const properties = [
//   // Assuming you have already created and have the ObjectId for 'owner' and 'suburb'
//   { address: "123 Green Street, Greenfield", rooms: 3, bathrooms: 2, imageUrl: "http://example.com/image1.jpg", owner: "<User ObjectId>", suburb: "<Suburb ObjectId for Greenfield>" },
//   { address: "456 Sunny Lane, Sunnyside", rooms: 4, bathrooms: 3, imageUrl: "http://example.com/image2.jpg", owner: "<User ObjectId>", suburb: "<Suburb ObjectId for Sunnyside>" }
// ];

async function insertData() {
  try {
    const insertedSuburbs = await Suburb.insertMany(suburbs);
    console.log("Suburbs inserted:", insertedSuburbs);

    // Update properties with actual suburb IDs
    // const updatedProperties = properties.map(property => {
    //   const suburb = insertedSuburbs.find(sub => sub.name === property.address.split(',')[1].trim());
    //   return { ...property, suburb: suburb._id };
    // });

    // const insertedProperties = await Property.insertMany(updatedProperties);
    // console.log('Properties inserted:', insertedProperties);
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    mongoose.connection.close();
  }
}

insertData();
