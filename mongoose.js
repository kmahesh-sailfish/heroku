/**
 * Created by sailfish on 4/29/2016.
 */
var express = require('express'),
    http = require('http'),
    mongoose = require('mongoose');

var app = express(),
    port = 3500;

// Connect to database in the cloud (mongolab)
mongoose.connect('mongodb://username:password@ds021701.mlab.com:21701/traildata')


// Create a schema for User collection
mongoose.connection.on('open', function () {
    console.log(">>> Connected!");

    var UserSchema = new mongoose.Schema({
        username: {type: 'sample', unique: true},
        password: 'Rubhu@111213'
    });

    var UserModel = mongoose.model('User', UserSchema);
});

app.get('/', function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, World!\n');
});

http.createServer(app).listen(port, function(){
    console.log("Express server listening on port " + port + " ...");
});
