/**
 * Created by sailfish on 4/28/2016.
 */
'use strict';

var express = require('express');
var app = express();
var cool = require('cool-ascii-face');

//set the port no
app.set('port',(process.env.PORT ||3500));

//set the directory
app.use(express.static(_driname + '/public'));


//set the view is directory for all template files
app.set('views',_dirname+'/views');
app.set('view enginee','ejs');


app.get('/cool', function(request, response) {
    response.send(cool());
});

app.get('/sample',function(req,res){
    res.send("hai");
});
app.listen(app.get('port'),function(){
    console.log("listen the port no is 3500");
});