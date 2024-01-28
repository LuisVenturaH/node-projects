const fs = require('node:fs/promises');

console.log('Leyendo el primer archivo...')
fs.readFile('./archivo.txt', 'utf-8')
.then(data=>{
    console.log('Primer archivo: ', data);
})

console.log('....Haciendo cosas mientras leemos el archivo...');

console.log('Leyendo segundo archivo....');
fs.readFile('./archivo2.txt', 'utf-8')
.then(data=>{
    console.log('Segundo archivo: ', data)
})