// require
var faunadb = require('faunadb'),
  q = faunadb.query,
  Ref = q.Ref;

var adminClient = new faunadb.Client({
  secret: require("../secrets").admin
});
adminClient.query(q.Create(Ref("databases"), { name: "blog_db" })).then(function (response) {
  console.log(response)
}).catch(console.log.bind(console, "error"))
