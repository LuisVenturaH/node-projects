const fs = require('node:fs');

fs.readdir('.', (err, files) => { // El primer parámetro '.' indica la ruta. el punto es para la ruta al mismo nivel. El .// ruta anterior
    if (err) throw err
    files.forEach(file => {
        console.log(file)
    })
})