// require
var faunadb = require('faunadb'),
  q = faunadb.query,
  Ref = q.Ref;

var adminClient = new faunadb.Client({
  secret: require("../secrets").admin
});

adminClient.query(
  q.Create(Ref("keys"), {
    database: Ref("databases/blog_db"),
    role: "server"
})).then(function(key) { console.log("Server Key Secret", key.secret); });
