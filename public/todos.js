(function () {
    'use strict';
    var init = function init() {
    	let doneCheckboxes = document.querySelectorAll('.done-checkbox');
    	let doneForms = document.querySelectorAll('.done-form');
    	let doneTodos = document.querySelectorAll('.done-checkbox');

    	for(let i = 0; i < doneForms.length; i++){
    		doneCheckboxes[i].addEventListener('change', function() {
			    doneForms[i].submit();
			});
    	}

    	let todos =  document.querySelectorAll('.todo');
    	// Make filter
    	let filter = document.querySelector('#filter');
    	let todoClass = null;
    	filter.addEventListener('change', function() {
    		switch (this.value) {
				case 'do':
					todos.forEach(function(todo){
						todoClass = todo.classList;
						if(todoClass.contains('done-todo')){
							todo.style.display = "none";
						}else{
							todo.style.display = "flex";
						}
					});
					break;
				case 'done':
					todos.forEach(function(todo){
						todoClass = todo.classList;
						if(!todoClass.contains('done-todo')){
							todo.style.display = "none";
						}else{
							todo.style.display = "flex";
						}
					});
					break;
			  	case 'all':
					todos.forEach(function(todo){
						todo.style.display = "flex";
					});
					break;
				default:
    				break;
			}
    	});
	}
	window.addEventListener('load', init);
}());