// Ruta para iniciar express
import express from 'express'

// Módulo para definir las rutas
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

// Importamos las rutas (urls que enviaremos al servidor)
import indexRoutes from './routes/index.js' 

const app = express() // Ejecuta express y recibe un objeto

// Configuración del servidor
// Configuramos un puerto. Escuchará a través del puerto que tengamos configurado en el servidor o en el S.O. En caso contrario, escuchará a través del puerto 3000
app.set('port', process.env.PORT || 3000)

// Start the server
app.listen(app.get('port'), () => { console.log('Server is listening on port', app.get('port')) })

// Ruta dinámica para obtener la ruta abosuta de los archivos. 
const __dirname = dirname(fileURLToPath(import.meta.url))

// Configuramos el acceso a la carpeta 'views'. Se concatena el directorio con la carpeta de las vistas
app.set('views', join(__dirname, 'views'))
// Configuramos el motor de plantillas, en este caso utilizaremos ejs.
app.set('view engine', 'ejs')

// Acceso a las rutas de los html
app.use(indexRoutes)

// Static files 
// Con el módulo static de expres, uniremos el directorio con la carpeta public que contendrá nuestros archivos estáticos. 
app.use(express.static(join(__dirname, 'public')))

// Interpretar datos JSON. Recibe los datos y los convierte en un JSON y luego se lo pasa a la BD
app.use(express.json())

// Si un usuario busca una ruta que no existe
app.use((req, res, next) => {
    res.status(404).json({
        message: 'API not found'
    })
})
