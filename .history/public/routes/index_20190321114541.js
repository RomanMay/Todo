module.exports = function(app){
	app.get('/login', require('./login'))
}