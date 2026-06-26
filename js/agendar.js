// =====================================================
// Persistencia de datos
// localStorage: Servicios
//=====================================================

const STORAGE_CITAS = "roseglow_citas";

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

const servicioElegido =
    document.getElementById("servicioElegido");

const fechaCita =
    document.getElementById("fechaCita");

const horaCita =
    document.getElementById("horaCita");

const nombreCliente =
    document.getElementById("nombreCliente");

const telefonoCliente =
    document.getElementById("telefonoCliente");

const correoCliente =
    document.getElementById("correoCliente");
const notaAdicional =
    document.getElementById("notaAdicional");
const mensajeResumen =
    document.getElementById("mensajeResumen");

const resumenServicio =
    document.getElementById("resumenServicio");

const resumenFecha =
    document.getElementById("resumenFecha");

const resumenHora =
    document.getElementById("resumenHora");

const resumenNombre =
    document.getElementById("resumenNombre");

const formularioCita =
    document.querySelector(".formularioCita");

const resumenConfirmacion =
    document.getElementById("resumenConfirmacion");
const listaCitasGuardadas =
    document.getElementById("listaCitasGuardadas");
function cargarServicios() {
    for (const servicio of servicios) {
        const option = document.createElement("option");
        option.value = servicio.id;
        option.textContent = servicio.nombre;
        servicioElegido.appendChild(option);
    }
}

function actualizarResumen() {

    const idServicio =
        Number(servicioElegido.value);

    if (idServicio === 0) {

        mensajeResumen.textContent =
            "Aún no has seleccionado ningún servicio";

        resumenServicio.textContent = "-";
        resumenFecha.textContent = "-";
        resumenHora.textContent = "-";
        resumenNombre.textContent = "-";

        return;
    }

    const servicio =
        servicios.find(function (servicio) {

            return servicio.id === idServicio;
        });

    mensajeResumen.textContent = "";

    resumenServicio.textContent =
        servicio.nombre;

    resumenFecha.textContent =
        fechaCita.value || "-";

    resumenHora.textContent =
        horaCita.value || "-";

    resumenNombre.textContent =
        nombreCliente.value || "-";
}

function confirmarCita(event) {
    event.preventDefault();

    const idServicio =
        Number(servicioElegido.value);

    const servicio =
        servicios.find(function (servicio) {
            return servicio.id === idServicio;
        });

    const fecha =
        fechaCita.value;

    const hora =
        horaCita.value;

    const nombre =
        nombreCliente.value.trim();

    const telefono =
        telefonoCliente.value.trim();

    const correo =
        correoCliente.value.trim();

    resumenConfirmacion.classList.remove("summary-error");
    resumenConfirmacion.classList.add("summary-success");

    resumenConfirmacion.innerHTML = `
        <h3>Tu cita ha sido confirmada</h3>
        <p><strong>Cliente:</strong> ${nombre}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Correo:</strong> ${correo || "No indicado"}</p>
        <p><strong>Servicio:</strong> ${servicio.nombre}</p>
        <p><strong>Fecha:</strong> ${fecha}</p>
        <p><strong>Hora:</strong> ${hora}</p>
    `;

    crearCitaPersistente();
}

// =====================================================
// Funciones para localStorage
// =====================================================

function obtenerCitas() {
    const datosGuardados =
        localStorage.getItem(STORAGE_CITAS);

    if (!datosGuardados) {
        return [];
    }

    return JSON.parse(datosGuardados);
}

function guardarCitas(citas) {
    localStorage.setItem(
        STORAGE_CITAS,
        JSON.stringify(citas)
    );
}

function crearCitaPersistente() {
    const idServicio =
        Number(servicioElegido.value);

    const servicio =
        servicios.find(function (servicio) {
            return servicio.id === idServicio;
        });

    const nuevaCita = {
        id: crypto.randomUUID(),
        servicioId: servicio.id,
        servicioNombre: servicio.nombre,
        fecha: fechaCita.value,
        hora: horaCita.value,
        nombre: nombreCliente.value.trim(),
        telefono: telefonoCliente.value.trim(),
        correo: correoCliente.value.trim(),
        nota: notaAdicional.value.trim(),
        fechaRegistro: new Date().toISOString()
    };

    const citas =
        obtenerCitas();

    citas.push(nuevaCita);

    guardarCitas(citas);

    renderizarCitas();
}

function eliminarCita(idCita) {
    const confirmar =
        confirm("¿Deseas eliminar esta cita?");

    if (!confirmar) {
        return;
    }

    const citas =
        obtenerCitas();

    const citasFiltradas =
        citas.filter(function (cita) {
            return cita.id !== idCita;
        });

    guardarCitas(citasFiltradas);

    renderizarCitas();
}

function renderizarCitas() {
    const citas =
        obtenerCitas();

    if (citas.length === 0) {
        listaCitasGuardadas.innerHTML = `
            <div class="empty-state">
                <h4>Sin citas guardadas</h4>
                <p>Todavía no hay citas registradas.</p>
            </div>
        `;

        return;
    }

    listaCitasGuardadas.innerHTML =
        citas.map(function (cita) {
            return `
                <article class="cita-card">
                    <div class="cita-main">
                        <span class="cita-badge">Cita guardada</span>

                        <h4>${cita.servicioNombre}</h4>

                        <div class="cita-info">
                            <p><strong>Cliente:</strong> ${cita.nombre}</p>
                            <p><strong>Teléfono:</strong> ${cita.telefono}</p>
                            <p><strong>Correo:</strong> ${cita.correo || "No indicado"}</p>
                            <p><strong>Fecha:</strong> ${cita.fecha}</p>
                            <p><strong>Hora:</strong> ${cita.hora}</p>
                            <p><strong>Nota:</strong> ${cita.nota || "Sin nota adicional"}</p>
                        </div>
                    </div>

                    <div class="cita-actions">
                        <button type="button" class="btn-delete" onclick="eliminarCita('${cita.id}')">
                            Eliminar
                        </button>
                    </div>
                </article>
            `;
        }).join("");
}

servicioElegido.addEventListener("change",
    actualizarResumen
);
fechaCita.addEventListener("change",
    actualizarResumen
);

horaCita.addEventListener("change",
    actualizarResumen
);

nombreCliente.addEventListener("input",
    actualizarResumen
);
formularioCita.addEventListener("submit",
    confirmarCita
);
document.addEventListener("DOMContentLoaded", function () {
    cargarServicios();
    renderizarCitas();
});
telefonoCliente.addEventListener("input", function () {
    telefonoCliente.value = telefonoCliente.value.replace(/[^0-9]/g, "");
});

const hoy = new Date();
const anio = hoy.getFullYear();
const mes = String(hoy.getMonth() + 1).padStart(2, "0");
const dia = String(hoy.getDate()).padStart(2, "0");

const fechaActual = anio + "-" + mes + "-" + dia;

fechaCita.min = fechaActual;

fechaCita.addEventListener("change", function () {
    if (fechaCita.value < fechaActual) {
        alert("No puedes seleccionar una fecha anterior a hoy.");
        fechaCita.value = "";
    }
});