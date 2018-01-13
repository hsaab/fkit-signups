var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var pool = require('./pool.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function(req, res) {
  pool.query(`SELECT * FROM signups`)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      res.status(400).json({error: err});
    })
});

app.get("/add", function(req, res) {
  pool.query(`INSERT INTO signups (first, email)
    VALUES ($1, $2) RETURNING *`, [req.query.first, req.query.email])
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      res.status(400).json({error: err});
    })
})

var port = process.env.PORT || 3000;
app.listen(port);

console.log("Listening on port " + port);
