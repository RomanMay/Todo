let changeIsActive
function getTasksFromStorage() {
	return JSON.parse(localStorage.getItem('tasksArray')) || []
}

function saveTasksToStorage(tasks) {
	localStorage.setItem('tasksArray', JSON.stringify(tasks))
}

function changeTask(id, text) {
	if (changeIsActive) {
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
		$('#' + task.id + '> .task_text').replaceWith(function () {
			return `<input class="task_text" value="${task.text}">`
		})
		$('#' + task.id + '> .change').text("Save")
		$('#' + task.id + '> .change').on('click', function () {
			let newTaskValue = $('#' + task.id + '> .task_text').val()
			localStorage.setItem('taskArray', newTaskValue)
			task.text = newTaskValue
		})
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
			tasks.text = text
		}
		result.push(tasks[i])
	}
	return result
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

const removeButtonHandler = function (id) {

	let updatedTasks = deleteTask(id)
	saveTasksToStorage(updatedTasks)
	$('#' + id).remove()
}
const editButtonHandler = function (id) {
	let returnTask = getTasksFromStorage()
	let getTaskId = returnTask.filter(function (task) {
		return task.id == id
	})
	let text
	if (changeIsActive) {
		 text = $('.task_text').val()
		 localStorage.setItem('taskArray', text)
		task.text = text
	}
	changeTask(id, text)


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
                    <button class="btn " id="add">&#10004;</button>
                    <button class="btn " id="remove" onclick="removeButtonHandler(${task.id})">&#10008;</button>
					<button class="btn change" id="" onclick="editButtonHandler(${task.id})">Change</button>
					<p class="task_text">${task.text}</p>          
                </div>  `
	}

	function createTask(text) {
		let tasks = getTasksFromStorage()
		let task = {
			text,
			id: nextId++
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
