const fs = require('node:fs');

console.log('Leyendo el primer archivo...');
fs.readFile('./archivo.txt', 'utf-8', (err, data)=>{
    if (err) throw err
    console.log('Primer archivo: ', data)
})

console.log('.... haciendo cosas mientras leemos el archivo...');

console.log('Leyendo el segundo archivo...');
fs.readFile('./archivo2.txt', 'utf-8', (err, data)=>{
    console.log('Segundo archivo: ', data)
})