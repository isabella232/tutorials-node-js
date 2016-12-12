var faunadb = require('faunadb'),
  q = faunadb.query,
  Ref = q.Ref;

var log = console.log.bind(console);
const util = require('util');


var adminSecret = require("../secrets").admin;

var adminClient = new faunadb.Client({
  secret: adminSecret
});

var nestedAdminClient = new faunadb.Client({
  secret: adminSecret + ":my_app:admin"
});

var nestedServerClient = new faunadb.Client({
  secret: adminSecret + ":my_app/nested_database:server"
});

adminClient.query(q.Paginate(Ref("databases"))).then(function (response) {
  return ["databases",response]
  // return nestedAdminClient.query(q.Create(Ref("databases"), { name: "nested_database" }));
  // return nestedServerClient.query(q.Create(Ref("classes"), { name: "universal" }));
}).then(log).catch(log).then(function () {
  return adminClient.query(q.Get(Ref("databases/my_app"))).then(function (response) {
    console.log("database info",response)
  }).catch(log)
}).then(function () {
  var myAppClient = new faunadb.Client({
    secret: adminSecret + ":my_app:server"
  });
  return myAppClient.query(q.Paginate(Ref("classes"))).then(function (response) {
    console.log("classes in my_app database",response)
  }).catch(log).then(function () {
    return myAppClient.query(q.Paginate(Ref("indexes"))).then(function (response) {
      console.log("indexes in my_app database",response)

      // info about each index
      console.log("indexes")
      var mq = q.Get(Ref("indexes/people_by_name"));
      return myAppClient.query(mq);

    }).then(function (info) {
      console.log("info",util.inspect(info,{depth:null}))
    }).catch(log)
  }).catch(log).then(function () {
    // find indexes with source Ref("classes/people")
    console.log("get indexes for classes/people")
    return myAppClient.query(q.Filter(q.Map(q.Paginate(Ref("indexes")), function (indexRef) {
      return q.Get(indexRef)
    }), function (indexInstance) {
      return q.Equals(Ref("classes/people"), q.Select("source", indexInstance));
    })).then(log).catch(log)
  })
})
