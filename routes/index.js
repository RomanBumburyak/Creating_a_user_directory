const express = require('express');
const router = express.Router();

//this getListing thing is a MiddleWare;
let data = [];

const getListings = function(req, res, next) {          //reference to mongo
  let MongoClient = require("mongodb").MongoClient;       //test
  let assert = require("assert");
  let url = "mongodb://localhost:27017/Creating_a_user_directory";       //this is the magic that connects you to you database;


  MongoClient.connect(url, function(err, db) {   //the db is making a reference to the url //this is where mongo is actually connected, db = represents the database robots. Calls back any errors.
    assert.equal(null ,err);

    getData(db, function() {
      db.close();                                       //this closes the database. //the function from lines 19-23 reference the let getData function;
      next();
    });
  });


  let getData = function(db, callback) {         // getData will grab information from our database, in order to give us access.  //callback is just a variable name, it can be called bananas
    let users = db.collection("users")      // users currently live in this colection; users is just a variable name that we created. Isaac said users, but you can call it whatever.
    users.find({}).toArray().then(function(users) {       //         //.then after the promise //this is the part where you would put the middle ware for listing, employed, and unemployed.
      data = users;                                           //users is an array containing fifty objects.
      callback();                                      //this could be called anything, it could be called bananas.
    });
  };
};

router.get('/', getListings, function(req,res) {
  res.render("listings", {users : data});
});
////////////////////////////////////////////////////////////// I'm making this first one for employed :

 let employedList = function(req, res, next) {
  let MongoClient = require("mongodb").MongoClient;
  let assert = require("assert");
  let url = "mongodb://localhost:27017/Creating_a_user_directory";


  MongoClient.connect(url, function(err, db) {

    getData(db, function() {
      db.close();
      next();
    });
  });


  let getData = function(db, callback) {
    let users = db.collection("users")
    users.find({}).toArray().then(function(users) {
      data = [];
      for (var i = 0; i < users.length; i++) {
        // users[i].job  //this would be part of the if statement
        if (users[i].job )
        {
          data.push(users[i]);
        };
      };
      callback();
    });
  };
};
router.get('/employed', employedList, function(req,res) {
  res.render("employed", {users : data});
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
    });
    callback();
  };
};


router.get('/looking', unEmployedList, function(req,res) {
  res.render("looking", {users : data});
});



// router.get('/', function(req,res) {
//   res.render('index', {userList : Data.allUsers});
// });
//
// router.get('users/:id', function (req, res) {
//     let id = req.params.id;
//
//     let userP = Data.allUsers.find(function(user) {
//       return user.id ==id;
//     });
//     res.render('profile', userP);
// });

module.exports = router;
