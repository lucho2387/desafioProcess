const express = require('express')
const router = express.Router()
const { renderIndex, /*renderNosotros*/ } = require('../controllers/index.controller')

router.get('/', renderIndex)

// router.get('/nosotros', renderNosotros)

module.exports = router