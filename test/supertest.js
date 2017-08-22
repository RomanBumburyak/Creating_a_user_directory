const request = require("supertest");
const assert = require("assert");
const app = require("../main.js");

describe("Get / hello", function(){
  it("Should return world", function(done){
    request(app)
    .get('/hello')
    .expect(200)
    .expect("Content-Type", "application/json, charset=utf-8")
    .expect(function(response){
      assert.equal(res.body.hello, "world")
    })
    .end(done);
  })
})

describe("POST / hello", function(){
  it("Should take my data", function(done){
    request(app)
    .get('/hello')
    .send({"info": "Is my String"})
    .expect(200)
    .expect("Content-Type", "application/json, charset=utf-8")
    .expect(function(response){
      assert.equal(response.body.userInfo, "Is my string")
    })
    .end(done);
  })
})
