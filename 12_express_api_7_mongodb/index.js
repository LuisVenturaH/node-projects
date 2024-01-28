// importamos el modulo express
const express = require('express')
// importamos el modulo dotenv
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

dotenv.config()
// importamos accountRouter
const accountRouter = require("./routes/accountRouter");
const authRouter = require("./routes/authRouter")
const authSessionRouter = require('./routes/authSessionRouter');
const authTokenRouter = require('./routes/authTokenRouter');

// Añadimos el método config de dotenv
dotenv.config();

const logger = require('morgan');
const mongodbConnection = require('./services/mongodb');

// Definimos el puerto
const port = process.env.PORT
const app = express()

// Middleware para interpretar el formato json y text enviados desde el cliente por HTTP
app.use(express.json())
app.use(express.text())
app.use(logger('dev'))
app.use(cookieParser())

// middleware que hemos importado del router accountRouter
app.use("/account", accountRouter)
app.use("/auth", authRouter);
app.use("/auth-session", authSessionRouter)
app.use("/auth-token", authTokenRouter)

const main = async () => {
    try{
        await mongodbConnection()
        console.log('Database connection OK!')
        app.listen(port, () => console.log(`Server is up and running`)) // Se levanta el servidor desde aquí
    }
    catch (e) {
        console.log('Error in database connection: ', e.message)
    }
}

main()

