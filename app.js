// Importamos únicamente las funcionalidades desde el archivo barril.
// Esto permite que app.js no tenga que conocer directamente
// la ubicación de cada módulo.
import {
    listarTareasPendientes,
    buscarUsuarioConAlbumes,
    filtrarPostsPorNombre,
    obtenerUsuariosNombreTelefono,
    enriquecerTodosLosUsuarios
} from "./modules/index.js";

// Importamos readline para poder solicitar información
// al usuario mediante la terminal.
import { createInterface } from "node:readline/promises";

// Importamos process para utilizar la entrada y salida estándar.
import { stdin as input, stdout as output } from "node:process";

// Creamos la interfaz que permitirá leer información
// introducida por teclado.
const rl = createInterface({
    input,
    output
});

/**
 * Muestra el menú principal del programa.
 */
function mostrarMenu() {

    // Mostramos el título del programa.
    console.log("\n==============================================");
    console.log("       EVALUACIÓN DE JAVASCRIPT");
    console.log("       API JSONPLACEHOLDER");
    console.log("==============================================");

    // Mostramos las opciones disponibles.
    console.log("\nSeleccione el ejercicio que desea ejecutar:");

    console.log("1. Listar tareas pendientes por usuario");
    console.log("2. Buscar usuario, álbumes y fotografías");
    console.log("3. Filtrar posts y agregar comentarios");
    console.log("4. Modificar respuesta de usuarios");
    console.log("5. Enriquecer usuarios con posts, comentarios, álbumes y fotos");

    console.log("\nTambién puede escribir el nombre del ejercicio.");
}

/**
 * Ejecuta el ejercicio seleccionado por el usuario.
 *
 * @param {string} opcion - Número o nombre del ejercicio.
 */
async function ejecutarEjercicio(opcion) {

    // Eliminamos espacios innecesarios y convertimos
    // la opción a minúsculas.
    const opcionNormalizada = opcion.trim().toLowerCase();

    // Evaluamos la opción seleccionada.
    switch (opcionNormalizada) {

        // Ejercicio 1.
        case "1":
        case "tareas":
        case "ejercicio 1":
        case "ejercicio1":

            // Ejecutamos la función correspondiente.
            await listarTareasPendientes();
            break;

        // Ejercicio 2.
        case "2":
        case "usuarios":
        case "albumes":
        case "ejercicio 2":
        case "ejercicio2":

            // Solicitamos el username al usuario.
            const username = await rl.question(
                "\nDigite el username que desea buscar: "
            );

            // Verificamos que se haya ingresado información.
            if (!username.trim()) {

                // Informamos que el campo es obligatorio.
                console.log(
                    "Debe ingresar un username."
                );

                // Terminamos este caso.
                break;
            }

            // Ejecutamos la búsqueda.
            await buscarUsuarioConAlbumes(username);

            break;

        // Ejercicio 3.
        case "3":
        case "posts":
        case "publicaciones":
        case "ejercicio 3":
        case "ejercicio3":

            // Solicitamos el nombre/título del post.
            const nombrePost = await rl.question(
                "\nDigite el nombre o parte del título del post: "
            );

            // Validamos que exista un texto de búsqueda.
            if (!nombrePost.trim()) {

                // Informamos que el campo es obligatorio.
                console.log(
                    "Debe ingresar un texto para buscar."
                );

                // Terminamos este caso.
                break;
            }

            // Ejecutamos el filtro de publicaciones.
            await filtrarPostsPorNombre(nombrePost);

            break;

        // Ejercicio 4.
        case "4":
        case "usuarios modificados":
        case "nombre telefono":
        case "ejercicio 4":
        case "ejercicio4":

            // Ejecutamos el ejercicio que modifica
            // la respuesta de los usuarios.
            await obtenerUsuariosNombreTelefono();

            break;

        // Ejercicio 5.
        case "5":
        case "enriquecimiento":
        case "usuarios enriquecidos":
        case "ejercicio 5":
        case "ejercicio5":

            // Ejecutamos el proceso completo de enriquecimiento.
            await enriquecerTodosLosUsuarios();

            break;

        // Opción no válida.
        default:

            // Informamos que la opción ingresada no existe.
            console.log(
                "\nOpción no válida. Seleccione un número del 1 al 5."
            );
    }
}

/**
 * Función principal del programa.
 */
async function main() {

    // Mostramos el menú.
    mostrarMenu();

    // Solicitamos al usuario la opción que desea ejecutar.
    const opcion = await rl.question(
        "\nDigite el número o nombre del ejercicio: "
    );

    // Ejecutamos el ejercicio seleccionado.
    await ejecutarEjercicio(opcion);

    // Cerramos la interfaz de lectura.
    rl.close();
}

// Ejecutamos la función principal.
main().catch(error => {

    // Mostramos cualquier error inesperado.
    console.error(
        "\nOcurrió un error inesperado:",
        error.message
    );

    // Cerramos la interfaz.
    rl.close();
});