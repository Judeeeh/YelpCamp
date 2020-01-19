var express = require('express'); // web framework
var mongoose = require('mongoose'); // database ODM (Object Document Mapping)
var methodOverride = require('method-override');
var flash = require('connect-flash');

// import authentication (passport)
var passport = require('passport');
var LocalStrategy = require('passport-local');

// import models
var User = require('./models/user');

// var seedDB = require('./seeds');

// import routes
var commentRoutes = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds');
var indexRoutes = require('./routes/index');

require('dotenv').config();

var app = express();
var port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());

// seedDB(); // seed the database

// passport configuration
app.use(
  require('express-session')({
    secret: 'Rolex is the cutest dog!',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// pass current user object to locals so all routes have access to it
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(port, function() {
  console.log('The YelpCamp Server Has Started!');
});
