// require
var faunadb = require('faunadb'),
  q = faunadb.query,
  Ref = q.Ref;


var blogPosts = ["My cat and other marvels",
                 "Pondering during a commute",
                 "Deep meanings in a latte"]

var secret = require("../secrets").admin
var client = new faunadb.Client({
  secret: secret+":blog_db:server"
});

client.query(
  q.Map(blogPosts, function(post_title) {
    return q.Create(Ref('classes/posts'), {
      data: { title: post_title }
    });
  })).then(function (res) {
    console.log(res)
  })
