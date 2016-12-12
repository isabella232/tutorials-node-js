var faunadb = require('faunadb'),
  q = faunadb.query,
  Ref = q.Ref;

var log = console.log.bind(console);

var adminSecret = require("../secrets").admin;
var client = new faunadb.Client({
  secret: adminSecret + ":my_app:server"
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
}).then(log).catch(log).then(function () {
  return client.query(
    q.Create(Ref("indexes"), {
      name: "people",
      source: Ref("classes/people")
    }));
}).then(log).catch(log).then(function () {
  return client.query(
    q.Create(Ref("indexes"), {
      name: "relationships",
      source: Ref("classes/relationships")
    }));
}).then(log).catch(log).then(function () {
  return client.query(
    q.Create(Ref("indexes"), {
      name: "people_by_name_options_more",
      source: Ref("classes/people"),
      terms: [{
        field: ["data", "name"],
        transform: "casefold"
      },{
        field: ["data", "name"]
      }],
      values: [
        { field: ["ts"], reverse: true },
        { field: ["data", "name"] },
        { field: ["ref"] }
      ] }));
}).then(log).catch(log).then(function () {
  return client.query(
    q.Create(Ref("indexes"), {
      name: "people_value_name",
      source: Ref("classes/people"),
      values: [
        { field: ["data", "name"] },
        { field: ["ts"], reverse: true },
        { field: ["ref"] }
      ]
    }));
}).then(log).catch(log)
