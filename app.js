const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'asset')));
const port = process.env.PORT || 5000;

// Jade
app.set('views', __dirname+'/views');
app.set('view engine', 'jade');

app.get('/', function(req, res){
	res.render('index');
});

app.get('/about-us', function(req, res){
	res.render('about_us');
});

app.get('/items-available', function(req, res){
	res.render('items_available');
});

app.get('/contact-us', function(req, res){
	res.render('contact_us');
});

app.listen(port, () => console.log("Server started on port " + port));