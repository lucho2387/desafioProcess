const auth = {}

auth.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        
        return next()
    }
    req.flash('error', 'Ruta no autorizada')
    res.redirect('/usuario/login')
}

auth.isAuthenticatedLogin = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next()
    }
    req.flash('error', 'El tiempo de session a expirado')
    res.redirect('/usuario/login')
}

module.exports = auth
