// contect mongodb

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);

console.log(process.env.DATABASE_URL);

// create mongoose connection object
const db = mongoose.connection;

db.on("connected", () => {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});
