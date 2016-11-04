var faunadb = require('faunadb'),
  q = faunadb.query,
  Ref = q.Ref;

var log = console.log.bind(console);

var adminClient = new faunadb.Client({
  secret: "YOUR_FAUNA_SECRET"
});

debugger;
adminClient.query(q.Delete(Ref("databases/my_app"))).
then(log).catch(log);
