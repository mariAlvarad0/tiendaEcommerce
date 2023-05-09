// ARCHIVO PRINCIPAL PARA LAS RUTAS
import { Router } from 'express'

// Enrutador: Objeto que nos permite definir las rutas de nuestro servidor de express
const router = Router()

// Rutas de las pestañas
// Configuramos la ruta inicial de nuestro explorador. Es decir lo que le responderá al servidor. 
router.get('/', (req, res) => res.render('index', { title: 'Flowers for Chuu' }))
router.get('/transaccion', (req, res) => res.render('transaccion', { title: 'Tramitar pedido' }))
router.get('/leerMas', (req, res) => res.render('leerMas', { title: 'Leer Más' }))

export default router 

// req: información que me envía el navegador, res: información que el servidor le envía al navegador