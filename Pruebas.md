# Documentación Técnica y Plan de Pruebas

**Programa:** Técnico en Programación de Software (SENA) | **Ficha:** 3234206  
**Proyecto:** Evaluación Práctica - Asincronía y APIs en JavaScript  

---

##  PARTE 1: DOCUMENTACIÓN TÉCNICA DE LOS EJERCICIOS

###  Ejercicio 1: Tareas Pendientes por Usuario
* **Variables usadas:**
  * `usuarios`: Guarda la lista de todos los usuarios traídos de la API.
  * `tareas`: Guarda todas las tareas que existen en la API.
  * `tareasPendientes`: Guarda solo las tareas que no se han completado (`completed: false`).
* **Entrada y Validaciones:** Trae la información desde la API con `fetch`. Si la conexión o la respuesta falla, el bloque `try/catch` captura el error.
* **Procesos y Ciclos:** Usa `.filter()` para separar las tareas pendientes y `.forEach()` para mostrarlas ordenadas en la pantalla.
* **Función principal:** `obtenerTareasPendientes()` (No recibe parámetros, devuelve una Promesa con las tareas). Sirve para mantener el código ordenado.
* **Cambio de datos:** **Inmutable**. No modifica la lista original de tareas, solo crea una lista nueva con las pendientes.

###  Ejercicio 2: Buscar Usuario, Álbumes y Fotos
* **Variables usadas:**
  * `usernameIngresado`: Guarda el nombre de usuario que la persona escribe en el teclado.
  * `usuarioEncontrado`: Guarda la información del usuario si existe.
  * `albumesUsuario`: Guarda los álbumes de ese usuario.
  * `fotos`: Guarda las fotos de cada álbum.
* **Entrada y Validaciones:** Lee lo que el usuario escribe, le quita espacios con `.trim()` y valida con un condicional `if (!usuarioEncontrado)` si el usuario existe antes de buscar sus fotos.
* **Procesos y Ciclos:** Usa `.find()` para buscar el usuario exacto, `.filter()` para traer sus álbumes y `Promise.all()` para traer todas las fotos al mismo tiempo.
* **Función principal:** `obtenerUsuarioConAlbumes(username)` (Recibe el nombre escrito por teclado y devuelve los datos del usuario o `null` si no existe).
* **Cambio de datos:** **Inmutable**. Junta la información en un nuevo resultado sin alterar los datos originales de la API.

###  Ejercicio 3: Filtrar Publicaciones y Mostrar Comentarios
* **Variables usadas:**
  * `tituloBuscado`: Guarda la palabra que la persona escribe para buscar.
  * `postsFiltrados`: Guarda las publicaciones que coinciden con esa palabra.
  * `comentarios`: Guarda los comentarios de cada publicación.
* **Entrada y Validaciones:** Recibe la palabra clave y la convierte a minúsculas (`.toLowerCase()`) para buscar bien sin importar si se escribió en mayúsculas o minúsculas.
* **Procesos y Ciclos:** Usa `.includes()` para ver si el título tiene la palabra buscada y `.map()` con `Promise.all()` para pegarle sus comentarios.
* **Función principal:** `filtrarPostsPorTitulo(titulo)` (Recibe la palabra a buscar y devuelve las publicaciones encontradas con sus comentarios).
* **Cambio de datos:** **Inmutable**. Crea una lista nueva con las publicaciones y comentarios sin cambiar los datos de la API.

###  Ejercicio 4: Simplificar Datos de Usuarios
* **Variables usadas:**
  * `usuariosOriginales`: Guarda la lista completa con toda la información de los usuarios.
  * `usuariosSimplificados`: Guarda la nueva lista que solo tiene el nombre y el teléfono.
* **Entrada y Validaciones:** Consulta la lista de usuarios y confirma que no llegue vacía.
* **Procesos y Ciclos:** Usa `.map()` para recorrer cada usuario y extraer únicamente los dos datos pedidos.
* **Función principal:** `obtenerUsuariosSimplificados()` (No recibe parámetros y devuelve la lista recortada).
* **Cambio de datos:** **Inmutable**. Crea objetos totalmente nuevos `{ name, phone }` sin modificar el arreglo original.

