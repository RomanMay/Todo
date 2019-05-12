
const url = 'https://jsonplaceholder.typicode.com'
const devUrl = 'https://todolistq.herokuapp.com'
const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJBZG1pbiIsImV4cCI6MTU1MzIwNDEwNCwiaWF0IjoxNTUzMjAzNTA0fQ.XdONXsbRXZlLKdDsX1oXTfEZEOydO11ZI7L19XsOVAM'
const refresh_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjF9.SmhmOUR5cVJHRmp0R0I4RU9yblhhWDJweVEyUEJLWDZRKzFUUlpBR21LQT0='

const updateTask = id => {
	return _getTask(id)
		.then(task => {
			task.completed = !task.completed
			return _updateTask(task)
		})
}

const _updateTask = task => {
	return axios({
		url: `${url}/todos/${task.id}`,
		method: 'put',
		data: JSON.stringify({
			title: task.title,
			completed: task.completed,
		}),
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(response => {
			return response.data
		})
}

const createTask = taskText => {
	return axios({
		url: `${url}/todos`,
		method: 'POST',
		data: JSON.stringify({
			title: taskText,
			completed: false
		}),
		headers: {
			"Content-Type": "application/json"
		},
	})
		.then(response => {
			console.log("TCL: response", response)
			return response.data
		})
}

const deleteTask = (id) => {
	return axios.delete(`${url}/todos/${id}`)
		.then(response => {
			return response.data
		})
}

const _getTask = (id) => {
	return axios.get(`${url}/todos/${id}`)
		.then(response => {
			console.log("TCL: getTask -> response", response)
			res = response.data
			console.log("TCL: getTask -> res", res)
			return res
		})
}

const getAllTasks = () => {
	return axios.get(`${url}/todos`)
		.then(response => {
			res = response.data
			return res
		})
}

