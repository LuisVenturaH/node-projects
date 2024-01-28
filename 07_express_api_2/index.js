// importamos el modulo express
const express = require('express')
// impoirtamos el modulo dotenv
const dotenv = require('dotenv')
dotenv.config()
// importamos accountRouter
const accountRouter = require("./routes/accountRouter");
const authRouter = require("./routes/authRouter")

// Añadimos el método config de dotenv
dotenv.config();

const logger = require('morgan')

// Definimos el puerto
const port = process.env.PORT
const app = express()

// Middleware para interpretar el formato json y text enviados desde el cliente por HTTP
app.use(express.json())
app.use(express.text())
app.use(logger('dev'))

app.use("/account", accountRouter)

// middleware que hemos importado del router authRouter
app.use("/auth", authRouter);



// Levantamos el servidor en el puerto 3000
app.listen(port, () => {
    console.log(`Server is up and running in port ${port}!!!`)
})

