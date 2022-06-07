const mongoose = require('mongoose')
// const config = require('./config')


const { NAME, NAME_DATABASE, PASSWORD } = process.env
// const { HOST, NAME_DATABASE } = process.env
// const MONGODB_URI = `mongodb://${HOST}/${NAME_DATABASE}`
const MONGODB_URI2 = `mongodb+srv://${NAME}:${PASSWORD}@cluster0.9xnml.mongodb.net/${NAME_DATABASE}?retryWrites=true&w=majority` 

mongoose.connect(MONGODB_URI2, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log(`BD ${NAME_DATABASE} Conectada`))
    .catch (error => console.error(error))

