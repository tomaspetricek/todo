const xss = require('xss'),
	  Todo = require('../models/todo');

// Show All
exports.showAllTodos = function(req,res){
	Todo.find({}, function(err,todos){
		if(err){
			console.log(err);
		} else {
			res.render("todos", {todos: todos});
		}
	});
}

// Create
exports.createTodo = function(req,res){
	res.render("new");
}

exports.saveTodo = function(req,res){
	Todo.create(req.body.todo,function(err,newTodo){
		if(err){
			res.render("new");
			console.log(err); //DELETE
		} else {
			res.redirect("/todos");
			console.log(newTodo); //DELETE
		}
	});
}

// Show
exports.showTodo = function(req,res){
	Todo.findById(req.params.id, function(err, foundTodo){
		if(err){
			res.redirect("/todos");
		} else {
			res.render("show", {todo: foundTodo});
		}
	});
}

// Edit
exports.editTodo = function(req,res){
	Todo.findById(req.params.id, function(err, foundTodo){
		if(err){
			res.redirect("/todos");
		}else{
			res.render("edit",{todo: foundTodo});
		}
	});
}

// Update
exports.updateTodo = function(req,res){
	Todo.findByIdAndUpdate(req.params.id, req.body.todo, function(err, updatedTodo){
		if(err){
			res.redirect("/todos");
		} else {
			res.redirect("/todos/" + req.params.id);
		}
	});
}

// Delete
exports.deleteTodo = function(req,res){
	Todo.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/todos");
		}else{
			res.redirect("/todos");
		}
	});
}
