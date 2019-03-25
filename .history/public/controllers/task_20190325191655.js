function include(url) {
	var script = document.createElement('local')
	script.src = url;
	let scr = document.createElement('task')
	scr.src = url
	document.getElementsByTagName('head')[0].appendChild(script);
}

include("controllers/local.js")
include("controllers/task.js")
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
			tasks[i].isCompleted = !tasks[i].isCompleted
		}
		result.push(tasks[i])
	}
	save('tasksArray', result)

}
