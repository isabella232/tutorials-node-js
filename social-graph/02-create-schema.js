var faunadb = require('faunadb'),
  q = faunadb.query,
  Ref = q.Ref;

var log = console.log.bind(console);

var client = new faunadb.Client({
  secret: "YOUR_GRAPHDB_KEY"
});

client.query(q.Create(Ref("classes"), { name: "people" })).
then(log).then(function () {
  return client.query(
    q.Create(Ref("indexes"), {
      name: "people_by_name",
      source: Ref("classes/people"),
      terms: [{ field: ["data", "name"] }],
      unique: true
    }));
}).then(log).catch(log).then(function () {
  return client.query(q.Create(Ref("classes"), { name: "relationships" }));
}).then(log).then(function () {
  return client.query(
    q.Create(Ref("indexes"), {
      name: "followers_by_followee",
      source: Ref("classes/relationships"),
      terms: [{ field: ["data", "followee"] }],
      values: [{ field: ["data", "follower"] }]
    }));
}).then(log).catch(log)
