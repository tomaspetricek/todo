const express = require("express"),
	  mongoose = require("mongoose"),
	  passport = require("passport"),
	  bodyParser = require("body-parser"),
	  LocalStrategy = require("passport-local"),
	  passportLocalMongoose = require("passport-local-mongoose"),
	  expressSanitizer = require("express-sanitizer"),
	  methodOverride = require("method-override"),
	  User = require("./models/user"),
	  Todo = require("./models/todo");

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
app.use(expressSanitizer());
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

//Todo.create({
//	title: "Udělat semestrálku na WEAP",
//});

// <Routes>
// Root route
app.get("/", function(req,res){
	res.render("home");
});

// <Authentifications>
// <Register>
app.get("/register", function(req,res){
	res.render("register");
});

app.post("/register",function(req,res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			return res.render("/register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/todos");
		});
	});
});
// </Register>
// <Login>
app.get("/login", function(req, res){
	res.render("login");
});

app.post("/login",passport.authenticate("local", {
	successRedirect: "/todos",
	failureRedirect: "/login"
}),function(req, res){
});
// </Login>
// <Logout>
app.get("/logout", function(req,res){
	req.logout();
	res.redirect("/");
});
// </Logout>
// </Authentifications>
// <Todos>
app.get("/todos",isLoggedIn, function(req,res){
	Todo.find({}, function(err,todos){
		if(err){
			console.log(err);
		} else {
			res.render("todos", {todos: todos});
		}
	});
});

// Create
app.get("/todos/new", function(req,res){
	res.render("new");
});

app.post("/todos", function(req,res){
	Todo.create(req.body.todo,function(err,newTodo){
		if(err){
			res.render("new");
		} else {
			res.redirect("/todos")
		}
	});
});

// Show
app.get("/todos/:id", function(req,res){
	Todo.findById(req.params.id, function(err, foundTodo){
		if(err){
			res.redirect("/todos");
		} else {
			res.render("show", {todo: foundTodo});
		}
	});
});

// Edit
app.get("/todos/:id/edit", function(req,res){
	Todo.findById(req.params.id, function(err, foundTodo){
		if(err){
			res.redirect("/todos");
		}else{
			res.render("edit",{todo: foundTodo});
		}
	});
});

// Update
app.put("/todos/:id", function(req,res){
	Todo.findByIdAndUpdate(req.params.id, req.body.todo, function(err, updatedTodo){
		if(err){
			res.redirect("/todos");
		} else { 
			res.redirect("/todos/" + req.params.id);
		}
	});
});

// Delete
app.delete("/todos/:id",function(req,res){
	Todo.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/todos");
		}else{
			res.redirect("/todos");
		}
	});
});

// </Todos>
// </Routes>

// Check if logged in
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect("/login");
	}
};

// Set up server
app.listen(3000,function(){
	console.log("Server is running");
});