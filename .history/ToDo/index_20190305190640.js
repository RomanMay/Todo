import express from 'express';
let app = express()

app.get('/', function (req, res){
	res.send('Hello word')
})
app.listen(3000, function(){
	console,log('')
})