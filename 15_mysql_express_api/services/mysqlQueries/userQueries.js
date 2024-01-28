const db = require('../mysql')
const moment = require('moment')
const md5 = require('md5')
const { removeUndefinedKeys } = require('../../utils/utils')

const userQueries = {}

userQueries.getUserByEmail = async (email) => {
    // Conectamos con la base de datos y buscamos si existe el usuario por el email.
    let conn = null
    try {
        conn = await db.createConnection()
        return await db.query('SELECT * FROM users WHERE email = ?', email, 'select', conn)
    } catch (e) {
        throw new Error(e)
    } finally {
        conn && await conn.end();
    }
}

userQueries.addUser = async (userData) => {
    // Conectamos con la base de datos y añadimos el usuario.
    let conn = null
    try {
        conn = await db.createConnection()
        // Creamos un objeto con los datos del usuario a guardar en la base de datos.
        // Encriptamos la password con md5 y usamos la librería momentjs para registrar la fecha actual
        let userObj = {
           name: userData.name,
           surname: userData.surname,
           email: userData.email,
           password: md5(userData.password),
           registrer_date: moment().format("YYYY-MM-DD HH:mm:ss")
        }
        return await db.query('INSERT INTO users SET ?', userObj, 'insert', conn)
    } catch (e) {
       throw new Error(e)
    } finally {
        conn && await conn.end();
    }
}

userQueries.deleteUser = async (id) => {
    // Conectamos con la base de datos y buscamos si existe el usuario por el id.
    let conn = null
    try {
        conn = await db.createConnection()
        return await db.query('DELETE from users WHERE id = ?', id, 'delete', conn)
    } catch (e) {
        throw new Error(e)
    } finally {
        conn && await conn.end()
    }
}

userQueries.getUserById = async (id) => {
    // Conectamos con la base de datos y buscamos si existe el usuario por el id.
    let conn = null
    try {
        conn = await db.createConnection()
        return await db.query('SELECT * from users WHERE id = ?', id, 'select', conn)
    } catch (e) {
        throw new Error(e)
    } finally {
        conn && await conn.end()
    }
}

userQueries.updateUser = async (id, userData) => {
    // Conectamos con la base de datos y añadimos al usuario
    let conn = null
    try {
        conn = await db.createConnection()
        // Creamos un objeto con los datos que nos pueden llegar del usuairo a modificar en base de datos
        // Encriptamos la password con md5 si nos llega por el body, sino la declaramos como undefined
        // y usamos la libreria moment para actualizar la fecha
        let userObj = {
            name: userData.name,
            surname: userData.surname,
            email: userData.email,
            password: userData.password ? md5(userData.password) : undefined,
            update_date: moment().format('YYYY-MM-DD HH:mm:ss')
        }
        // Eliminamos los campos que no se van a modificar (los que no llegan por el body)
        userObj = await removeUndefinedKeys(userObj)

        return await db.query('UPDATE users SET ? WHERE id = ?', [userObj, id], 'update', conn)
    } catch(e) {
        throw new Error(e)
    } finally {
        conn && await conn.end()
    }
}

userQueries.getUsers = async () => {
    // Conectamos con la base de datos y buscamos si existe el usuario por el id.
    let conn = null
    try {
        conn = await db.createConnection()
        return await db.query('SELECT * from users', null, 'select', conn)
    } catch (e) {
        throw new Error(e)
    } finally {
        conn && await conn.end()
    }
}

module.exports = userQueries