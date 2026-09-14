// Importamos la función encargada de consultar la API.
import { consultarApi } from "./conexionApi.js";

/**
 * Ejercicio 2:
 * Busca un usuario mediante su username y muestra
 * sus datos, álbumes y fotografías.
 *
 * @param {string} usernameBuscado - Username digitado por el usuario.
 */
export async function buscarUsuarioConAlbumes(usernameBuscado) {

    // Utilizamos try para controlar posibles errores.
    try {

        // Consultamos todos los usuarios de la API.
        const usuarios = await consultarApi("/users");

        // Buscamos el usuario cuyo username coincida
        // con el valor recibido desde el teclado.
        const usuario = usuarios.find(
            usuarioActual =>
                usuarioActual.username.toLowerCase() ===
                usernameBuscado.toLowerCase()
        );

        // Verificamos si el usuario fue encontrado.
        if (!usuario) {

            // Informamos que no existe un usuario con ese username.
            console.log(
                `\nNo se encontró ningún usuario con username "${usernameBuscado}".`
            );

            // Terminamos la función porque no podemos continuar.
            return;
        }

        // Consultamos los álbumes pertenecientes al usuario.
        const albumes = await consultarApi(
            `/albums?userId=${usuario.id}`
        );

        // Mostramos el encabezado del ejercicio.
        console.log("\n==============================================");
        console.log("EJERCICIO 2 - USUARIO, ÁLBUMES Y FOTOS");
        console.log("==============================================");

        // Mostramos la información principal del usuario.
        console.log("\nDATOS DEL USUARIO");
        console.log(`ID: ${usuario.id}`);
        console.log(`Nombre: ${usuario.name}`);
        console.log(`Username: ${usuario.username}`);
        console.log(`Email: ${usuario.email}`);
        console.log(`Teléfono: ${usuario.phone}`);
        console.log(`Website: ${usuario.website}`);

        // Mostramos los álbumes encontrados.
        console.log(`\nÁLBUMES: ${albumes.length}`);

        // Recorremos todos los álbumes del usuario.
        for (const album of albumes) {

            // Consultamos las fotografías correspondientes al álbum.
            const fotos = await consultarApi(
                `/photos?albumId=${album.id}`
            );

            // Mostramos la información del álbum.
            console.log(`\nÁlbum ${album.id}: ${album.title}`);

            // Mostramos la cantidad de fotografías.
            console.log(`Fotografías: ${fotos.length}`);

            // Mostramos las fotografías del álbum.
            fotos.forEach(foto => {

                // Mostramos el identificador y título de la fotografía.
                console.log(
                    `  - Foto ${foto.id}: ${foto.title}`
                );

                // Mostramos la URL de la fotografía.
                console.log(
                    `    URL: ${foto.url}`
                );
            });
        }

    } catch (error) {

        // Mostramos un mensaje cuando ocurre un error.
        console.error(
            "\nNo fue posible consultar el usuario y sus álbumes."
        );
    }
}

/**
 * Ejercicio 4:
 * Consulta todos los usuarios y crea un nuevo arreglo
 * que contenga únicamente el nombre y el teléfono.
 */
export async function obtenerUsuariosNombreTelefono() {

    // Controlamos posibles errores mediante try/catch.
    try {

        // Consultamos todos los usuarios.
        const usuarios = await consultarApi("/users");

        // Creamos un nuevo arreglo utilizando map.
        const usuariosModificados = usuarios.map(usuario => ({

            // Conservamos únicamente el nombre.
            nombre: usuario.name,

            // Conservamos únicamente el teléfono.
            telefono: usuario.phone
        }));

        // Mostramos el encabezado del ejercicio.
        console.log("\n==============================================");
        console.log("EJERCICIO 4 - USUARIOS MODIFICADOS");
        console.log("==============================================");

        // Mostramos el nuevo arreglo.
        console.log(
            JSON.stringify(usuariosModificados, null, 2)
        );

        // Retornamos el nuevo arreglo.
        return usuariosModificados;

    } catch (error) {

        // Mostramos información cuando ocurre un error.
        console.error(
            "\nNo fue posible obtener los usuarios."
        );
    }
}

