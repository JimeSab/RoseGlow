const imagenCarrusel =
    document.getElementById("imagenCarrusel");

const tituloHero =
    document.getElementById("tituloHero");

const textoHero1 =
    document.getElementById("textoHero1");

const textoHero2 =
    document.getElementById("textoHero2");

const imagenes = [
    "images/hero1.jpg",
    "images/hero2.png",
    "images/hero3.jpg",
    "images/hero4.jpg"
];

let indiceActual = 0;

async function cargarHero() {
    try {
        const respuesta = 
            await fetch("data/hero.json");

        const hero =
            await respuesta.json();

        tituloHero.textContent = hero.titulo;

        textoHero1.textContent = hero.parrafo1;

        textoHero2.textContent = hero.parrafo2;
    } catch (error) {
        console.error("Error cargando hero:", error);
    }
}

function cambiarImagen() {
    indiceActual++;

    if (indiceActual >= imagenes.length) {
        indiceActual = 0;
    }

    imagenCarrusel.src = imagenes[indiceActual];
}

document.addEventListener("DOMContentLoaded", async function () {
    await cargarHero();
    setInterval(cambiarImagen, 3000);
})