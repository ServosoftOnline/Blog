/*
    RUTAS ASOCIADAS AL CONTROLADOR DE ARTICULO
        - Estructura de las rutas : cteDondeAlmacenoElMetodoRouter.metodoHTTP("url", metodo del controlador)
*/

// Asigno el metodo Router de express a la cte routerArticulo
import express from "express";
const routerArticulo = express.Router();

// Importo el middleware multer para poder subir archivos
import multer from "multer";

// Configuro donde almacenar los archivos
const almacenamiento = multer.diskStorage({

    // Carpeta donde se almacenarán
    destination: (req, file, cb) => {
        cb(null, './imagenes/articulos');
    },

    // Estructura del nombre de los archivos
    filename: (req, file, cb) => {
        cb(null, "articulo" + Date.now() + file.originalname);
    }
});

// Indico a multer las caracteristicas del almacenamiento
const subidas = multer({storage:almacenamiento});

// --- MULTER PARA CLOUDINARY (usa memoria, no disco) ---
const almacenamientoMemoria = multer.memoryStorage();
const subidasMemoria = multer({ storage: almacenamientoMemoria });

// Importo desextructurando los métodos de mi controlador articulo
import  {prueba, datosDelCurso, restoDeCursos, crearDocumento, listadoArticulos, uno,
        borrar, editar, subirImagenCloudinary, subirImagenInicialCloudinary, borrarImagenCloudinary, buscador,
        borrarTodosCloudinary} from "../controladores/articulo.js";

// Creo la ruta de prueba con el metodo prueba de mi controlador articulo
routerArticulo.get('/ruta-de-prueba', prueba);

// Creo la ruta curso con el metodo datosDelCurso de mi controlador articulo
routerArticulo.get('/curso', datosDelCurso);

// Creo la ruta de mas-cursos con el metodo restoDeCursos de mi controlador articulo
routerArticulo.get('/mas-cursos', restoDeCursos);

// Ruta que crea un nuevo articulo
routerArticulo.post('/crear', crearDocumento);

/*
    Ejemplos de rutas validas para routerArticulo.get('/listar', listadoArticulos)

        - sin filtros:      http://localhost:3900/api/listar
        - Con un filtro:    http://localhost:3900/api/listar?orden=desc
        - Con un filtro:    http://localhost:3900/api/listar?limite=3
        - con dos filtros:  http://localhost:3900/api/listar?orden=asc&limite=3


*/
routerArticulo.get('/listar', listadoArticulos);

// ruta que devuelve un solo artículo. Ej ruta correcta: http://localhost:3900/api/articulo/68a0b0c6e1727de97e6620fe
routerArticulo.get('/articulo/:id', uno);

// Ruta que elimina un articulo
routerArticulo.delete('/articulo/:id', borrar);

// Ruta para editar un articulo
routerArticulo.put('/articulo/:id', editar);

// Ruta para subir una imagen a cloudinary
routerArticulo.post("/subir-imagen-cloudinary", subidasMemoria.single('file0'), subirImagenCloudinary);

// Ruta para subir una imagen inicial a cloudinary
routerArticulo.post("/subir-imagen-cloudinary-inicial", subidasMemoria.single('file0'), subirImagenInicialCloudinary);

// Ruta para borrar una imagen de cloudinary
routerArticulo.delete("/borrar-imagen-cloudinary", borrarImagenCloudinary);

// Ruta para acceder al buscador
routerArticulo.get('/buscar/:busqueda', buscador);

// Ruta para eliminar todos los articulos en fase de producción
routerArticulo.delete('/borrar-todos-cloudinary', borrarTodosCloudinary); 

// Exporto las rutas
export default routerArticulo;