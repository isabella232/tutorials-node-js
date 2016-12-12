// require
var faunadb = require('faunadb'),
  q = faunadb.query,
  Ref = q.Ref;

var log = console.log.bind(console);

var secret = require("../secrets").admin
var client = new faunadb.Client({
  secret: secret+":blog_db:server"
});

client.query(q.Delete(Ref("classes/posts/148756377980895233"))).then(log).then(function () {
  client.query(q.Get(Ref("classes/posts/148756377980895233"))).then(log)

}).catch(log)
