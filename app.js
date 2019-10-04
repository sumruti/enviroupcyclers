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

app.listen(port, () => console.log("Server started on port " + port));
console.log('Running on port 3333!');