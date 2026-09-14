const URL_BASE = "https://jsonplaceholder.typicode.com";

/**
 * Realiza una petición GET a la API.
 * @param {string} endpoint - Recurso que queremos consultar.
 * @returns {Promise<any>} Datos obtenidos de la API.
 */

export async function consultarApi(endpoint) {
    try {
        const respuesta = await fetch(`${URL_BASE}${endpoint}`);

        if (!respuesta.ok) {
            throw new Error(
                `Error en la petición: ${respuesta.status}`
            );
        }

        const datos = await respuesta.json();

        return datos;

    } catch (error) {
        console.error("No fue posible consultar la API:", error);
        throw error;
    }
}