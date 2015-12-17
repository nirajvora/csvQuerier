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

///////////////////////////////////////////////////////////////////////////////////////////////////// RUN SERVER

process.on('uncaughtException', function (err) {
    console.log(err);
});

app.listen(8000, function () {
  console.log('listening on PORT 8000')
});

module.exports = app;