const { fork } = require('child_process')
const randomNumbersCtrl = {}


randomNumbersCtrl.randomNumbers = async (req, res) => {
    const cantidad = req.query.cantidad
    const child = fork('./src/forkNumeroAleatorio.js')
    child.send(cantidad || 0)
    child.on('message', (numeros) => {
        var repetidos = {};
        numeros.forEach((numero) =>{
        repetidos[numero] = (repetidos[numero] || 0) + 1;
        });
        res.status(200).json({NumerosAleatorios: numeros, CantidadNumeroRepetidos: repetidos})
    })
}   


module.exports = randomNumbersCtrl