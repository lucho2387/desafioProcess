const express = require('express')
const cookieParser = require("cookie-parser")
const handlebars = require('express-handlebars')
const path =  require('path')
const morgan = require('morgan')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require("connect-mongo")
// const parseArgs = require('minimist')
// const { fork } = require('child_process')

const advancedOptions = {
    useNewUrlParser: true,
    useunifiedTopology: true
}

const Producto = require('./models/Producto')
const Usuario = require('./models/Usuario')
const { isAuthenticated } = require('./middlewares/auth')
const { NAME, NAME_DATABASE, PASSWORD } = process.env

// Inicializacion
const app = express()
require('./config/passport')

// PUERTO
const param = (p) => {
    const index = process.argv.indexOf(p)
    return process.argv[index + 1]
}

const PORT = param("--PORT")

// Configuraciones
app.set('port', PORT || 8080)
app.set("views", path.join(__dirname, "views"));

// Motor de Plantilla (Handlebars)
app.engine(
    ".hbs",
    handlebars.engine({
      defaultLayout: "main",
      layoutsDir: path.join(app.get("views"), "layouts"),
      partialsDir: path.join(app.get("views"), "partials"),
      extname: ".hbs",
    })
  );
  app.set("view engine", ".hbs");

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${NAME}:${PASSWORD}@cluster0.9xnml.mongodb.net/${NAME_DATABASE}?retryWrites=true&w=majority`,
        mongoOptions: advancedOptions,
        ttl: 60
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Variables Globales
app.use((req, res, next) => {
  res.locals.mensaje = req.flash('mensaje')
  res.locals.error = req.flash('error')
  // res.locals.error = req.flash('error')
  res.locals.user = req.user || null;
  next()
})

app.get('/productos',isAuthenticated, async (req, res) => {
    const user = req.user
    const usuario = await Usuario.findById(user).lean()
    const productos = await Producto.find().lean()
    res.render('products/list-products', {usuario, productos})
})

app.get('/usuario/salir', async (req, res) => {
    const user = req.user
    const usuario = await Usuario.findById(user).lean()
    req.logout()
    req.flash('mensaje', `Hasta Luego ${usuario.nombre}`)
    res.redirect('/usuario/login')
})


app.get('/info', async (req, res) => {
    const util = require('util');
    const directorio = process.cwd()
    const ruta = process.execPath
    const procesoId = process.pid
    const nombrePlataforma = process.platform
    const versionNode = process.version
    const argumentoEntrada = process.argv
    const memoriaReservada = util.inspect(process.memoryUsage().rss)
    res.render('process/info',{directorio,ruta,procesoId,nombrePlataforma,versionNode,argumentoEntrada,memoriaReservada})
})

// app.get('/api/random', (req,res) => {
//     const numerosAleatorios = []
//     const cantidad = req.query.count
//     const child = fork('./src/forkNumeroAleatorio.js')
//     child.send(cantidad || 0)
//     child.on('message', (numeros) => {
//         var repetidos = {};
//         numeros.forEach((numero) =>{
//         repetidos[numero] = (repetidos[numero] || 0) + 1;
//         });
//         res.status(200).json({NumerosAleatorios: numeros, CantidadNumeroRepetidos: repetidos})
//     })
// })

// const numeros = () => {
//     const MAX = 50
//     const MIN = 1
//     return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
// }

// const http = require('http')

// const server = http.createServer()
// server.on('request', (req, res) => {
//     let { url } = req
//     const cantidad = req.query.count
//     if(url === '/api/random/:cantidad'){
//         const numerosAleatorios = []
        
//         if(cantidad){
//             for(let i=0; i< cantidad; i++){
//                 const numeroAleatorio = numeros()
//                 numerosAleatorios.push(numeroAleatorio)
//             }
//         }else {
//             for(let i=0; i< 999.999; i++){
//                 const numeroAleatorio = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
//                 numerosAleatorios.push(numeroAleatorio)
//             }
//         }
//         var repetidos = {};

//         numerosAleatorios.forEach((numero) =>{
//         repetidos[numero] = (repetidos[numero] || 0) + 1;
//         });
        
//         res.status(200).json({numerosAleatorios: numerosAleatorios, numeroRepetidos: repetidos})
//     }
// })

// app.get('/api/random', (req,res) => {
//     const numerosAleatorios = []
//     const cantidad = req.query.count
//     const MAX = 50
//     const MIN = 1
//     if(cantidad){
//         for(let i=0; i< cantidad; i++){
//             const numeroAleatorio = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
//             numerosAleatorios.push(numeroAleatorio)
//         }
//     }else {
//         for(let i=0; i< 999.999; i++){
//             const numeroAleatorio = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
//             numerosAleatorios.push(numeroAleatorio)
//         }
//     }

//     var repetidos = {};

//     numerosAleatorios.forEach((numero) =>{
//     repetidos[numero] = (repetidos[numero] || 0) + 1;
//     });
    
//     res.status(200).json({numerosAleatorios: numerosAleatorios, numeroRepetidos: repetidos})
// })

// Rutas
app.use(require('./routes/index.routes'))
app.use(require('./routes/productos.routes'))
app.use(require('./routes/usuarios.routes'))
app.use(require('./routes/random.routes'))

// Archivos Estaticos
app.use(express.static(path.join(__dirname, "public")));

module.exports = { app }
