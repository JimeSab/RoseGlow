let servicios = [];

const serviciosGrid =
    document.getElementById("serviciosGrid");

const filtroCategoria =
    document.getElementById("filtroCategoria");

const busquedaServicio =
    document.getElementById("busquedaServicio");

const btnLimpiarFiltros =
    document.getElementById("btnLimpiarFiltros");

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

    const mensajeServicios = document.getElementById("mensajeServicios");

    if (mensajeServicios) {
        mensajeServicios.textContent =
            `Mostrando ${lista.length} servicio(s) disponible(s).`;
    }

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
}

function filtrarServicios() {
    const categoriaSeleccionada = filtroCategoria.value;

    const textoBusqueda = busquedaServicio.value.toLowerCase();

    const filtrados = servicios.filter(function (servicio) {

        const cumpleCategoria =
            categoriaSeleccionada === "" ||
            servicio.categoria === categoriaSeleccionada;

        const cumpleBusqueda =
            servicio.nombre.toLowerCase().includes(textoBusqueda);

        return cumpleCategoria && cumpleBusqueda;
    });

    renderizarServicios(filtrados);
}

function limpiarFiltros() {
    filtroCategoria.value = "";
    busquedaServicio.value = "";
    renderizarServicios(servicios);
}

// Evento Change se ejecuta cuando el usuario cambia el select
filtroCategoria.addEventListener("change", filtrarServicios);
busquedaServicio.addEventListener("input", filtrarServicios);
btnLimpiarFiltros.addEventListener("click", limpiarFiltros);

document.addEventListener("DOMContentLoaded", async function () {
    await cargarServicios()
    cargarFiltros();
    renderizarServicios(servicios);
});