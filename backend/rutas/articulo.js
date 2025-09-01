/*
    RUTAS ASOCIADAS AL CONTROLADOR DE ARTICULO

        - Estructura de las rutas : cteDondeAlmacenoElMetodoRouter.metodoHTTP("url", metodo del controlador)
        - Ejemplos de rutas validas para routerArticulo.get('/listar', listadoArticulos)

            - sin filtros:      http://localhost:3900/api/listar
            - Con un filtro:    http://localhost:3900/api/listar?orden=desc
            - Con un filtro:    http://localhost:3900/api/listar?limite=3
            - con dos filtros:  http://localhost:3900/api/listar?orden=asc&limite=3


*/

/*
    RUTAS ASOCIADAS AL CONTROLADOR DE ARTICULO
*/

// Asigno el metodo Router de express a la cte routerArticulo
import express from "express";
const routerArticulo = express.Router();

// Importa el middleware de Multer configurado para Cloudinary
import upload from '../middleware/subirImagen.jsx'; // Asegúrate de crear este archivo

// Importo desextructurando los métodos de mi controlador articulo
import  {
    prueba, datosDelCurso, restoDeCursos, crearDocumento, listadoArticulos, uno,
    borrar, editar, subirImagenCloudinary, borrarImagenCloudinary, buscador,
    borrarTodosCloudinary
} from "../controladores/articulo.js";

// Tus otras rutas...
routerArticulo.get('/ruta-de-prueba', prueba);
routerArticulo.get('/curso', datosDelCurso);
routerArticulo.get('/mas-cursos', restoDeCursos);
routerArticulo.post('/crear', crearDocumento);
routerArticulo.get('/listar', listadoArticulos);
routerArticulo.get('/articulo/:id', uno);
routerArticulo.delete('/articulo/:id', borrar);
routerArticulo.put('/articulo/:id', editar);

// --- RUTAS SIMPLIFICADAS PARA CLOUDINARY ---
// Usa el middleware 'upload' para la subida. Ya no necesitas configurarlo aquí.
routerArticulo.post("/subir-imagen/:id", upload.single('imagen'), subirImagenCloudinary);

// Ruta para borrar una imagen de cloudinary
routerArticulo.delete("/borrar-imagen-cloudinary", borrarImagenCloudinary);

// Ruta para el buscador
routerArticulo.get('/buscar/:busqueda', buscador);

// Ruta para eliminar todos los articulos en fase de producción
routerArticulo.delete('/borrar-todos-cloudinary', borrarTodosCloudinary);

// Exporto las rutas
export default routerArticulo;