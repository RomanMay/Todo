var express = require('express');
let app = express();

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.use(express.static('public'));
app.get('/', function (req, res) {
	res.render('index');

})
app.get('/', function (req, res) {
	res.render('login');

})
app.get('/register', function (req, res) {
	res.render('/register.ejs');

})


app.listen(process.env.PORT || 5000, function () {
	console.log('Example app listening on port 5000!')
})
