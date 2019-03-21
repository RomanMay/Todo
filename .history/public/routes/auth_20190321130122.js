const express = require('express')
const router = express.router()

router.post('/register', (req, res) => {
	res.json({
		ok: true
	})
})