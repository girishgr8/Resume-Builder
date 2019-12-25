const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const pdf = require ('html-pdf');
const cors = require ('cors');

const app = express ();

const pdfTemplate = require ('./documents');

const options = {
  height: '42cm',
  width: '29.7cm',
};

app.use (cors ());
app.use (bodyParser.urlencoded ({extended: true}));
app.use (bodyParser.json ());

// POST route for PDF generation....
app.post ('/create-pdf', (req, res) => {
  pdf.create (pdfTemplate (req.body), options).toFile ('Resume.pdf', err => {
    if (err) res.send (Promise.reject ());
    else res.send (Promise.resolve ());
  });
});

// GET route -> send generated PDF to client...
app.get ('/fetch-pdf', (req, res) => {
  res.sendFile (`${__dirname}/Resume.pdf`);
});


const port = process.env.PORT || 4000;
app.listen (port, () => console.log (`Server started on port ${port}`));
