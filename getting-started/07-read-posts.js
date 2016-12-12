// require
var faunadb = require('faunadb'),
  q = faunadb.query,
  Ref = q.Ref;

var secret = require("../secrets").admin
var client = new faunadb.Client({
  secret: secret+":blog_db:server"
});

// todo merge files 6-10 into explore so we can use known created ids

client.query(q.Get(Ref("classes/posts/148756377980895233"))).then(function (res) {
  console.log("load via id")
  console.log(res)
}).then(function () {

  client.query(
    q.Get(q.Match(Ref("indexes/posts_by_title"), "My cat and other marvels"))).then(function (res) {
      console.log("load via index query")
      console.log(res)
    })

})
