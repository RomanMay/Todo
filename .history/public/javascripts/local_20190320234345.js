function get(key) {
	return JSON.parse(localStorage.getItem(key)) || []
}

function save(key, tasksArray) {
	localStorage.setItem(key, JSON.stringify(tasksArray))
}

