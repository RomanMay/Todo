export default function (app) {
	app.get('/login', require('./login').get)
	app.get('/register', require('./register'))
}