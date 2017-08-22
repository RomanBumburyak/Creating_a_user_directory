app.get('user/:id', function(req, res){
  let id = req.params.id;  //only use params when a client is sending you something

  let user = data.users.find(function(user) { //find method will allow us to look through the array of users;
  return user.id == id; // we want to return this user, "please return any user "
});
  res.render('profile', user)// the second property in a render must be an object.
  console.log(req.params.id);
})

app.get("/Hello", function(req, res){
  res.render('users', data)
});
