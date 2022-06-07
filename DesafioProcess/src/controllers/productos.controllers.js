const productosCtrl = {}

const Producto = require('../models/Producto')
const Usuario = require('../models/Usuario')

productosCtrl.renderPorductoForm = (req, res) => {
    res.render('products/new-product')
}

productosCtrl.createNewProduct = async (req, res) => {
try {
        const {nombre,descripcion,codigo,imagen,precio,stock} = req.body
        if(nombre && descripcion && codigo && precio && imagen && stock) {
            const nuevoProducto = new Producto ({nombre,descripcion,codigo,imagen,precio,stock})
            await nuevoProducto.save() 
            req.flash('mensaje', 'El producto fue guardado correctamente')
            // res.status(200).json({mensaje: "El producto fue guardado correctamente", id: nuevoProducto._id})
            res.redirect('/productos') 
        }else {
            res.status(500).json({error:"Los datos son requeridos"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

productosCtrl.renderEditForm = async (req, res) => {
    const producto = await Producto.findById(req.params.id).lean()
    
    res.render('products/edit-product', { producto })
}

productosCtrl.updateProduct = async (req, res) => {
    const { nombre, descripcion, codigo, imagen, precio, stock } = req.body
    await Producto.findByIdAndUpdate(req.params.id, { nombre, descripcion, codigo, imagen, precio, stock })
    req.flash('mensaje', 'El producto fue actualizado correctamente')
    res.redirect('/productos')
}

productosCtrl.deleteProduct = async (req, res) => {
    await Producto.findByIdAndDelete(req.params.id)
    req.flash('mensaje', 'El producto fue eliminado correctamente')
    res.redirect('/productos')
}

module.exports = productosCtrl

// exports.renderPorductoForm = (req, res) => {
//         res.json({mensaje:'Formulario de un Nuevo Producto'})
// }
