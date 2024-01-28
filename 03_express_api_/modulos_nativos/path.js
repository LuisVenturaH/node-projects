const path = require('node:path');

// Barra separadora de directorios según el sistema operativo
console.log(path.sep);

// Unir las rutas con path.join()
const filePath = path.join('content', 'subfolders', 'archivo.txt');
console.log(filePath);

const base = path.basename('./archivo', '.txt');
console.log(base);

const extension = path.extname('imagen.jpg');
console.log(extension);