const carro = new Carrito()
const carrito = document.getElementById('carrito')
const productos = document.getElementById('lista-productos')
const listaProductos = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.getElementById('vaciar-carrito')
const procesarPedidoBtn = document.getElementById('procesar-pedido')

function cargarEventos() {
    //Dispara cuando se presiona agregar carrito
    productos.addEventListener('click', (e) => { carro.comprarProducto(e) })

    //Cuando se elimina producto del carrito
    carrito.addEventListener('click', (e) => { carro.eliminarProducto(e) })

    // //Al vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', (e) => { carro.vaciarCarrito(e) })

    // Al cargar el documento, mostrar el LocalStorage
    document.addEventListener('DOMContentLoaded', carro.leerLocalStorage())

    //Enviar a otra pagina
    procesarPedidoBtn.addEventListener('click', (e) => { carro.procesarPedido(e) })
}

cargarEventos()