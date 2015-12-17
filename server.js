///////////////////////////////////////////////////////////////////////////////////////////////////// CONFIGURE SERVER WITH DATABASE

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/csvQuery', function ( ) {
  mongoose.connection.db.dropDatabase();
});

///////////////////////////////////////////////////////////////////////////////////////////////////// CSV DATA

var companyData = fs.readFileSync('company_output.csv').toString().split('\n');
companyData.shift(); // Shift the headings off the list of records.
var schemaKeyList = ['Company', 'EmployeeCount', 'Product', 'OpportunityCreated', 'Scored'];

///////////////////////////////////////////////////////////////////////////////////////////////////// DATA BASE CONFIGURATION/POPULATION

var CompanySchema = new mongoose.Schema({
  Company: String,
  EmployeeCount: Number,
  Product: String,
  OpportunityCreated: Number,
  Scored: Number
});
var Company = mongoose.model('Company', CompanySchema);

function createDocRecurse (err) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    if (companyData.length) {
        var line = companyData.shift();
        var doc = new Company();
        line.split(',').forEach(function (entry, i) {
            doc[schemaKeyList[i]] = entry;
        });
        doc.save(createDocRecurse);
    } else {
        // After the last entry query to show the result.
        return;
    }
}

createDocRecurse(null);

Company.count({}, function (err, count) {
  console.log(count + ' companies have been populated in the database.');
});

////////////////////////////////////////////////////////////////////////////////////////////////////  CONFIGURE ROUTES

app.use(express.static(__dirname + '/client'))
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.post('/query', function (req, res) {

  var product = (req.body.product === undefined || req.body.product === "") ? null : req.body.product.trim().toUpperCase();
  var employeeSize = (req.body.employeeSize === undefined || req.body.product === "") ? null : req.body.employeeSize.replace(/ /g, '');
  var score = (req.body.score === undefined || req.body.score === "") ? null : req.body.score.replace(/ /g, '');

  var esRange, scoreRange;
  if(employeeSize !== null) { esRange = employeeSize.search('-'); };
  if(score !== null) { scoreRange = score.search('-'); };

  var query = 'Company.find({})';

  if(product !== null) {
    if(product === 'PRODUCT') { product += " "; };
    query += '.where("Product").equals("'+product+'")';
  }

  if(employeeSize !== null && esRange === -1) {
    query += '.where("EmployeeCount").equals('+employeeSize+')'
  } else if(employeeSize !== null) {
    query += '.where("EmployeeCount").gt('+ (Number(employeeSize.slice(0,esRange)) - 1) + ').lt('+ (Number(employeeSize.slice(esRange + 1)) + 1) + ')';
  }

  if(score !== null && scoreRange === -1) {
    query += '.where("Scored").equals('+score+')'
  } else if(score !== null) {
    query += '.where("Scored").gt('+ (Number(score.slice(0,scoreRange)) - 1) + ').lt('+ (Number(score.slice(scoreRange + 1)) + 1) + ')';
  }

  query += '.exec(function ( error, companies ) { if(error) { console.log(error); } else { res.send(companies); }});';
  console.log(query)

  eval(query);

});

///////////////////////////////////////////////////////////////////////////////////////////////////// RUN SERVER

process.on('uncaughtException', function (err) {
    console.log(err);
});

app.listen(8000, function () {
  console.log('listening on PORT 8000')
});

module.exports = app;