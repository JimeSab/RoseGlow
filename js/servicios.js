const servicios = [
    {
        "id": 1,
        "nombre": "Esmaltado Regular",
        "descripcion": "Perfecto para cuando tienes prisa pero quieres que tus uñas estén arregladas.",
        "precio": 7500,
        "categoria": "Esmaltado",
        "imagen": "images/esmalte normal.jpg"
    },
    {
        "id": 2,
        "nombre": "Esmaltado Semi Permanente",
        "descripcion": "Disfruta de un acabado elegante y duradero.",
        "precio": 12000,
        "categoria": "Esmaltado",
        "imagen": "images/esmaltado semi.jpg"
    },
    {
        "id": 3,
        "nombre": "Esmaltado Acrilico",
        "descripcion": "Disfrutado de un acabado elegante y duradero, eligiendo el largo y forma deseada.",
        "precio": 14000,
        "categoria": "Esmaltado",
        "imagen": "images/Acrilico.jpg"
    },
    {
        "id": 4,
        "nombre": "Manicure Normal",
        "descripcion": "Deja tus uñas y manos en perfecto estado para un acabado más elegante. Incluye esmaltado regular.",
        "precio": 12500,
        "categoria": "Manicure",
        "imagen": "images/manicure normal.jpg"
    },
    {
        "id": 5,
        "nombre": "Manicure SPA",
        "descripcion": "Relájate con un masaje y una exfoliación, dejando tus uñas en perfecto estado. Incluye esmaltado semipermanente.",
        "precio": 13500,
        "categoria": "Manicure",
        "imagen": "images/Manicure SPA.jpg"
    },
    {
        "id": 6,
        "nombre": "Pedicure Normal",
        "descripcion": "Deja tus pies arreglados con un acabado distinto.",
        "precio": 12500,
        "categoria": "Pedicure",
        "imagen": "images/Pedi normal.jpg"
    },
    {
        "id": 7,
        "nombre": "Pedicure SPA",
        "descripcion": "Relájate con un masaje y tina caliente para que tus pies queden con un acabado perfecto. Incluye esmaltado semi permanente.",
        "precio": 13500,
        "categoria": "Pedicure",
        "imagen": "images/pedi spa.jpg"
    },
    {
        "id": 8,
        "nombre": "Esmaltado con Calcio",
        "descripcion": "Una capa extra de fortaleza con calcio para la salud de tus uñas.",
        "precio": 13500,
        "categoria": "Adicionales",
        "imagen": "images/calcio.jpg"
    },
    {
        "id": 9,
        "nombre": "Corte de Uñas",
        "descripcion": "Dejamos tus uñas en la forma y largo deseado.",
        "precio": 500,
        "categoria": "Adicionales",
        "imagen": "images/corte uñas.jpg"
    },
    {
        "id": 10,
        "nombre": "Remover producto",
        "descripcion": "Un adicional por remover procedimientos realizados en otros salones distintos a Rose Glow.",
        "precio": 700,
        "categoria": "Adicionales",
        "imagen": "images/quitar producto.jpg"
    }
];


const serviciosGrid =
    document.getElementById("serviciosGrid");

const filtroCategoria =
    document.getElementById("filtroCategoria");

const busquedaServicio =
    document.getElementById("busquedaServicio");

function mostrarServicios(listaServicios) {

    // Limpia las tarjetas anteriores
    serviciosGrid.innerHTML = "";

    for (const servicio of listaServicios) {

        serviciosGrid.innerHTML += `
        <article class="servicios-card">

            <figure>
                <img src="${servicio.imagen}" alt="${servicio.nombre}">

                <figcaption>
                    ${servicio.descripcion}
                </figcaption>
            </figure>

            <div class="servicios-card-content">
                    <h3>${servicio.nombre}</h3>

                    <span class="servicios-category">
                        Precio: ₡${servicio.precio}
                    </span>
                </div>

            </article>
        `;
    }
}

function aplicarFiltros() {

    const categoriaSeleccionada =
        filtroCategoria.value;

    const textoBusqueda =
        busquedaServicio.value.toLowerCase();

    // Arreglo donde se guardan los resultados
    let serviciosFiltrados = [];

    for (const servicio of servicios) {

        let coincideCategoria =
            categoriaSeleccionada === "Todos" ||
            servicio.categoria === categoriaSeleccionada;

        let coincideBusqueda =
            servicio.nombre.toLowerCase()
            .includes(textoBusqueda);

        if (coincideCategoria && coincideBusqueda) {
            serviciosFiltrados.push(servicio);
        }
    }

    mostrarServicios(serviciosFiltrados);
}

// Evento Change se ejecuta cuando el usuario cambia el select
filtroCategoria.addEventListener("change", function () {
    aplicarFiltros();
});

// Evento Input se ejecuta cuando el usuario escribe
busquedaServicio.addEventListener("input", function () {
    aplicarFiltros();
});

// Muestra todos los servicios al abrir la pagina
mostrarServicios(servicios);