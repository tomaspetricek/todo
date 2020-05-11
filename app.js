const express = require("express"),
	  mongoose = require("mongoose"),
	  passport = require("passport"),
	  bodyParser = require("body-parser"),
	  LocalStrategy = require("passport-local"),
	  passportLocalMongoose = require("passport-local-mongoose"),
	  methodOverride = require("method-override"),
	  User = require("./models/user"),
	  Todo = require("./models/todo");

var indexRouter = require('./routes/index'),
	todosRouter = require('./routes/todos'),
    authRouter = require('./routes/auth');

// Connect to database
mongoose.connect("mongodb://localhost/todos", {useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err)
     console.error(err);
  else
     console.log("Connected to the mongodb"); 
});

var app = express();
// Set up app
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));
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

//Todo.create({
//	title: "Udělat semestrálku na WEAP",
//});

// Set up server
app.listen(3000,function(){
	console.log("Server is running");
});