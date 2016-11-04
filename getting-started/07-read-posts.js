// require
var faunadb = require('faunadb'),
  q = faunadb.query,
  Ref = q.Ref;

var client = new faunadb.Client({
  secret: "kqnPAhB5YtYAAAK0IQRg077SDW6vF0nmqQOMBA9q2hU"
});

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
