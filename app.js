const express = require("express"),
	  mongoose = require("mongoose"),
	  passport = require("passport"),
	  bodyParser = require("body-parser"),
	  LocalStrategy = require("passport-local"),
	  passportLocalMongoose = require("passport-local-mongoose"),
	  methodOverride = require("method-override"),
	  createError = require('http-errors'),
	  expressSanitizer = require("express-sanitizer"),
	  User = require("./models/user"),
	  Todo = require("./models/todo");

var indexRouter = require('./routes/index'),
	todosRouter = require('./routes/todos'),
    authRouter = require('./routes/auth'),
    apiRouter = require('./routes/api');

// Connect to database
let mongoDBUrl = process.env.MONGODB_URI || 'mongodb://localhost/todos';
mongoose.connect(mongoDBUrl, {useNewUrlParser: true, useUnifiedTopology: true }, function(err){
	if (err)
	    console.error(err);
	else
	    console.log("Connected to the mongodb"); 
	});
mongoose.Promise = global.Promise;

var app = express();
// Set up app
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(require("express-session")({
	secret: "Captain America can wield mjolnir",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set up routes
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/todos', todosRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.render('error', {error: err});
});

// Set up server
app.listen(process.env.PORT || 3000,function(){
	console.log("Server is running");
});