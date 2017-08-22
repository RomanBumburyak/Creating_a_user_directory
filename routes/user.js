const express = require('express');
const path = require('path');
const User = require('../models/user.js');
const Data = require('../models/data.js')
const router = express.Router();


router.get('/', function(req,res) {
  res.render('index', {userList : Data.allUsers});
});

app.get('users/:id', function (req, res) {
    let id = req.params.id;

    let userP = Data.allUsers.find(function(user) {
      return user.id ==id;
    });
    res.render('profile', userP);
}
