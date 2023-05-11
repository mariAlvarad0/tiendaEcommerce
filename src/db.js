import {createPool} from 'mysql2/promise'

// Creamos la conexión con la BD
export const pool = createPool({
    user: 'root', 
    password: '123456',
    host: 'localhost', 
    port: '3306', 
    database: 'ecommerce'
})

