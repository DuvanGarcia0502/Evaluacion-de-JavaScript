# Evaluación Práctica: Asincronía y Manejo de APIs en JavaScript

**Programa de Formación:** Técnico en Programación de Software  
**Centro de Formación:** Centro Industrial de Mantenimiento Integral (SENA)  
**Ficha:** 3234206  
**Instructor:** John Freddy Becerra Castellanos  

---

##  Descripción del Proyecto

Este proyecto consiste en una aplicación de consola desarrollada en **Node.js** utilizando **JavaScript Moderno (ES Modules)**. La aplicación consume la API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/) para realizar diferentes consultas asíncronas, procesar datos relacionales (usuarios, publicaciones, comentarios, álbumes, fotos y tareas) y presentarlos al usuario a través de un menú interactivo en terminal.

El código está organizado siguiendo las mejores prácticas de desarrollo modular, separando las responsabilidades por archivos y usando el **Patrón Barril (Barrel Pattern)** para exportar todo de forma limpia y ordenada.

---

##  Características y Funcionalidades

La aplicación cuenta con un menú interactivo en la consola que permite ejecutar cada uno de los puntos requeridos en la evaluación:

1. **Listar Tareas Pendientes:** Consulta todos los usuarios y muestra únicamente las tareas que están pendientes por completar.
2. **Búsqueda de Usuario y Álbumes:** Pide el nombre de usuario por teclado y muestra sus datos junto con todos sus álbumes y fotografías.
3. **Filtrar Posts por Título:** Pide una palabra por teclado para buscar publicaciones y les adjunta sus respectivos comentarios.
4. **Modificar Estructura de Usuarios:** Obtiene la lista de usuarios y crea un nuevo arreglo que solo contiene el nombre y el teléfono de cada uno.
5. **Consulta Integral de Datos:** Realiza una consulta completa que une a cada usuario con todas sus publicaciones, comentarios, álbumes y fotos.

---

##  Paso a Paso: Proceso de Desarrollo, Pruebas y Avances

Durante la realización de este proyecto seguí un proceso ordenado de construcción y pruebas para verificar que cada consulta asíncrona funcionara antes de integrar todo en el menú principal:

### 1. Configuración Inicial y Conexión Base
Empecé configurando el entorno de Node.js con módulos de ES6 (`"type": "module"`) y creando el módulo `conexionApi.js`. Las primeras pruebas consistieron en hacer peticiones sencillas con `fetch` a la API de JSONPlaceholder y mostrar los datos crudos en la consola usando `console.log`. Al inicio tuve algunos errores típicos de sintaxis al no esperar la conversión a JSON con `await`, pero se corrigieron asegurando que cada llamada usara bloques `try-catch` para capturar cualquier fallo de red.

### 2. Creación de Módulos Específicos
Una vez confirmada la conexión, separé la lógica por archivos según las instrucciones del taller:
* En `gestionTareas.js` probé primero trayendo todas las tareas y luego apliqué un método `.filter()` para dejar solo las que tenían `completed: false`. La prueba en terminal confirmó que solo se mostraban las tareas pendientes por usuario.
* En `gestionPublicaciones.js` realicé pruebas ingresando términos de búsqueda para comprobar que el filtrado por texto funcionara bien y luego crucé los IDs para traer sus comentarios asociados.
* En `gestionUsuarios.js` trabajé la búsqueda individual por `username`, la simplificación del arreglo para extraer únicamente nombres y teléfonos mediante `.map()`, y finalmente la combinación más compleja que anida publicaciones, comentarios, álbumes y fotos en un solo objeto.

### 3. Implementación del Archivo Barril e Interfaz
Para mantener el proyecto limpio, agrupé la exportación de todos los módulos en `index.js`. Luego construí `app.js` importando únicamente este archivo barril. Hice varias pruebas probando el flujo del programa con la librería `readline` para solicitar entradas por teclado, asegurando que el menú se ejecutara correctamente sin bloquear la terminal y permitiera al usuario seleccionar cualquier ejercicio de manera fluida.

---

##  Estructura del Proyecto Explicada

A continuación se explica cómo está organizado el proyecto y qué hace cada archivo en palabras sencillas:

### Archivo Principal
* **`app.js`:** Es el punto de entrada principal y el motor de toda la aplicación. Muestra el menú interactivo en la consola para que el usuario elija qué ejercicio quiere ejecutar y llama a las funciones correspondientes sin recargar la pantalla de código, ya que trae todo desde la carpeta de módulos.

### Carpeta `modules/` (Módulos)
Es la carpeta donde está dividida la lógica del trabajo para mantener el código ordenado y separado por casos de uso:

* **`conexionApi.js`:** Es el conector con Internet. Se encarga de hacer las peticiones asíncronas (`fetch`) a la API de JSONPlaceholder para traer la información requerida y controlar los errores de conexión.
* **`gestionTareas.js`:** Contiene la lógica para revisar todas las tareas y filtrar únicamente las que están pendientes por completar.
* **`gestionPublicaciones.js`:** Se encarga de buscar y filtrar las publicaciones según lo que escriba el usuario y les conecta sus comentarios correspondientes.
* **`gestionUsuarios.js`:** Maneja las consultas más avanzadas sobre los usuarios. Permite buscarlos por su nombre de usuario, traer sus álbumes con fotos, extraer solo el nombre y teléfono, y hacer la unión completa de todos los datos.
* **`index.js` (Archivo Barril):** Funciona como un puente o central. Agrupa todas las funciones de los módulos anteriores y las exporta juntas para que `app.js` solo tenga que importar este único archivo.

### Archivos de Configuración y Documentación
* **`package.json`:** Es el archivo de configuración de Node.js. Indica que el proyecto usa módulos modernos de JavaScript (`"type": "module"`) y guarda la información general del proyecto.
* **`.gitignore`:** Le indica a Git qué archivos o carpetas no debe subir al repositorio de GitHub para mantenerlo limpio.
* **`README.md`:** Es la portada y guía explicativa del proyecto con toda la documentación.

---

##  Tecnologías Utilizadas

* **Lenguaje:** JavaScript (Node.js con ES Modules)
* **API Externa:** [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
* **Módulos Nativos:** `readline/promises` (para leer datos por teclado sin bloquear el programa) y `fetch` (para hacer peticiones HTTP).
* **Control de Versiones:** Git y GitHub.

---

##  Instalación y Ejecución

1. Clonar el repositorio:

   git clone <https://github.com/DuvanGarcia0502/Evaluacion-de-JavaScript.git>