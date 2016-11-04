// require
var faunadb = require('faunadb'),
  q = faunadb.query,
  Ref = q.Ref;

var log = console.log.bind(console);

var client = new faunadb.Client({
  secret: "kqnPAhB5YtYAAAK0IQRg077SDW6vF0nmqQOMBA9q2hU"
});


client.query(
  q.Do(
    q.Update(Ref("classes/posts/148756377980896257"), {
      data: { tags: ["pet", "cute", "funny"] }
    }),
    q.Update(Ref("classes/posts/148756377980897281"), {
      data: { tags: ["philosophy", "travel"] }
    }),
    q.Create(Ref("classes/posts"), {
      data: { title: "Homebound", tags: ["nostalgia", "travel"] }
    }),
    q.Create(Ref("classes/posts"), {
      data: { title: "All Aboard", tags: ["ship", "travel"] }
    })
  )).then(log).then(function () {

    client.query(
  q.Paginate(q.Match(Ref("indexes/posts_by_tags_with_title"), "travel")),
    { size: 2 }).then(function (res) {
      console.log("page one", res)
      client.query(
        q.Paginate(q.Match(Ref("indexes/posts_by_tags_with_title"), "travel"), {
          after: res.after,
          size: 2
        })).then(function (res) {
          console.log("page two", res)

          var posts = q.Paginate(q.Match(Ref("indexes/posts_by_tags_with_title"), "travel"));
          client.query(q.Map(posts, function(post) { return q.Casefold(post); })).then(log)

        })
    })


  })
