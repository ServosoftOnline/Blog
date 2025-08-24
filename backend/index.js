/* CONEXION CON LA BBDD Y SERVIDOR MEDIANTE EXPRESS */

// Carga las variables de entorno
import 'dotenv/config';

// Importo la conexion
import { conexion } from "./basedatos/conexion.js";

// Importo express y cors
import express from 'express';
import cors from 'cors';

// Importo todas las rutas asociadas al articulo
import routerArticulo from "./rutas/articulo.js";

// Conecto con la bbdd
conexion();

// Creo el servidor y establezco el puerto
const app = express();
const puerto = process.env.PORT || 3900;

// middleware de cors
app.use(cors());

// middleware para convertir body a un objeto js
app.use(express.json()); // Recibe datos con content-type app/json
app.use(express.urlencoded({extended:true})); // recibe datos form-urlencoded

// middleware para servir la carpeta de imagenes en el navegador
// http://localhost:3900/imagenes/articulo1754676429298sandwich_1100x733.jpg mostraría la imagen en el navegador
// almacenada en ./imagenes/articulos
app.use('/imagenes', express.static('./imagenes/articulos'));


// RUTAS

// Raiz
app.get('/', (req, res) => {
    res.send(`
        <h1>API REST con nodejs</h1>
    `)
});

// Hacia mis apis de las rutas articulo. Añado el prefijo /api/ a la url. Ej: localhost:3900/api/ruta-de-prueba es una ruta válida
app.use("/api/", routerArticulo);

// FIN DE LAS RUTAS

// Lanzo el servidor
app.listen(puerto,() => {
    console.log('Servidor corriendo en el puerto ' + puerto);
});
