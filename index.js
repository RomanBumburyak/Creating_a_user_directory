const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const data = require('./data')
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static(path.join(__dirname, 'public')))
app.get("/Hello", function(req, res){
  res.render('users', data)
});
app.get('listing/:id' , function(req, res){
  console.log(req.params.id);
})

app.listen(8080, function(){
  console.log("App is running on port 8080");
});
