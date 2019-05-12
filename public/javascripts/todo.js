const include = url => {
	let script = document.createElement('api')
	script.src = url;
	document.getElementsByTagName('head')[0].appendChild(script);
}
include("controllers/api.js")
let changeIsActive = null
let isCompleted = false
let containerTrue = $('.done')
let containerFalse = $('.toDo')
const removeButtonHandler = id => {
	deleteTask(id)
		.then(response => {
			console.log("TCL: response", response)
			$('#' + id).remove()
		})


}
const getTaskText = taskId => {
	const t = $('#' + taskId + '> .task_text')
	console.log(t, t.get(0).tagName)
	if (t.get(0).tagName === 'P') {
		return t.text()
	} else {
		return t.val()
	}
}

const editButtonHandler = id => {
	const text = getTaskText(id)
	if (changeIsActive !== null) {
		if (changeIsActive === id) {
			updateTask(id)
				.then(task => {
					task.title = text
					$('#' + id + '> .task_text').replaceWith(function () {
						return `<p class="task_text">${task.title}</p>`
					})
					$('#' + id + '> .change').text("Change")
					changeIsActive = null
				})
		}
	}

	else {
		changeIsActive = id
		$('#' + id + '> .task_text').replaceWith(() => {
			return `<input class="task_text" value="${text}">`
		})
		$('#' + id + '> .change').text("Save")
	}
}

const isCompleteButtonHandler = id => {
	updateTask(id)
		.then(task => {
			$('#' + task.id + '.task_container').remove()
			if (task.completed) {
				$('#' + task.id + '> .task_text').css('text-decoration', 'line-through')
				renderTask(task)
			} else {
				$('#' + task.id + '> .task_text').css('text-decoration', 'none')
				renderTask(task)
			}
		})
}

const getMaxId = arr => {
	let maxId = arr[0].id
	for (i = 1; i < arr.length; i++) {
		if (maxId < arr[i].id) {
			maxId = arr[i].id
		}
	}
	return maxId
}

let nextId = 0

const renderTask = task => {
	let taskView = `<div class="task_container" id="${task.id}">
                    <button class="btn add" id="add" onclick="isCompleteButtonHandler(${task.id})">&#10004;</button>
					<p class="task_text ${task.completed ? 'isCompleted' : ''}"  > ${task.title}</p >    
					<button class="btn remove" id="remove" onclick="removeButtonHandler(${task.id})">&#10008;</button>
					<button class="btn change" onclick="editButtonHandler(${task.id})">Change</button>      
				</div > `
	let selectedContainer = task.completed
		? containerTrue
		: containerFalse
	selectedContainer.prepend(taskView)
}

$(() => {

	$('#add').on('click', () => {
		let text = $("#task_input").val()
		createTask(text)
			.then(renderTask)
	})

	getAllTasks()
		.then(items => {
			if (items) {
				for (let i = 0; i < 10; i++) {
					renderTask(items[i])
					nextId = getMaxId(items) + 1
				}
			}
		})

	$('#task_input').on('keyup', () => {
		let val = $('#task_input').val()
		if (val.length >= 1) {
			$('#add').show(100)
		}
		else {
			$('#add').hide(100)
		}
	})
	$('#task_input').keypress(e => {
		if (e.keyCode == 13) {
			$('.enter').click()
		}
	})
})
