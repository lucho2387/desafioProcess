const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')


const UsuarioSchema = new Schema (
    {
    nombre : {
        type:String,
        required: true
    },
    email : {
        type:String,
        required: true,
        unique: true,
        trim: true
    },
    password : {
        type:String,
        required: true
    }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

UsuarioSchema.methods.encriptarContraseña = async (password) => {
    const cifrado = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, cifrado)
}

UsuarioSchema.methods.compararPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = model('Usuarios', UsuarioSchema)