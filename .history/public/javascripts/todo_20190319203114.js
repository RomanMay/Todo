let changeIsActive = null
let isCompleted = false
function getTasksFromStorage() {
	return JSON.parse(localStorage.getItem('tasksArray')) || []
}

function saveTasksToStorage(tasks) {
	localStorage.setItem('tasksArray', JSON.stringify(tasks))
}

function changeTask(id, text) {
	if (changeIsActive !== null) {

		if (changeIsActive === id) {
			changeTaskText(id, text)
			$('#' + id + '> .task_text').replaceWith(function () {
				return `<p class="task_text">${text}</p>`
			})
			$('#' + id + '> .change').text("Change")
			changeIsActive = null
		}


	} else {
		changeIsActive = id
		const task = getTaskById(id)
		console.log(task)
		$('#' + task.id + '> .task_text').replaceWith(function () {
			return `<input class="task_text" value="${task.text}">`
		})
		$('#' + task.id + '> .change').text("Save")

	}


}

function getTaskById(id) {
	let tasks = getTasksFromStorage()
	return tasks.find(task => task.id === id)
}

function changeTaskText(taskId, text) {
	let tasks = getTasksFromStorage()
	let result = []

	for (i = 0; i < tasks.length; i++) {
		if (tasks[i].id === taskId) {
			tasks[i].text = text
		}
		result.push(tasks[i])
	}
	saveTasksToStorage(result)

}


function deleteTask(taskId) {
	let tasks = getTasksFromStorage()
	let result = []

	for (i = 0; i < tasks.length; i++) {
		if (tasks[i].id === taskId) continue
		result.push(tasks[i])
	}
	return result
}

function completeTask(taskId) {
	let tasks = getTasksFromStorage()
	let result = []

	for (i = 0; i < tasks.length; i++) {
		if (tasks[i].id === taskId) {
			tasks[i].isCompleted = true
		}
		result.push(tasks[i])
	}
	saveTasksToStorage(result)

}

const removeButtonHandler = function (id) {

	let updatedTasks = deleteTask(id)
	saveTasksToStorage(updatedTasks)
	$('#' + id).remove()
}
const editButtonHandler = function (id) {
	let text
	if (changeIsActive !== null) {
		text = $('#' + id + '> .task_text').val()
	}

	changeTask(id, text)
}

const isCompleteButtonHandler = function (id) {

	$('#' + id ).addClass("text-decoration", "line-through")

	completeTask(id)
}

$(() => {
	let nextId = 0

	function disableInputs() {
		$('.task_out').attr("disabled", true)
	}

	function enableInputs() {
		$('.task_out').attr("disabled", false)
	}

	function generateTaskView(task) {
		return `<div class="task_container" id="${task.id}">
                    <button class="btn " id="add" onclick="isCompleteButtonHandler(${task.id})">&#10004;</button>
                    <button class="btn " id="remove" onclick="removeButtonHandler(${task.id})">&#10008;</button>
					<button class="btn change" onclick="editButtonHandler(${task.id})">Change</button>
					<p class="task_text">${task.text}</p>          
                </div>  `
	}

	function createTask(text) {
		let tasks = getTasksFromStorage()
		let task = {
			text,
			id: nextId++,
			isCompleted
		}
		tasks.push(task)
		saveTasksToStorage(tasks)
		return task
	}

	$('#add').on('click', function () {
		let text = $("#task_input").val()
		let task = createTask(text)
		let generatedView = console.log(generateTaskView(task))
		$(".container").append(generateTaskView(task))
		$('.container').last()
	})

	function getMaxId(arr) {
		let maxId = arr[0].id

		for (i = 1; i < arr.length; i++) {
			if (maxId < arr[i].id) {
				maxId = arr[i].id
			}
		}
		return maxId
	}

	let stringifyTasks = localStorage.getItem('tasksArray')

	if (stringifyTasks) {

		let parseArray = JSON.parse(stringifyTasks)
		for (let i = 0; i < parseArray.length; i++) {
			$(".container").append(generateTaskView(parseArray[i]))
			nextId = getMaxId(parseArray) + 1
		}
	}

	$('#task_input').on('keyup', function () {
		let $this = $(this)
		let val = $this.val()

		if (val.length >= 1) {
			$('#add').show(100)
		}
		else {
			$('#add').hide(100)
		}
	})

})
