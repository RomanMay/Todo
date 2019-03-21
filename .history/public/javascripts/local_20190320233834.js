function get(key) {
	return JSON.parse(localStorage.getItem(key)) || []
}
function save(key, tasksArray) {
	localStorage.setItem('tasksArray', JSON.stringify(tasks))
}