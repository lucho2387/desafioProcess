const express = require('express')
const router = express.Router()
const { randomNumbers } = require('../controllers/random.controller')

router.get('/api/random', randomNumbers)

module.exports = router