const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const Usuario = require('../models/Usuario')

// Almacenamos los datos del usuario en el navegador
passport.serializeUser((usuario, done) => {
    done(null, usuario.id)
})

// // Verificamos que exista el usuario
passport.deserializeUser((id, done) => {
   Usuario.findById(id, (err, usuario) => {
        done(null, usuario)
   })
   
})

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) =>{
    // Validamos si el correo coicide
    const usuario = await Usuario.findOne({email: email})
    if(!usuario){
        return done(null, false,{ message: 'El usuario no fue encontrado' })
    }else {
        const verificar = await usuario.compararPassword(password)
        if(verificar) {
            return done(null, usuario) 
        }else {
            return done(null, false, { message: 'La contraseña es incorrecta' })
        }
    } 
}))