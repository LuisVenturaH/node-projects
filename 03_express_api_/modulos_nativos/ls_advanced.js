const fs = require('node:fs/promises');
const path = require(`node:path`);

// Extraemos el segundo argumento de process.argv (el directorio). Utilizamos el operador nullish coalescing para evitar undefined
// Si se cumple asigna el punto al directorio y toma los datos del directorio en donde nos encontramos
const folder = process.argv[2] ?? '.';

async function ls (folder) {
    let files
    try {
        files = await fs.readdir(folder)
    }
    catch (err) {
        console.error(`Error al leer el directorio ${folder}`)
        process.exit(1) // Con esto se sale del proceso
    }

    const filesPromises = files.map(async file =>{
        const filePath = path.join(folder, file)
        let stats
        try {
            stats = await fs.stat(filePath) // Información del archivo
        }
        catch (err) {
            console.error(`Error al lerr el directorio ${filePath}`, err)
            process.exit(1)
        }

        const isDirectory = stats.isDirectory()
        const fileType = isDirectory ? 'd' : 'f' //D = directory F = file
        const fileSize = stats.size.toString()
        const fileModified = stats.mtime.toLocaleString()

        return `${fileType} ${file.padEnd(20)} ${fileSize.padStart(10)} ${fileModified}`
    })

    const fileInfo = await Promise.all(filesPromises)

    fileInfo.forEach(file => console.log(file))
}
ls(folder)