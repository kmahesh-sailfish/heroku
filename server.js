/**
 * Created by sailfish on 4/28/2016.
 */
    'use strict';
var express =  require("express");
var path = require("path");
var bodyParaser = require("body-parser");
var mongodb = require("mongodb");
var mongoose = require("mongoose");
var OjectID = mongodb.ObjectID;



var CONTACTS_COLLECTION = "contacts";
var app = express();
app.use(express.static(__dirname  + 'public'));
app.use(bodyParaser.json());

var db;
// connection the mongolab
mongoose.connect('mongodb://username:password@ds021701.mlab.com:21701/traildata')

// Create a schema for User collection
mongoose.connection.on('open', function () {
    console.log(">>> Connected!");

    var UserSchema = new mongoose.Schema({
        username: {type: 'sample', unique: true},
        password: 'Rubhu@111213'
    });

     db = mongoose.model('Contacts', UserSchema);
});
var server =  app.listen(process.env.PORT || 3500,function(){
    var port = server.address().port;
    console.log("listen the running port ",port);
});
//error handler used by all endpoints
function handleError(res,reason,message,code){
    console.log("Error:"+ reason);
    res.status(code || 500).json({"error":message});
}
// find the all contatcts
app.get('/contacts',function(req,res){
    var newContact = req.body;
    newContact.createDate = new Date();
    if (!(req.body.firstName || req.body.lastName)) {
        handleError(res, "Invalid user input", "Must provide a first or last name.", 400);
    }
    db.collection(CONTACTS_COLLECTION).insertOne(newContact,function(err,doc){
        if (err) {
            handleError(res, err.message, "Failed to create new contact.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});
