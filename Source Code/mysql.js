var mysql = require('mysql');
var CSVToJSON = require('csvtojson');
var JSONToCSV = require('json2csv').parse;
var fs = require('fs');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydbms",
  port: 3306,
  connectTimeout: 1000000,
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
var query = 'INSERT INTO customer VALUES ';
var data = JSON.parse(fs.readFileSync('./db.json', {encoding:"utf-8"}));

  for (var  i= 1;i <= 4000000;i++) {
    var rand1 = Math.floor(Math.random()*100);
    var rand2 = Math.floor(Math.random()*100);
    var rand3 = Math.floor(Math.random()*10);
    query =  query + "(" + i + "," + '"' + data[rand1].first_name +'"' + "," + '"' + data[rand2].last_name +'"' + "," + data[rand3].city_id+ "),";
  }
 var finalQuery = query.slice(0,query.length-1);
 var startTime = new Date();
 connection.query(finalQuery, (error, result, field) => {
   if (error) {
     console.log("Error");
     connection.end();
   }
   console.log("Done!");
   var endTime = new Date();
   console.log((endTime - startTime)/1000);
   connection.end();
 })

