var express = require('express');
let app = express();

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.use(express.static('public'));
app.get('/', function (req, res) {
	res.render('index');
	res.render('login');
	res.render('register');
})

app.listen(process.env.PORT || 5000, function () {
	console.log('Example app listening on port 5000!')
})
