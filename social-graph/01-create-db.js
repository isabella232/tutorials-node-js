var faunadb = require('faunadb'),
  q = faunadb.query,
  Ref = q.Ref;

var log = console.log.bind(console);

var adminClient = new faunadb.Client({
  secret: require("../secrets").admin
});

adminClient.query(q.Create(Ref("databases"), { name: "my_app" })).then(log).catch(log)
