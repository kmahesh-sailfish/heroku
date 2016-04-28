/**
 * Created by sailfish on 4/28/2016.
 */
'use strict';

var express = require('express');
var app = express();


app.get('/sample',function(req,res){
    res.send("hai");
});
app.listen(3500,function(){
    console.log("listen the port no is 3500");
});