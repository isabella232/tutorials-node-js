var faunadb = require('faunadb'),
  q = faunadb.query,
  Ref = q.Ref;

var log = console.log.bind(console);

var adminClient = new faunadb.Client({
  secret: "kqnPAhBy4vLQAAG0H4zu8gMbmRJg9uzk9up-xcAfZS8"
});

adminClient.query(q.Create(Ref("databases"), { name: "my_app" })).
then(log).then(function () {
  adminClient.query(
    q.Create(Ref("keys"), {
      database: Ref("databases/my_app"),
      role: "server"
  })).then(function(key) { log("secret", key.secret); });
}).catch(log)
