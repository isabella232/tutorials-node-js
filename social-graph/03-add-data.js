var faunadb = require('faunadb'),
  q = faunadb.query,
  Ref = q.Ref,
  Match = q.Match;

var log = console.log.bind(console);

var adminSecret = require("../secrets").admin;
var client = new faunadb.Client({
  secret: adminSecret + ":my_app:server"
});

console.log("create people");
client.query(
  q.Foreach(["alice", "bob", "carol", "dave"], function(name) {
    return q.Create(Ref("classes/people"), {
      data: { name: name }
    });
  })).then(log).catch(log).then(function () {
    return client.query(q.Get(Match(Ref("indexes/people_by_name"), "alice")));
  }).then(log).catch(log).then(function () {
    return client.query(q.Get(Match(Ref("indexes/people_by_name"), "bob")));
  }).then(log).catch(log).then(function () {
    // alice follows bob
    console.log("alice follows bob");

    return client.query(
      q.Create(Ref("classes/relationships"), {
        data: {
          followee: q.Select("ref",
            q.Get(Match(Ref("indexes/people_by_name"), "alice"))),
          follower: q.Select("ref",
            q.Get(Match(Ref("indexes/people_by_name"), "bob")))
        }
      }));
  }).then(log).then(function () {
    // bob follows alice
    console.log("bob follows alice");

    return client.query(
      q.Create(Ref("classes/relationships"), {
        data: {
          followee: q.Select("ref",
            q.Get(Match(Ref("indexes/people_by_name"), "bob"))),
          follower: q.Select("ref",
            q.Get(Match(Ref("indexes/people_by_name"), "alice")))
        }
      }));
  }).then(log).catch(function (err) {
    console.log("bob follows alice error", err);
    debugger;
    console.log(err.requestResult.RequestResult.requestContent)
    console.log(err.requestResult.RequestResult.responseContent)

  }).then(function () {
    // Carol follows both Alice and Bob
    console.log("Carol follows both Alice and Bob");

    var follower = q.Select("ref",
      q.Get(Match(Ref("indexes/people_by_name"), "carol")));
    var followees = q.Paginate(q.Union(
      Match(Ref("indexes/people_by_name"), "alice"),
      Match(Ref("indexes/people_by_name"), "bob")));

    return client.query(q.Foreach(followees, function(followee) {
      return q.Create(Ref("classes/relationships"), {
        followee: followee,
        follower: follower
      })
    }));
  }).then(log).then(function () {
    // Dave follows Alice
    console.log("Dave follows Alice");

    return client.query(
      q.Create(Ref("classes/relationships"), {
        data: {
          followee: q.Select("ref",
            q.Get(Match(Ref("indexes/people_by_name"), "alice"))),
          follower: q.Select("ref",
            q.Get(Match(Ref("indexes/people_by_name"), "dave")))
        }
      }));
  }).then(log).catch(log)
