var express = require('express');
let app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.logger());
app.get('/', function (req, res) {
	res.render('index');
})

var port = process.env.PORT || 5000;
app.listen(port, function () {
	console.log("Listening on " + port);
});