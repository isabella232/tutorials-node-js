// require
var faunadb = require('faunadb'),
  q = faunadb.query,
  Ref = q.Ref;

var log = console.log.bind(console);

var client = new faunadb.Client({
  secret: "kqnPAhB5YtYAAAK0IQRg077SDW6vF0nmqQOMBA9q2hU"
});

client.query(q.Delete(Ref("classes/posts/148756377980895233"))).then(log).then(function () {
  client.query(q.Get(Ref("classes/posts/148756377980895233"))).then(log)

}).catch(log)
