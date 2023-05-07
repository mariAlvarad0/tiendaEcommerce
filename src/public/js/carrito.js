const stockProductos = [
    {
        id: 1,
        nombre: "Ramo",
        cantidad: 1,
        desc1: "Rosas(4)",
        desc2: "Lirios (7)",
        desc3: "Nardos (10)",
        desc4: "Jazmín(3)",
        precio: 90,
        img: "img/carrito/ramo.jpg"
    },
    {
        id: 2,
        nombre: "Mesa",
        cantidad: 1,
        desc1: "Metros(2)",
        desc2: "Claveles (50)",
        desc3: "Crisantemos (18)",
        desc4: "Greenery (Si)",
        precio: 110,
        img: "img/carrito/mesa.jpg"
    },
    {
        id: 3,
        nombre: "Arco",
        cantidad: 1,
        desc1: "Rosas(20)",
        desc2: "Vezas (70)",
        desc3: "Passiflora(90)",
        desc4: "Lantana(40)",
        precio: 200,
        img: "img/carrito/arco.jpg"
    },
    {
        id: 4,
        nombre: "Cesta",
        cantidad: 1,
        desc1: "Acacia(4)",
        desc2: "Caléndula(7)",
        desc3: "Jaramago (2)",
        desc4: "Greenery(Si)",
        precio: 90,
        img: "img/carrito/cesta.jpg"
    }
]

let carrito = []

const contenedor = document.querySelector('#contenedor-ventas')

const carritoContenedor = document.querySelector('#carritoContenedor')

const vaciarCarrito = document.querySelector('#vaciarCarrito')

const precioTotal = document.querySelector('#precioTotal')

const procesarCompra = document.querySelector('#procesarCompra')

const activarFuncion = document.querySelector('#activarFuncion')

const totalProceso = document.querySelector('#totalProceso')

const formulario = document.querySelector('#procesar-pago')

// Validación para que aparezca en la página de tramitar productos la lista de la compra
if (activarFuncion) {
    activarFuncion.addEventListener('click', procesarPedido)
}

if (formulario) {
    formulario.addEventListener('submit', enviarPedido)
}
// Evitar que al recargar la página se eliminen los productos que teníamos en la cesta de la compra
document.addEventListener('DOMContentLoaded', () => {
    carrito = JSON.parse(localStorage.getItem('carrito')) || []
    mostrarCarrito()

    if (activarFuncion) {
        document.querySelector('#activarFuncion').click(procesarPedido)
    }
})

// Recorremos todos los productos del stock
stockProductos.forEach(prod => {
    const { id, nombre, desc1, desc2, desc3, desc4, precio } = prod

    if (contenedor) {
        contenedor.innerHTML += `
            <div class="col-lg-3 col-md-6 mb-4">
                <div class="card p-4 text-center rounded-3">
                    <h5 class="text-decoration-underline mb-4">${nombre}</h5>
                    <ul class="list-unstyled">
                        <li>
                            <p>${desc1}</p>
                        </li>
                        <li>
                            <p>${desc2}</p>
                        </li>
                        <li>
                            <p>${desc3}</p>
                        </li>
                        <li>
                            <p>${desc4}</p>
                        </li>
                    </ul>
                    <hr />
                    <h3>${precio}€<sub class="fs-6 fw-normal"></sub></h3>
                    <button onclick="agregarProducto(${id})" class="main-btn2">Pedir</button>
                </div>
            </div>
        `
    }
})

// Vaciar todo el carrito de la compra 
if (vaciarCarrito) {
    vaciarCarrito.addEventListener('click', () => {
        carrito.length = []
        mostrarCarrito()
    })
}

// Agregar productos al carrito de la compra 
const agregarProducto = (id) => {
    // Evitar que aparezcan duplicados los productos en una misma lista
    const existe = carrito.some(prod => prod.id === id)

    if (existe) {
        const prod = carrito.map(prod => {
            // Cuando encuentra que un producto ya está agregado, incrementa la cantidad.
            if (prod.id === id) {
                prod.cantidad++
            }
        })
    } else {
        // Busca que el producto seleccionado sea igual al id del producto. Si es así, lo agregamos a la lista
        const item = stockProductos.find((prod) => prod.id === id)
        carrito.push(item)
    }

    mostrarCarrito()
}

