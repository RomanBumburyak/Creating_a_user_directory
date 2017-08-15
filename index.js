const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const data = require('./data')
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.get("/Hello", function(req, res){
  res.render('users', data)
});

app.listen(8080, function(){
  console.log("App is running on port 8080");
});
