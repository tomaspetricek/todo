const express = require('express'),
	  router = express.Router(),
	  auth = require('../auth'),
	  todoController = require('../controllers/todos');

// Show All
router.get("/", auth.isLoggedIn, todoController.showAllTodos);

// Create
router.get("/new", auth.isLoggedIn, todoController.createTodo);

//Save
router.post("/", auth.isLoggedIn, todoController.saveTodo);

// Show
router.get("/:id", auth.isLoggedIn, todoController.showTodo);

// Edit
router.get("/:id/edit", auth.isLoggedIn, todoController.editTodo);

// Update
router.put("/:id", auth.isLoggedIn, todoController.updateTodo);

// Delete
router.delete("/:id", auth.isLoggedIn, todoController.deleteTodo);

// Export routes
module.exports = router;
