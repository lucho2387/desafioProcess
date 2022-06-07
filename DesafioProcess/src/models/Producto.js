const { Schema, model } = require('mongoose')


const ProductoSchema = new Schema (
    {
    nombre : {
        type:String,
        required: true
    },
    descripcion : {
        type:String,
        required: true
    },
    codigo : {
        type:String,
        required: true,
        unique: true
    },
    imagen : {
        type:String,
        required: true
    },
    precio : {
        type:Number,
        required: true
    },
    stock : {
        type:Number,
        required: true
    }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = model('Productos', ProductoSchema)