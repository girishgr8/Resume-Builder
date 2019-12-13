const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');

const app = express ();

app.use (bodyParser.json ());

// DB config
const uri = require ('./config/keys').mongoURI;

// Avoid Deprecation Errors
mongoose.set ('useNewUrlParser', true);
mongoose.set ('useUnifiedTopology', true);

// Connect to Mongo
mongoose
  .connect (uri)
  .then (() => console.log ('Connected to Mongo DB Atlas'))
  .catch (err => console.log (err));

const port = process.env.PORT || 4000;
app.listen (port, () => console.log (`Server started on port ${port}`));
