export default function (app) {
	app.get('/login', require('./login'))
	app.get('/register', require('./register'))
}