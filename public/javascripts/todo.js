function include(url) {
	let script = document.createElement('local')
	script.src = url;
	let scr = document.createElement('task')
	scr.src = url
	document.getElementsByTagName('head')[0].appendChild(script);
}

include("controllers/local.js")
include("controllers/task.js")

const removeButtonHandler = function (id) {
	deleteItem(id, response => {
		console.log("TCL: removeButtonHandler -> responseId", id)
		$('#' + id).remove()
	})


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
}

function getMaxId(arr) {
	let maxId = arr[0].id

	for (i = 1; i < arr.length; i++) {
		if (maxId < arr[i].id) {
			maxId = arr[i].id
		}
	}
	return maxId
}

let nextId = 0

function generateTaskView(task) {
	return `<div class="task_container" id="${task.id}">
                    <button class="btn " id="add" onclick="isCompleteButtonHandler(${task.id})">&#10004;</button>
                    <button class="btn " id="remove" onclick="removeButtonHandler(${task.id})">&#10008;</button>
					<button class="btn change" onclick="editButtonHandler(${task.id})">Change</button>
					<p class="task_text ${task.completed ? 'lineThrough' : ''}"  > ${task.title}</p >          
                </div > `
}

$(() => {


	$('#add').on('click', function () {
		let text = $("#task_input").val()
		createTask(text, items => {
			$(".container").append(generateTaskView(items))
			$('.container').last()
		})

	})

	getItem(items => {
		save('itemsArray', items)
		if (items) {
			for (let i = 0; i < items.length; i++) {
				$(".container").append(generateTaskView(items[i]))
				nextId = getMaxId(items) + 1
			}

			console.log("TCL: items", items)

		}
	})

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
	$('#task_input').keypress(function (e) {
		if (e.keyCode == 13) {
			$('.enter').click()
		}
	})


})