/**
 * Ejercicio 5:
 * Consulta todos los usuarios en una única petición.
 * Posteriormente agrega sus posts, comentarios, álbumes
 * y fotografías.
 */
export async function enriquecerTodosLosUsuarios() {

    // Controlamos posibles errores.
    try {

        // Realizamos una única petición para obtener todos los usuarios.
        const usuarios = await consultarApi("/users");

        // Mostramos el encabezado del ejercicio.
        console.log("\n==============================================");
        console.log("EJERCICIO 5 - USUARIOS ENRIQUECIDOS");
        console.log("==============================================");

        // Creamos un arreglo de usuarios enriquecidos.
        const usuariosEnriquecidos = [];

        // Recorremos cada usuario.
        for (const usuario of usuarios) {

            // Consultamos los posts y álbumes del usuario.
            // Promise.all permite realizar ambas peticiones
            // de forma asíncrona y esperar sus resultados.
            const [posts, albumes] = await Promise.all([

                // Obtenemos todos los posts del usuario.
                consultarApi(`/posts?userId=${usuario.id}`),

                // Obtenemos todos los álbumes del usuario.
                consultarApi(`/albums?userId=${usuario.id}`)
            ]);

            // Agregamos los comentarios a cada post.
            const postsConComentarios = await Promise.all(

                // Recorremos todos los posts del usuario.
                posts.map(async post => {

                    // Consultamos los comentarios del post.
                    const comentarios = await consultarApi(
                        `/comments?postId=${post.id}`
                    );

                    // Retornamos el post junto con sus comentarios.
                    return {
                        ...post,
                        comentarios
                    };
                })
            );

            // Agregamos las fotografías a cada álbum.
            const albumesConFotos = await Promise.all(

                // Recorremos todos los álbumes del usuario.
                albumes.map(async album => {

                    // Consultamos las fotografías del álbum.
                    const fotos = await consultarApi(
                        `/photos?albumId=${album.id}`
                    );

                    // Retornamos el álbum junto con sus fotografías.
                    return {
                        ...album,
                        fotos
                    };
                })
            );

            // Creamos un nuevo objeto con toda la información
            // relacionada con el usuario.
            const usuarioEnriquecido = {
                ...usuario,
                posts: postsConComentarios,
                albumes: albumesConFotos
            };

            // Agregamos el usuario enriquecido al arreglo final.
            usuariosEnriquecidos.push(usuarioEnriquecido);
        }

        // Mostramos la cantidad total de usuarios procesados.
        console.log(
            `Usuarios procesados: ${usuariosEnriquecidos.length}`
        );

        // Mostramos un resumen para no saturar inicialmente
        // la terminal con toda la información.
        usuariosEnriquecidos.forEach(usuario => {

            // Contamos los posts del usuario.
            const cantidadPosts = usuario.posts.length;

            // Contamos los álbumes del usuario.
            const cantidadAlbumes = usuario.albumes.length;

            // Calculamos la cantidad de comentarios.
            const cantidadComentarios = usuario.posts.reduce(
                (total, post) => total + post.comentarios.length,
                0
            );

            // Calculamos la cantidad de fotografías.
            const cantidadFotos = usuario.albumes.reduce(
                (total, album) => total + album.fotos.length,
                0
            );

            // Mostramos el resumen del usuario.
            console.log(
                `\nUsuario: ${usuario.name}`
            );

            console.log(
                `  Posts: ${cantidadPosts}`
            );

            console.log(
                `  Comentarios: ${cantidadComentarios}`
            );

            console.log(
                `  Álbumes: ${cantidadAlbumes}`
            );

            console.log(
                `  Fotografías: ${cantidadFotos}`
            );
        });

        // Retornamos el arreglo completo para que pueda utilizarse
        // desde otros módulos si fuera necesario.
        return usuariosEnriquecidos;

    } catch (error) {

        // Mostramos el error en caso de que falle alguna petición.
        console.error(
            "\nNo fue posible enriquecer la información de los usuarios."
        );
    }
}