###  Ejercicio 5: Consulta Completa (Opcional)
* **Variables usadas:**
  * `usuarios`, `posts`, `comentarios`, `albumes`, `fotos`: Guardan toda la información que tiene la API.
  * `arbolCompleto`: Guarda todo organizado en un solo lugar (usuarios con sus publicaciones, comentarios, álbumes y fotos).
* **Entrada y Validaciones:** Pide toda la información junta. Si alguna petición falla, el `try/catch` avisa del error sin tumbar el programa.
* **Procesos y Ciclos:** Usa varios `.map()` anidados para armar la estructura completa.
* **Función principal:** `obtenerEstructuraCompleta()` (No recibe parámetros y devuelve la estructura completa).
* **Cambio de datos:** **Inmutable**. Construye copias nuevas de los datos usando la sintaxis de tres puntos (`...`).

---

##  PARTE 2: TABLA DE EVALUACIÓN Y PLAN DE PRUEBAS

| ID | Ejercicio | ¿Qué se probó y por qué? | Pasos para evaluar | ¿Cómo es si sale BIEN? (Éxito) | ¿Cómo es si sale MAL? (Error controlado con `try/catch`) |
|---|---|---|---|---|---|
| **TP-01** | Ejercicio 1 | **Prueba de tareas pendientes:** Probar que el filtro oculte las tareas completadas (`completed: true`). | Elegir Opción 1 en el menú. | Imprime en consola la lista de usuarios mostrando **únicamente** las tareas pendientes (`completed: false`). | Entra al bloque `catch` e imprime: `"Error al obtener las tareas: [mensaje del error]"`. El programa no se cierra y regresa al menú. |
| **TP-02** | Ejercicio 2 | **Búsqueda exitosa:** Probar con un usuario real (`"Bret"`). | Escribir `"Bret"` en la Opción 2. | Imprime en pantalla el nombre, email, álbumes y todas las fotos correspondientes a "Bret". | N/A (Flujo normal sin errores). |
| **TP-03** | Ejercicio 2 | **Usuario inexistente:** Probar qué pasa si escriben un usuario que no existe (`"UsuarioFalso123"`). | Escribir `"UsuarioFalso123"` en Opción 2. | El programa detecta que no existe e imprime: `"El usuario 'UsuarioFalso123' no fue encontrado."` | No genera un fallo no controlado ni cierra la consola. Maneja la validación de forma limpia y vuelve al menú. |
| **TP-04** | Ejercicio 3 | **Filtro de publicaciones:** Probar la búsqueda por palabra clave (`"qui"`). | Escribir `"qui"` en la Opción 3. | Muestra las publicaciones cuyo título incluye la palabra "qui" y despliega sus comentarios. | Si no hay coincidencias, muestra `"No se encontraron publicaciones con ese título"`. Si falla la API, cae al `catch` notificando el error de red. |
| **TP-05** | Ejercicio 4 | **Simplificación de datos:** Probar que solo extraiga nombre y teléfono. | Elegir Opción 4 en el menú. | Muestra un arreglo de objetos donde cada uno solo tiene las propiedades `name` y `phone`. | Si la API de usuarios falla, cae al bloque `catch` e imprime: `"Error al modificar la estructura de usuarios"`. |
| **TP-06** | Ejercicio 5 | **Consulta masiva:** Probar el cruce completo de todos los datos en memoria. | Elegir Opción 5 en el menú. | Imprime el árbol de datos completo (Usuario -> Posts -> Comentarios y Usuario -> Álbumes -> Fotos). | Si falla cualquiera de las 5 peticiones HTTP a la API, `Promise.all()` atrapa la falla y muestra el error en el `catch` sin detener Node.js. |
| **TP-07** | General | **Fallo de Red:** Simular que el computador no tiene conexión a Internet. | Desconectar Wi-Fi y probar cualquier opción del menú. | N/A | El `fetch` falla, pero el bloque `catch` atrapa la excepción de red e imprime un mensaje amigable: `"Error de conexión con la API"`, manteniendo vivo el menú principal. |