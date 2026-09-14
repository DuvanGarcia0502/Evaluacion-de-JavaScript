// Importamos la función encargada de realizar las peticiones
// a la API de JSONPlaceholder.
import { consultarApi } from "./conexionApi.js";

// Función encargada de listar las tareas pendientes
// correspondientes a cada usuario registrado.
export async function listarTareasPendientes() {

    // Utilizamos try para controlar posibles errores
    // durante las peticiones a la API.
    try {

        // Consultamos todos los usuarios registrados
        // en JSONPlaceholder.
        const usuarios = await consultarApi("/users");

        // Recorremos cada usuario obtenido de la API.
        for (const usuario of usuarios) {

            // Consultamos las tareas correspondientes
            // al usuario actual utilizando su identificador.
            const tareas = await consultarApi(
                `/todos?userId=${usuario.id}`
            );

            // Filtramos las tareas para obtener únicamente
            // aquellas que todavía no han sido completadas.
            const tareasPendientes = tareas.filter(
                tarea => tarea.completed === false
            );

            // Mostramos el nombre del usuario en la terminal.
            console.log(`\nUsuario: ${usuario.name}`);

            // Mostramos el nombre de usuario.
            console.log(`Username: ${usuario.username}`);

            // Mostramos el encabezado de las tareas.
            console.log("Tareas pendientes:");

            // Verificamos si el usuario tiene tareas pendientes.
            if (tareasPendientes.length === 0) {

                // Si no existen tareas pendientes,
                // mostramos un mensaje informativo.
                console.log("No tiene tareas pendientes.");

            } else {

                // Recorremos las tareas pendientes.
                tareasPendientes.forEach(tarea => {

                    // Mostramos el título de cada tarea pendiente.
                    console.log(`- ${tarea.title}`);
                });
            }
        }

    } catch (error) {

        // Mostramos el error en caso de que falle alguna petición.
        console.error(
            "Error al consultar las tareas:",
            error.message
        );
    }
}