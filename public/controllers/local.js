const url = 'https://jsonplaceholder.typicode.com'
const devUrl = 'https://todolistq.herokuapp.com'
const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJBZG1pbiIsImV4cCI6MTU1MzIwNDEwNCwiaWF0IjoxNTUzMjAzNTA0fQ.XdONXsbRXZlLKdDsX1oXTfEZEOydO11ZI7L19XsOVAM'
const refresh_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjF9.SmhmOUR5cVJHRmp0R0I4RU9yblhhWDJweVEyUEJLWDZRKzFUUlpBR21LQT0='

function get(key) {
	return JSON.parse(localStorage.getItem(key)) || []
}

function save(key, tasksArray) {
	localStorage.setItem(key, JSON.stringify(tasksArray))
}

function createTask(taskText, callback) {
	$.ajax({
		url: `${url}/todos`,
		type: 'POST',
		data: JSON.stringify({
			title: taskText,
			completed: false
		}),
		headers: {
			"Content-Type": "application/json"
		},
	})
		.done(response => {
			callback(response)
		})
}

function deleteItem(id, callback) {
	$.ajax({
		url: `${url}/todos/${id}`,
		type: "DELETE"
	})
		.done(response => {
			callback(response)
			console.log("TCL: deleteItem -> response", response)

		})
}

function getItem(callback) {
	$.get({
		url: `${url}/todos`,
		headers: {
			access_token,
			refresh_token
		}
	})
		.done(response => {
			callback(response)

		})
}

function setItem(key, value) {
	localStorage.setItem(key, value)
}