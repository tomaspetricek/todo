const xss = require('xss'),
	  User = require('../models/user'),
	  passport = require("passport");

// REGISTER

// Show
exports.showRegistration = function(req,res){
	res.render("register");
}

// Perform
exports.performRegistration = function(req,res){
	User.register(new User({username: xss(req.body.username)}), xss(req.body.password), function(err, user){
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