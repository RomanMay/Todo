const express = require('express')
const router = express.Router()

router.post('/register', (req, res) => {
	res.json({
		ok: true
	})
})
module.exports = router;