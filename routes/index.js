const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcryptjs');



mongoose.connect("mongodb://localhost:27017/Creating_a_user_directory");

function login(req, res, next) {
  console.log("MiddleWare");
  if (req.user ) {
  next()
  } else {
    res.redirect("/login")
  }
}


router.get('/', function(req,res){
  res.redirect("login")
});

router.get("/sign_up", function (req,res) {
  res.render("sign_up");
});

router.post("/sign_up", function(req,res){
  User.create({
    username:req.body.username,
    password:req.body.password,
    name:req.body.name,
    email:req.body.email
  }).then(function(data){
    console.log(data);
    res.redirect("/login");
  })
  .catch(function(err){
    console.log(err);
    res.redirect("/sign_up");
  })
});


router.get("/login", function (req,res) {
  res.render("login");
});

router.post("/login", passport.authenticate('local', {

    successRedirect:'/listings',
    failureRedirect: '/login',
    failureFlash: true
}));



router.post("/update_profile", function (req,res) {
  req.user.update({                                  //////this is the session:
    avatar:req.body.avatar,
    university:req.body.university,
    job:req.body.job,
    company:req.body.company
  }).then(function(data){
    res.redirect("/listings");
  })
  .catch(function(err){
    console.log(err);
    res.redirect("/update_profile");
  })
});

router.get("/update_profile", login, function (req,res) {
  console.log(req.user);
  res.render("edit_profile", {users: req.user});

});


/////////////////////////check out the users///
router.get('/users', login, function(req,res) {
    User.find({})
    .then(function(users) {
  res.render("users", {users : users});
  console.log();
    });
});

///////////////////////////////////////////
 router.get("/logOut", function (req,res){
   req.logout();
   res.redirect("/login")
 });
/////////////////////////////////////////////









//this getListing thing is a MiddleWare;








// You don't need this now because we're using mongoose now.
// const getListings = function(req, res, next) {          //reference to mongo
//   let MongoClient = require("mongodb").MongoClient;       //test
//   let assert = require("assert");
//   let url = "mongodb://localhost:27017/Creating_a_user_directory";       //this is the magic that connects you to you database;
//
//
//   MongoClient.connect(url, function(err, db) {   //the db is making a reference to the url //this is where mongo is actually connected, db = represents the database robots. Calls back any errors.
//     assert.equal(null ,err);
//
//     getData(db, function() {
//       db.close();                                       //this closes the database. //the function from lines 19-23 reference the let getData function;
//       next();
//     });
//   });
//
//
//   let getData = function(db, callback) {         // getData will grab information from our database, in order to give us access.  //callback is just a variable name, it can be called bananas
//     let users = db.collection("users")      // users currently live in this colection; users is just a variable name that we created. Isaac said users, but you can call it whatever.
//     users.find({}).toArray().then(function(users) {       //         //.then after the promise //this is the part where you would put the middle ware for listing, employed, and unemployed.
//       data = users;                                           //users is an array containing fifty objects.
//       callback();                                      //this could be called anything, it could be called bananas.
//     });
//   };
// };

//This is just a finder Boiler plate , this returns everything in your users collection:
router.get('/listings', login, function(req,res) {
  console.log("current user:", req.user);
  User.find({})
    .then(function(users) {
      res.render("listings", {users : users});
    })
    .catch(function(err){
      next(err);
    })
});
////////////////////////////////////////////////////////////// I'm making this first one for employed :


router.get('/employed',login, function(req,res) {
  let data=[];
  User.find({})
    .then(function(users) {
      for (var i = 0; i < users.length; i++) {

      if (users[i].job )
      {
        data.push(users[i]);
      }
    }
      res.render("employed", {users : data});
    })
    .catch(function(err){
      next(err);
    })
});








////////////////////////////////////////////////////////////////////
// this is the second one for looking:

  let unEmployedList = function(req, res, next) {
    console.log('working');
  let MongoClient = require("mongodb").MongoClient;
  let assert = require("assert");
  let url = "mongodb://localhost:27017/Creating_a_user_directory";
console.log('2');

  MongoClient.connect(url, function(err, db) {

    getData(db, function() {
      db.close();
      next();
    });
  });
console.log('3');

  let getData = function(db, callback) {
    let users = db.collection("users")
    users.find({}).toArray().then(function(users) {
      data = []; //it used to be data = users;
      for (var i = 0; i < users.length; i++) {
        users[i].job  //this would be part of the if statement
        if (!users[i].job )
        {
          data.push(users[i]);
        }
      }
      callback();
    });
  };
};



router.get('/looking', login, function(req,res) {
  User.find({job: null})
    .then(function(users) {
      res.render("looking", {users : users});
    })
    .catch(function(err){
      next(err);
    })
});

/////////////////////////this is the end of looking:

///////////////////////////////////Edit Profile:
router.get('/editProfile', login, function(req,res){
  res.render("edit_profile");
});

router.post('/editProfile', function(req,res){


  res.redirect("edit_profile");
});






module.exports = router;
