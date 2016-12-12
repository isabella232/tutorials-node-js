// require
var faunadb = require('faunadb'),
  q = faunadb.query,
  Ref = q.Ref;

var secret = require("../secrets").admin
var client = new faunadb.Client({
  secret: secret+":blog_db:server"
});
client.query(q.Create(Ref("classes"), { name: "posts" })).then(function (res) {
  console.log(res)
})
