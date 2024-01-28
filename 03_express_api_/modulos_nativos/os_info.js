const os = require('node:os') // node:os carga el modulo os. La sintaxis es node seguido del nombre del módulo

console.log('Sistema operativo: ', os.platform());
console.log('Versión sistema operativo: ', os.release());
console.log('Arquitectura del SO:', os.arch());
console.log('Memoria total: ', os.totalmem()/ 1024 /1024);
console.log('Memoria libre: ', os.freemem()/ 1024 /1024);
console.log('Numero de procesadores: ', os.cpus());
console.log('Uptime: ', os.uptime()/ 60 / 60);