// Variables
var newTaskForm = document.querySelector('.new-task-container form');
var tasksContainer = document.querySelector('.tasks-container ul');

// On DOM load
document.addEventListener('DOMContentLoaded', function () {
	bindAddTaskEvents();
	showTasks();
});

// Add new task
function addNewTaskToHTML(title) {
	var taskLi = document.createElement('li');

	taskLi.classList.add('single-task');
	taskLi.innerHTML = prepareTaskHTML(title);

	// Events - toggle and delete
	var deleteBtn = taskLi.querySelector('.delete-task-btn');

	deleteBtn.addEventListener('click', function () {
		deleteTask(this, title);
	});

	// Add task to DOM
	tasksContainer.appendChild(taskLi);
}

function addNewTaskToLocalStorage(title) {
	if (localStorage.getItem('lsTasks') === null) {
		var lsTasks = [];
		lsTasks.push(title);
		localStorage.setItem('lsTasks', JSON.stringify(lsTasks));
	}
	else {
		var lsTasks = JSON.parse(localStorage.getItem('lsTasks'));
		lsTasks.push(title);
		localStorage.setItem('lsTasks', JSON.stringify(lsTasks));
	}
}

// Prepare HTML before adding new task
function prepareTaskHTML(title) {
	return '<div class="input-group">' +
		'<input type="text" class="form-control" placeholder="Tytuł zadania..." value="' + title + '">' +
		'<span class="input-group-btn">' +
		'<button class="btn btn-danger delete-task-btn"><i class="fa fa-times"></i></button>' +
		'</span>' +
		'</div>';
}

function showTasks() {
	//Get tasks from localStorage and add them to HTML
	if (localStorage.getItem('lsTasks') !== null) {
		var lsTasks = JSON.parse(localStorage.getItem('lsTasks'));
		lsTasks.forEach(function (element) {
			addNewTaskToHTML(element);
		});
	}
}

// Handle new task form events
function bindAddTaskEvents() {
	// Add event listener On submit
	newTaskForm.addEventListener('submit', function (event) {
		event.preventDefault();
		var title = this.querySelector('input').value;
		if (title) {
			addNewTaskToHTML(title);
			addNewTaskToLocalStorage(title);
			this.querySelector('input').value = '';
		}
	});
}

// Delete task
function deleteTask(deleteBtn, title) {
	//Delete task from HTML
	var liToDelete = deleteBtn.closest('li');
	deleteBtn.closest('ul').removeChild(liToDelete);
	// Delete task from localStorage
	var lsTasks = JSON.parse(localStorage.getItem('lsTasks'));
	for (var i = 0; i < lsTasks.length; i++) {
		if (lsTasks[i] === title) {
			lsTasks.splice(i, 1);
		}
	}
	localStorage.setItem('lsTasks', JSON.stringify(lsTasks));
}