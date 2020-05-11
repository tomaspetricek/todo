const express = require('express'),
	  router = express.Router(),
	  passport = require("passport"),
	  authController = require('../controllers/auth');

// REGISTER

// Show
router.get("/register", authController.showRegistration);

// Perform
router.post("/register", authController.performRegistration); 

// LOGIN

// Show
router.get("/login", authController.showLogin);

// Perform
router.post("/login", passport.authenticate("local", {
	successRedirect: "/todos",
	failureRedirect: "/login"
}), authController.performLogin);

// LOGOUT
router.get("/logout", authController.logout);

// Export routes
module.exports = router;