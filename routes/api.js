const express = require('express'),
	  router = express.Router(),
	  auth = require('../auth'),
	  apiController = require('../controllers/api');

//API
router.get("/", auth.isLoggedIn, apiController.showApi)

// Show All
router.get("/todos/", auth.isLoggedIn, apiController.showAllTodos);

// Show
router.get("/todos/:d",  auth.isLoggedIn, apiController.showTodo);

// Export routes
module.exports = router;