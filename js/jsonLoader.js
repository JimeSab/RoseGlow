async function cargarServicios() {
    try {
        const respuesta = await fetch("data/servicios.json")
        servicios = await respuesta.json()
    } catch (error) {
        console.error("Error al cargar servicios", error)
    }
}