//I call this the boiler plate:

const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const router = require('./routes/index.js');
const app = express();

app.use(express.static(path.join(__dirname, "./public")))

app.engine('mustache', mustacheExpress());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");
app.set('layout', 'layout');

app.use(router);

app.listen(3001, function(){
  console.log("App is running on port 3001");
});
