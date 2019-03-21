var express = require('express');
let app = express();

const routes = require('./routes')

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.use(express.static('public'));
app.get('/', function (req, res) {
	res.render('index');

})
app.get('/login', function (req, res) {
	res.render('login');

})
app.get('/register', function (req, res) {
	res.render('register');

})
app.get('/api/auth', routes.auth)


app.listen(process.env.PORT || 5000, function () {
	console.log('Example app listening on port 5000!')
})
