var faunadb = require('faunadb'),
  q = faunadb.query,
  Ref = q.Ref,
  Match = q.Match;

var log = console.log.bind(console);

var client = new faunadb.Client({
  secret: require("../secrets").admin + ":my_app:server"
});

console.log("get alice ref")
client.query(
  q.Select("ref", q.Get(Match(Ref("indexes/people_by_name"), "alice")))).
  then(log).catch(log).then(function () {
    console.log("get alice followers")
    return client.query(
      q.Paginate(q.Match(
        Ref("indexes/followers_by_followee"),
        q.Select("ref", q.Get(Match(Ref("indexes/people_by_name"), "alice")))
      )));
  }).then(log).catch(log).then(function () {
    console.log("get alice name");
    return client.query(
      q.Map(q.Paginate(Match(Ref("indexes/people_by_name"), "alice")), function(person) {
        return q.Select(['data', 'name'], q.Get(person));
      }));
  }).then(log).catch(log).then(function () {
    console.log("get alice followers names");
    var people = q.Paginate(q.Match(
      Ref("indexes/followers_by_followee"),
      q.Select("ref", q.Get(Match(Ref("indexes/people_by_name"), "alice")))
    ));
    return client.query(
      q.Map(people, function(person) {
        return q.Select(['data', 'name'], q.Get(person));
      }));
  }).then(log).catch(log).then(function () {
    console.log('all people')
    return client.query(q.Paginate(q.Match(Ref("indexes/people"))));
  }).then(log).catch(log)
