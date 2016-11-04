// require
var faunadb = require('faunadb'),
  q = faunadb.query,
  Ref = q.Ref;

var adminClient = new faunadb.Client({
  secret: "YOUR_FAUNA_SECRET"
});
adminClient.query(q.Create(Ref("databases"), { name: "blog_db" })).then(function (response) {
  console.log(response)
})

// this is not a repl, need .then() and console.log
// => {
//   "ref": { "@ref": "databases/blog_db" },
//   "class": { "@ref": "databases" },
//   "ts": 1436375112141542,
//   "name": "blog_db"
// }
