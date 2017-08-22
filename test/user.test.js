const User = require('../models/user.js');
const assert = require("assert");

describe("A string can", function(){
  test("It can be uppercased" , function() {
    expect("hello".toUpperCase()).toBe("HELLO")
  })
})

test("It can be lowercased" function(){
  expect("HELLO".toLowercase()).toBe("hello")
  )}

})

describe("Users", function(){
  test("I can get a specific user" , function() {
    expect(User.all.length()).toBe(2)
  })
  test("I can get Brice" , function() {
    expect(User.all[1].length()).toBe("Brice")
})



// Hello == hello;
