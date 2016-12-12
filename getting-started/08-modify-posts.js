// require
var faunadb = require('faunadb'),
  q = faunadb.query,
  Ref = q.Ref;

var log = console.log.bind(console);

var secret = require("../secrets").admin
var client = new faunadb.Client({
  secret: secret+":blog_db:server"
});

client.query(
  q.Update(Ref("classes/posts/148756377980895233"), {
    data: { tags: ["pet", "cute"] }
  })).then(log).then(function () {

    client.query(
      q.Replace(Ref("classes/posts/148756377980895233"), {
        data: { title: "My dog and other marvels" }
      })).then(log)


  })
