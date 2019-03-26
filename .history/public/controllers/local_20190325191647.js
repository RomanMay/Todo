
include("controllers/task.js")
function get(key) {
	return JSON.parse(localStorage.getItem(key)) || []
}

function save(key, tasksArray) {
	localStorage.setItem(key, JSON.stringify(tasksArray))
}

function getItem(key) {
	return localStorage.getItem(key)
}

function setItem(key, value) {
	localStorage.setItem(key, value)
}