// Importamos la función para realizar peticiones a la API.
import { consultarApi } from "./conexionApi.js";

/**
 * Ejercicio 3:
 * Filtra los posts por su nombre/título y agrega
 * los comentarios correspondientes.
 *
 * @param {string} nombreBuscado - Texto digitado por el usuario.
 */
export async function filtrarPostsPorNombre(nombreBuscado) {

    // Controlamos posibles errores mediante try/catch.
    try {

        // Consultamos todos los posts disponibles.
        const posts = await consultarApi("/posts");

        // Convertimos el texto buscado a minúsculas
        // para realizar una búsqueda que no dependa de mayúsculas.
        const textoBuscado = nombreBuscado.toLowerCase();

        // Filtramos los posts cuyo título contiene
        // el texto introducido por el usuario.
        const postsFiltrados = posts.filter(
            post => post.title.toLowerCase().includes(textoBuscado)
        );

        // Verificamos si encontramos resultados.
        if (postsFiltrados.length === 0) {

            // Informamos que no existen posts coincidentes.
            console.log(
                `\nNo se encontraron posts que coincidan con "${nombreBuscado}".`
            );

            // Terminamos la función.
            return;
        }

        // Mostramos el encabezado del ejercicio.
        console.log("\n==============================================");
        console.log("EJERCICIO 3 - POSTS Y COMENTARIOS");
        console.log("==============================================");

        // Mostramos la cantidad de posts encontrados.
        console.log(
            `\nPosts encontrados: ${postsFiltrados.length}`
        );

        // Recorremos los posts filtrados.
        for (const post of postsFiltrados) {

            // Consultamos los comentarios correspondientes al post.
            const comentarios = await consultarApi(
                `/comments?postId=${post.id}`
            );

            // Mostramos la información del post.
            console.log(`\nPost ${post.id}`);
            console.log(`Título: ${post.title}`);
            console.log(`Contenido: ${post.body}`);

            // Mostramos la cantidad de comentarios.
            console.log(
                `Comentarios: ${comentarios.length}`
            );

            // Recorremos los comentarios.
            comentarios.forEach((comentario, indice) => {

                // Mostramos la información básica del comentario.
                console.log(
                    `  ${indice + 1}. ${comentario.name}`
                );

                console.log(
                    `     Email: ${comentario.email}`
                );

                console.log(
                    `     ${comentario.body}`
                );
            });
        }

    } catch (error) {

        // Mostramos un mensaje cuando ocurre un error.
        console.error(
            "\nNo fue posible filtrar los posts."
        );
    }
}