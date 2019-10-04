const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'asset')));

// Jade
app.set('views', __dirname+'/views');
app.set('view engine', 'jade');

app.get('/', function(req, res){
	res.render('index');
});

app.listen(3333);
console.log('Running on port 3333!');