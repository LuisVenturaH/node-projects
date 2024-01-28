// Forma de subir el servidor con Express

const express = require('express')
const app = express()
const port = 3000

app.get('/', (rea, res) => {
    res.send('Ola, k ase!!')
})
app.listen(port, () => {
    console.log(`Servidor levantado y escuchando en http://localhost:${port}`)
})