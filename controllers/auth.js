const User = require('../models/user'),
	  expressSanitizer = require("express-sanitizer"),
	  passport = require("passport");

// REGISTER

// Show
exports.showRegistration = function(req,res){
	res.render("register");
}

// Perform
exports.performRegistration = function(req,res){
	req.body = req.sanitize(req.body);
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			return res.render("/register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/todos");
		});
	});
}

// LOGIN

// Show
exports.showLogin = function(req, res){
	res.render("login");
}

// Perform
exports.performLogin = function(req, res){
}

// LOGOUT
exports.logout = function(req,res){
	req.logout();
	res.redirect("/");
}