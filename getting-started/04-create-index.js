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
  q.Create(Ref("indexes"), {
    name: "posts_by_title",
    source: Ref("classes/posts"),
    terms: [{ field: ["data", "title"] }]
  })).then(function (res) {
    console.log(res)

    client.query(
  q.Create(Ref("indexes"), {
    name: "posts_by_tags_with_title",
    source: Ref("classes/posts"),
    terms: [{ field: ["data", "tags"] }],
    values: [{ field: ["data", "title"] }]
  })).then(function (res) {
    console.log(res)
  }).catch(log)
}).catch(log)
