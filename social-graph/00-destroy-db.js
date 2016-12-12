var faunadb = require('faunadb'),
  q = faunadb.query,
  Ref = q.Ref;

var adminSecret = require("../secrets").admin

var log = console.log.bind(console);

var adminClient = new faunadb.Client({
  secret: adminSecret
});

adminClient.query(q.Delete(Ref("databases/my_app"))).
then(log).catch(log);
