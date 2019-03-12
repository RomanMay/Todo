var express = require('express');
let app = express();

app.get('/index.html', function (req, res) {
	res.send('Hello word')
})
app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
})