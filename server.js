var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var pool = require('./pool.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function(req, res) {
  pool.query(`SELECT ()`)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      res.status(400).json({error: err});
    })
});

var port = process.env.PORT || 3000;
app.listen(port);

console.log("Listening on port " + port);
