const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter');

dotenv.config();

//Indicamos el puerto
const PORT = process.env.PORT;

const app = express();

// Middleware de express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use('/user', userRouter)

app.listen(PORT, () =>
    console.log(`Server is up in port ${PORT}`)    
);
