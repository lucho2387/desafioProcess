const express = require('express')
const router = express.Router()
const { 
    renderRegistroForm,
    register,
    renderLoginForm,
    login,
    logout
 } = require('../controllers/usuarios.controller')

router.get('/usuario/registro', renderRegistroForm)

router.post('/usuario/registro', register)

router.get('/usuario/login', renderLoginForm)

router.post('/usuario/login', login)

module.exports = router
