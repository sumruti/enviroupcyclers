const express = require('express');
const app = express();
const path = require("path");
const request = require("request");

app.use(express.static(path.join(__dirname, 'asset')));
var ftpClient = require('ftp-client');
var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
var moment = require('moment');


const bodyParser = require("body-parser");
app.use(bodyParser.json());



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

  var doc = new GoogleSpreadsheet('1QnRVOgZKa3qYSzEjXWTIt_JMDVS0KDWVFaykI9rPeQs');
  var sheet;
   
  async.series([
    function setAuth(step) {
      // see notes below for authentication instructions!
      var creds = require('./credentials.json');
      // OR, if you cannot save the file locally (like on heroku)
      var creds_json = {
        client_email: 'bavnsofts@gmail.com',
        private_key: 'AIzaSyAobXByEeFH66OmFLeJQLGtjW7aEpVbfxM'
      }
   
      doc.useServiceAccountAuth(creds, step);
    },
    function getInfoAndWorksheets(step) {
      doc.getInfo(function(err, info) {
        console.log('Loaded doc: '+info.title+' by '+info.author.email);
        sheet = info.worksheets[0];
        console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
        step();
      });

     


    },
    function workingWithRows(step) {
      // google provides some query options
      sheet.getRows({
        offset: 1,
        limit: 20,
        orderby: 'col2'
      }, function( err, rows ){

          var data = [];

          for(let i=0;i < rows.length;i++){

            data.push({
              broadcategory:rows[i].broadcategory,
              category:rows[i].category,
              brand:rows[i].brand,
              itemdescription:rows[i].itemdescription,
              price:rows[i].price,
              individualunitsize:rows[i].individualunitsize,
              totalavailable:rows[i].totalavailable,
              totalvolume:rows[i].totalvolume,
              condition:rows[i].condition,
              received:rows[i].received,
              interestingto:rows[i].interestingto,
              soldto:rows[i].soldto,
              soldtocategory:rows[i].soldtocategory,
            })
            

          
          }
   
          res.render('items_available',{data:data});
   
        step();
      });
    },


   
  ], function(err){
      if( err ) {
        console.log('Error: '+err);
      }
  });


});



app.post('/filter_data', function(req, res){

  console.log(req.body)
  var doc = new GoogleSpreadsheet('1QnRVOgZKa3qYSzEjXWTIt_JMDVS0KDWVFaykI9rPeQs');
  var sheet;
   
  async.series([
    function setAuth(step) {
      // see notes below for authentication instructions!
      var creds = require('./credentials.json');
      // OR, if you cannot save the file locally (like on heroku)
      var creds_json = {
        client_email: 'bavnsofts@gmail.com',
        private_key: 'AIzaSyAobXByEeFH66OmFLeJQLGtjW7aEpVbfxM'
      }
   
      doc.useServiceAccountAuth(creds, step);
    },
    function getInfoAndWorksheets(step) {
      doc.getInfo(function(err, info) {
        console.log('Loaded doc: '+info.title+' by '+info.author.email);
        sheet = info.worksheets[0];
        console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
        step();
      });

     


    },
    function workingWithRows(step) {
      // google provides some query options
      sheet.getRows({
        offset: 1,
        limit: 20,
        orderby: 'col2'
      }, function( err, rows ){

          var data = [];
            
          for(let i=0;i < rows.length;i++){
             console.log(rows[i].broadcategory);

             if(req.body.value=="All items"){

               data.push({
                  broadcategory:rows[i].broadcategory,
                  category:rows[i].category,
                  brand:rows[i].brand,
                  itemdescription:rows[i].itemdescription,
                  price:rows[i].price,
                  individualunitsize:rows[i].individualunitsize,
                  totalavailable:rows[i].totalavailable,
                  totalvolume:rows[i].totalvolume,
                  condition:rows[i].condition,
                  received:rows[i].received,
                  interestingto:rows[i].interestingto,
                  soldto:rows[i].soldto,
                  soldtocategory:rows[i].soldtocategory,
                })

             }else{
               if(rows[i].broadcategory==req.body.value){
                data.push({
                  broadcategory:rows[i].broadcategory,
                  category:rows[i].category,
                  brand:rows[i].brand,
                  itemdescription:rows[i].itemdescription,
                  price:rows[i].price,
                  individualunitsize:rows[i].individualunitsize,
                  totalavailable:rows[i].totalavailable,
                  totalvolume:rows[i].totalvolume,
                  condition:rows[i].condition,
                  received:rows[i].received,
                  interestingto:rows[i].interestingto,
                  soldto:rows[i].soldto,
                  soldtocategory:rows[i].soldtocategory,
                })
              }  

             }
            

          
          }
   
        
          res.send({data:data});
   
        step();
      });
    },


   
  ], function(err){
      if( err ) {
        console.log('Error: '+err);
      }
  });

}) 
app.get('/contact-us', function(req, res){
	res.render('contact_us');
});

app.get('/item-description', function(req, res){
	res.render('item_description');
});

app.get('/receive-disposal-quote', function(req, res){
	res.render('receive_disposal_quote');
});


app.listen(port, () => console.log("Server started on port " + port));