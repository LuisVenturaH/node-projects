const express = require('express')
const dotenv = require('dotenv')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/userRouter')
const productRouter = require('./routes/productRouter')
const orderRouter = require('./routes/orderRouter')
const path = require('path')
const fileUpload = require('express-fileupload')


dotenv.config()

//Indicamos el puerto
const PORT = process.env.PORT
const app = express()

// Middleware de express
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))


// Instanciamos la libreria file updoad y le añadimos la propiedad
app.use(
    fileUpload({
        createParentPath: true, // Crea la carpeta que le indiquemos si no ha sido creada
        limits: { fileSize: 20 * 1024 * 1024 }, // Limitamos el tamaño de la imagen a 20mb. Por defecto son 50mb
        abortOnLimit: true, // Interrumpe la carga de imagen si supera el limite específicado
        responseOnLimit: 'Imagen demasiado grande', // Enviamos un mensaje de respuesta cuando se interrupone la carga
        uploadTimeout: 0 // Indicamos el tiempo de respuesta si se interrumpe la carga de la imagen
    })
)

// API middleware siempre van antes de app.listen
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/order', orderRouter)


app.listen(PORT, () =>
    console.log(`Server is up in port ${PORT}`)    
);
