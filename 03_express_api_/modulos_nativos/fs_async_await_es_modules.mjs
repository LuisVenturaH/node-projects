import { readFile } from 'node:fs/promises';

console.log('Leyendo el primer archivo....');
const text = await readFile('./archivo.txt', 'utf-8');
console.log('Primer archivo: ', text);

console.log('Haciendo cosas mientras leemos el archivo...');

console.log('Leyendo el segundo archivo....');
const text2 = await readFile('./archivo2.txt', 'utf-8');
console.log('Segundo archivo: ', text2);