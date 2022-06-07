function random(min, max, cantidad) {
    const numerosAleatorios = []
    if(cantidad){
        for(let i=0; i< cantidad; i++){
            const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
            numerosAleatorios.push(numeroAleatorio)
        }
    }else {
        for(let i=0; i< 999.999; i++){
            const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
            numerosAleatorios.push(numeroAleatorio)
        }
    }
    
    return numerosAleatorios
}

process.on('message', (cantidad) => {
    const numeros = random(1,50,cantidad)
    process.send(numeros)
})