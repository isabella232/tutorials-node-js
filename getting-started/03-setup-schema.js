// require
var faunadb = require('faunadb'),
  q = faunadb.query,
  Ref = q.Ref;

var client = new faunadb.Client({
  secret: "kqnPAhB5YtYAAAK0IQRg077SDW6vF0nmqQOMBA9q2hU"
});
client.query(q.Create(Ref("classes"), { name: "posts" })).then(function (res) {
  console.log(res)
})
