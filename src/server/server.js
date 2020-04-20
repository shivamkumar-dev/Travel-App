var path = require('path');
const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

const app = express();
app.use(cors());

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
});

// Setup Server
const port = 8081;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// GET all
app.get('/all', getAll);
function getAll(req, res) {
  res.send(projectData);
}

// module.exports = getAll;
module.exports = app;
