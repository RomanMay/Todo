function include(url) {
	var script = document.createElement('local');
	script.src = url;
	document.getElementsByTagName('head')[0].appendChild(script);
}
include("javascripts/local.js")

let changeIsActive = null
let isCompleted = false

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
	let tasks = get('tasksArray')
	return tasks.find(task => task.id === id)
}

function changeTaskText(taskId, text) {
	let tasks = get('tasksArray')
	let result = []

	for (i = 0; i < tasks.length; i++) {
		if (tasks[i].id === taskId) {
			tasks[i].text = text
		}
		result.push(tasks[i])
	}
	save('tasksArray', result)

}


function deleteTask(taskId) {
	let tasks = get('tasksArray')
	let result = []

	for (i = 0; i < tasks.length; i++) {
		if (tasks[i].id === taskId) continue
		result.push(tasks[i])
	}
	return result
}

function completeTask(taskId) {
	let tasks = get('tasksArray')
	let result = []

	for (i = 0; i < tasks.length; i++) {
		if (tasks[i].id === taskId) {
			tasks[i].isCompleted = true
		}
		result.push(tasks[i])
	}
	save('tasksArray', result)

}

const removeButtonHandler = function (id) {

	let updatedTasks = deleteTask(id)
	save('tasksArray', updatedTasks)
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

	$('#' + id + '> .task_text').css("text-decoration", "line-through")
	completeTask(id)
	setItem("text-decoration", "line-through")

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
					<p class="task_text ">${task.text}</p>          
                </div>  `
	}

	function createTask(text) {
		let tasks = get('tasksArray')
		let task = {
			text,
			id: nextId++,
			isCompleted
		}
		tasks.push(task)
		save('tasksArray', tasks)
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

	let stringifyTasks = getItem('tasksArray')

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
	$('#add').keypress()

	window.onload = function () {

		$('p').css("text-decoration", getItem("text-decoration"))

	}

})