// Mostrar el modal con los productos que hay en la cesta 
const mostrarCarrito = () => {
    const modalBody = document.querySelector('#modalVentas #cestaProductos')

    if (modalBody) {
        modalBody.innerHTML = '' // Evitamos productos repetidos

        carrito.forEach((prod) => {
            const { id, nombre, img, cantidad, precio } = prod
            modalBody.innerHTML += `
                    <div class="modal-contenedor">
                        <div>
                            <img class="img-fluid img-carrito" src="${img}"/>
                        </div>
                        <div>
                            <p>Producto: ${nombre}</p>
                            <p>Precio: ${precio} €</p>
                            <p>Cantidad: ${cantidad}</p>
        
                            <button onclick="eliminarProducto(${id})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                `
        })
    }

    // Mensaje para indicar al usuario que no ha añadido nada a la cesta y no puede continuar con la compra
    if (carrito.length === 0) {
        modalBody.innerHTML = `
                <p class="text-center parrafo">No hay productos en la cesta</p>
            `
    }

    // Mostrar la cantidad de productos que hay en la cesta 
    if (carritoContenedor) {
        carritoContenedor.textContent = carrito.length
    }

    // Mostrar el precio total 
    if (precioTotal) {
        precioTotal.textContent = carrito.reduce((acumulador, prod) => acumulador + prod.cantidad * prod.precio, 0) + '€'
    }

    guardarStorage()
}

// Eliminar los productos de la cesta
const eliminarProducto = (id) => {
    const servicioId = id
    // Filtramos de forma que nos muestre solo los productos que no sean el producto seleccionado a eliminar
    carrito = carrito.filter((servicio) => servicio.id !== servicioId)
    mostrarCarrito()
}

// Almacenar los productos en el local Storage
const guardarStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

// Procesar el pedido
function procesarPedido() {
    carrito.forEach((prod) => {
        const listaCompra = document.querySelector("#lista-compra tbody");
        const { id, nombre, precio, img, cantidad } = prod;

        if (listaCompra) {
            const row = document.createElement('tr');
            row.innerHTML += `
                <td>
                    <img class="img-fluid img-carrito" src="${img}"/>
                </td>
                <td>${nombre}</td>
                <td>${cantidad}</td>
                <td>${precio}</td>
                <td>${precio * cantidad}</td>
              `
            listaCompra.appendChild(row)
        }
    })

    totalProceso.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0) + '€'
}

// Continuar con el pago del pedido
if (procesarCompra) {
    procesarCompra.addEventListener('click', () => {
        if (carrito.length === 0) {
            Swal.fire({
                title: "¡Tu carrito está vacio!",
                text: "Compra algo para continuar con la compra",
                icon: "error",
                confirmButtonText: "Aceptar"
            })
        } else {
            location.href = "transaccion"
            procesarPedido()
        }
    })
}

// Enviar el pedido 
function enviarPedido(e) {
    e.preventDefault()
    const cliente = document.querySelector('#cliente').value
    const correo = document.querySelector('#correo').value

    if (correo === '' || cliente === '') {
        Swal.fire({
            title: "Debes ingresar tu nombre y correo",
            text: "Rellena el formulario",
            icon: "error",
            confirmButtonText: "Aceptar"
        })
    } else {
        // Animación para esperar validación proceso de compra
        const spinner = document.querySelector('#spinner')
        spinner.classList.add('d-flex')
        spinner.classList.remove('d-none')

        // Reseteamos los campos del formulario y paramos el spinner tras 3seg.
        setTimeout(() => {
            spinner.classList.remove('d-flex')
            spinner.classList.add('d-none')
            formulario.reset()

            // Insertamos un cartel de éxito
            const alertExito = document.createElement('p')
            alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
            alertExito.textContent = 'Compra realizada correctamente'
            formulario.appendChild(alertExito)

            // Quitamos el cartel de éxito tras 5seg.
            setTimeout(() => {
                alertExito.remove()
            }, 5000)
        }, 3000)
        
        localStorage.clear()
    }
} 