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

const btnLimpiarFiltros =
    document.getElementById("btnLimpiarFiltros")

function obtenerCategorias() {
    const categorias = [];

    for (const servicio of servicios) {
        if (!categorias.includes(servicio.categoria)) {
            categorias.push(servicio.categoria);
        }
    }

    return categorias;
}

function cargarFiltros() {
    const categorias = obtenerCategorias();

    for (const categoria of categorias) {
        const option = document.createElement("option");
        option.value = categoria;
        option.textContent = categoria;

        filtroCategoria.appendChild(option);
    }
}



function crearTarjetaServicio(servicio) {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("servicios-card");

    tarjeta.innerHTML = `
        <figure>
            <img src="${servicio.imagen}" alt="${servicio.nombre}">
            <figcaption>${servicio.descripcion}</figcaption>
        </figure>

        <div class="servicios-card-content">
            <h3>${servicio.nombre}</h3>
            <span class="servicios-category">
                Precio: ₡${servicio.precio.toLocaleString()}
            </span>
        </div>
    `;

    return tarjeta;
}

function renderizarServicios(lista) {
    serviciosGrid.innerHTML = "";

    if (lista.length === 0) {
        serviciosGrid.innerHTML = `
            <p>No hay servicios disponibles.</p>
        `;
        return;
    }

    for (const servicio of lista) {
        const tarjeta = crearTarjetaServicio(servicio);
        serviciosGrid.appendChild(tarjeta);
    }

    const mensajeServicios = document.getElementById("mensajeServicios");

    if (mensajeServicios) {
        mensajeServicios.textContent =
            `Mostrando ${lista.length} servicio(s) disponible(s).`;
    }
}

function filtrarServicios() {
    const categoriaSeleccionada = filtroCategoria.value;

    const filtrados = servicios.filter(function (servicio) {

        const cumpleCategoria =
            categoriaSeleccionada === "" ||
            servicio.categoria === categoriaSeleccionada;

        return cumpleCategoria;
    });

    renderizarServicios(filtrados);
}

function limpiarFiltros() {
    filtroCategoria.value = "";
    renderizarServicios(servicios);
}

// Evento Change se ejecuta cuando el usuario cambia el select
filtroCategoria.addEventListener("change", filtrarServicios);
btnLimpiarFiltros.addEventListener("click", limpiarFiltros);

document.addEventListener("DOMContentLoaded", function () {
    cargarFiltros();
    renderizarServicios(servicios);
});