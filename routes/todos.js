const express = require('express'),
	  router = express.Router(),
	  auth = require('../auth'),
	  todoController = require('../controllers/todos');

// Show All
router.get("/", auth.isLoggedIn, todoController.showAllTodos);

// Create
router.get("/new", todoController.createTodo);

//Save
router.post("/", todoController.saveTodo);

// Show
router.get("/:id", todoController.showTodo);

// Edit
router.get("/:id/edit", todoController.editTodo);

// Update
router.put("/:id", todoController.updateTodo);

// Delete
router.delete("/:id", todoController.deleteTodo);

// Export routes
module.exports = router;
