const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {dbName: 'task-manager',})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting:", err);
  })

module.exports = { mongoose} ;