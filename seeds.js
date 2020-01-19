var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
  {
    name: "Cloud's Rest",
    image:
      'https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60',
    description: 'blah blah blah'
  },
  {
    name: 'Canyon Floor',
    image:
      'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60',
    description: 'blah blah blah'
  },
  {
    name: 'Desert Mesa',
    image:
      'https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60',
    description: 'blah blah blah'
  }
];

function seedDB() {
  // Remove all campgrounds
  Campground.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log('removed campgrounds!');
    // add a few campgrounds
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if (err) {
          console.log(err);
        } else {
          console.log('added a campground!');
          // create a comment
          Comment.create(
            {
              text: 'This place is great, but i wish there was internet',
              author: 'Homer'
            },
            function(err, comment) {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log('created new comment');
              }
            }
          );
        }
      });
    });
  });
}

module.exports = seedDB;
