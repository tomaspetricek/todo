const Todo = require('../models/todo');

// Create
exports.showApi = function(req,res){
	res.render("api");
}

//Show All
exports.showAllTodos = function(req,res){
	// Set header content type for JSON file
	res.setHeader('Content-Type', 'application/json');

	Todo.find({}, function(err,todos){
		if(err){
			res.send(JSON.stringify({error: "Failed to retrieve the data from database."}));
		} else {
			res.send(JSON.stringify({todos: todos}));
		}
	});
}

// Show
exports.showTodo = function(req,res){
	// Set header content type for JSON file
	res.setHeader('Content-Type', 'application/json');

	Todo.findById(req.params.id, function(err, foundTodo){
		if(err){
			res.send(JSON.stringify({error: "Failed to retrieve the data from database."}));
		} else {
			res.send(JSON.stringify({todo: foundTodo}));
		}
	});
}