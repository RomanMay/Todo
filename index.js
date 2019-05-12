var express = require('express');
let app = express()
const router = require('./router')

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.use(express.static('public'));

app.use('/', router)

app.listen(process.env.PORT || 5000, function () {
	console.log('Example app listening on port 5000!')
})
