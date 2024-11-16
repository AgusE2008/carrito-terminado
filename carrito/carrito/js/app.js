// Variables
const listaCursos = document.querySelector('#lista-cursos');
const carritoDOM = document.querySelector('#carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const imgCarrito = document.querySelector('#img-carrito'); // Ícono del carrito
let carrito = []; // Array para almacenar los productos

// Cargar Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    cargarEventListeners();
});

// Función para cargar Event Listeners
function cargarEventListeners() {
    // Dispara cuando se presiona "Agregar Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Cuando se elimina un curso del carrito
    carritoDOM.addEventListener('click', eliminarCurso);

    // Al Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Mostrar u ocultar el carrito al hacer clic en el ícono
    imgCarrito.addEventListener('click', toggleCarrito);
}

// Función para agregar un curso al carrito
function agregarCurso(event) {
    event.preventDefault(); // Evita el salto por defecto del enlace

    if (event.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = event.target.closest('.info-card');

        // Extrae la información del curso seleccionado
        const curso = {
            id: event.target.getAttribute('data-id'),
            nombre: cursoSeleccionado.querySelector('h4').textContent,
            precio: 200, // Puedes extraerlo dinámicamente
            cantidad: 1,
            imagen: cursoSeleccionado.previousElementSibling.src,
        };

        // Verifica si el curso ya existe en el carrito
        const existe = carrito.find(producto => producto.id === curso.id);

        if (existe) {
            // Incrementa la cantidad
            existe.cantidad++;
        } else {
            // Agrega el curso al array del carrito
            carrito.push(curso);
        }

        // Actualiza el carrito en el DOM
        actualizarCarrito();
    }
}

// Función para eliminar un curso del carrito
function eliminarCurso(event) {
    if (event.target.classList.contains('eliminar-carrito')) {
        const cursoId = event.target.getAttribute('data-id');

        // Elimina el curso del array del carrito
        carrito = carrito.filter(producto => producto.id !== cursoId);

        // Actualiza el carrito en el DOM
        actualizarCarrito();
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    // Vacía el array del carrito
    carrito = [];

    // Limpia el carrito en el DOM
    actualizarCarrito();
}

// Función para actualizar el carrito en el DOM
function actualizarCarrito() {
    // Limpia el contenido del carrito
    contenedorCarrito.innerHTML = '';

    // Recorre el carrito y genera las filas en la tabla
    carrito.forEach(curso => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><img src="${curso.imagen}" class="h-12"></td>
            <td>${curso.nombre}</td>
            <td>$${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td><button class="eliminar-carrito text-red-500" data-id="${curso.id}">Eliminar</button></td>
        `;
        contenedorCarrito.appendChild(fila);
    });

    // Muestra el carrito si tiene elementos
    if (carrito.length > 0) {
        carritoDOM.classList.remove('hidden');
    } else {
        carritoDOM.classList.add('hidden');
    }
}

// Función para alternar la visibilidad del carrito
function toggleCarrito() {
    carritoDOM.classList.toggle('hidden');
}
