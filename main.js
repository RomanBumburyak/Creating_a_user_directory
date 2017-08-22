const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const app = express();
const userRoutes = require('./');
const Data = require('./models/data.js');
const router = require('./routes/user.js');

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req,res) {
  res.render('index', {userList: Data.allusers});
)};


app.listen(8080, function(){
  console.log("App is running on port 8080");
});
