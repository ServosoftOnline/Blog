/*
    CONTROLADOR ARTICULO:

        - Contiene todos los métodos para poder trabajar con articulos en el backend
        - Exporto todos los métodos
        - Los importaré desectructurando donde sea necesario

        - Contiene una series de metodos para hacer pruebas:

            - Método de prueba.
            - Método que responde un objeto json con los datos del curso actual
            - Método que responde un array de objetos con el resto de cursos     

        - Métodos más útiles para hacer funciones de CRUD con mongoDb:

            - Crea un nuevo documento en la bbdd
            - Obtiene un listado de articulos con parámetros de busqueda opcionales
            - Obtiene un solo articulo pasando un id de forma obligatoria
            - Borrar un articulo pasando un id de forma obligatoria
            - Editar un articulo pasando un id de forma obligatoria

*/

import Articulo from "../modelos/Articulo.js";
import validar from "../helpers/validar.js";
import { unlink } from 'fs/promises';
import path from "path";
import fs from 'fs';



// Método de prueba
export const prueba = (req,res) => {
    return res.json({
        mensaje: "Soy una acción de mi controlador de articulo"
    });
}

// Método que responde un objeto json con los datos del curso actual
export const datosDelCurso = (req, res) => {
    return res.json({
        curso: "MERN",
        fecha: "3 agosto",
        anio: 2025
    });
}

// Método que responde un array de objetos con el resto de cursos
export const restoDeCursos = (req, res) => {
    return res.json([{
        curso: "MERN",
        fecha: "3 agosto 2025",
        anio: 2025
        },

        {
        curso: "MEAN",
        fecha: "5 septiembre 2025",
        anio: 2025
        }

    ]);

}

// Metodo para crear nuevo documento en la bbdd
export const crearDocumento = async (req, res) => {

    // Obtengo los parametros del body
    const parametros = req.body;

    try {

        // Valido mediante mi helper
        const { valido, mensaje } = validar(parametros);
        if (!valido) {throw new Error(mensaje);}

        // Llegado a este lugar es que paso la validación.
        // Creo una nueva instancia del modelo Articulo pasandole los parámetros y lo almaceno en la cte articulo
        const articulo = new Articulo(parametros);

        // Guardo el articulo usando el método save de mongoose y lo almaceno en articuloGuardado
        const articuloGuardado = await articulo.save();

        // Respondo que se guardó todo bien y el articulo guardado que ya sigue el modelo
        return res.status(200).json({
            status: "success",
            mensaje: "Documento creado correctamente",
            articulo: articuloGuardado
        });

    } catch (error) {

        // Respondo que se produjo un error y el mensaje que almacené en el throw
        return res.status(500).json({
            status: "error",
            mensaje: error.message
        });
    }
};

// Metodo para obtener un listado de articulos con parámetros de busqueda opcionales
export const listadoArticulos = async (req, res) => {
    try {

        // Simular retardo de 2 segundos (2000 ms)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Hago la consulta de todos los articulos        
        let consulta = Articulo.find({});        

        // Uso req.query para aplicar filtros, orden o límites y/o pasar parámetros opcionales
        // Modifico la consulta añadiendo un orden ascendente o descendente dependiendo si existiera el parametro opcional orden
        if (req.query.orden) {
            const orden = req.query.orden === 'asc' ? 1 : -1;
            consulta = consulta.sort({ fecha: orden });
        }

        // Modifico la consulta añadiendo un límite de resultados mostrados si exitiera el parámetro opcional limite
        if (req.query.limite) {
            consulta = consulta.limit(parseInt(req.query.limite));
        } 

        // Ejecuto la consulta de forma asincrona con las modificaciones que se hallan podido producir
        const articulos = await consulta;

        // Respondo exito, parámetros opcionales, número de articulos mostrados y el objeto articulos con el rdo de la consulta
        return res.status(200).json({
            status: 'success',
            parametros: req.query,
            numeroArticulos: articulos.length,
            articulos
        });

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            mensaje: 'Error al obtener los artículos',
            error: error.message
        });
    }
};

// Metodo para obtener un solo articulo. 
export const uno = async(req, res) => {

    try {

        // Uso req.params para recoger el parametro oblicagorio id        
        const id = req.params.id;

        // Buscar el articulo en la bbdd
        const consulta = await Articulo.findById(id);        

        // Responde con los datos de la consulta        
        return res.status(200).json({
            status: 'success',
            consulta
        });


    } catch (error){
        return res.status(500).json({
            status: 'error',
            mensaje: 'Error al obtener el articulo',
            error: error.message
        });
    }

}

// Método para borrar un articulo
export const borrar = async (req, res) => {

    try {

        // Uso req.params.id para identificar un recurso.
        const idABorrar = req.params.id;

        // Buscar el articulo en la bbdd
        const consulta = await Articulo.findOneAndDelete({_id:idABorrar});          

        if(consulta) {

            // Respondo que se borró de forma correcta
            return res.status(200).json({
                status: 'success',        
                mensaje: "Documento eliminado correctamente",
                articuloEliminado: consulta
            });

        } else {
            return res.status(404).json({
                status: 'error',
                mensaje: "No existe el artículo a eliminar"
            });
        } 
        
    } catch (error) {
        return res.status(500).json({
            status: 'error',            
            mensaje: "Error al eliminar el artículo",
            error: error.message
        });
    }
    
}

// Método para editar un articulo
export const editar = async (req, res) => {

    try {

        // Recoger id articulo a editar
        const idAEditar= req.params.id;

        // Recoger nuevos datos del body
        const parametros = req.body;        

        // Valido mediante mi helper
        const { valido, mensaje } = validar(parametros, idAEditar);
        if (!valido) {
            return res.status(400).json({
                status: 'error',
                mensaje
            });
        }

        // Busco el articulo y lo actualizo incluido la fecha de actualización del articulo
        // { new: true }	Devuelve el artículo ya actualizado, útil para confirmar y mostrar datos.
        const encuentraYActualiza = await Articulo.findOneAndUpdate(
            { _id: idAEditar },
            {
                ...parametros,                  
                fechaActualizacion: new Date() 
            },            
            { new: true }
        );       

        // Si no lo encontró
        if(!encuentraYActualiza) {
            return res.status(404).json({
                status: 'error',        
                mensaje: "No se existe el articulo a editar"        
            });
        }

        // Llegado este momento ya encontró y actualizó        
        return res.status(200).json({
            status: 'success',
            mensaje: "Documento editado correctamente",
            articuloActualizado: encuentraYActualiza
        });

    } catch (error) {

        // Devuelvo que se produjo un error al editar el articulo
        return res.status(500).json({
            status: 'error',            
            mensaje: "Error al editar el artículo",
            error: error.message
        });
    }

}

// Método para subir imágenes al backend
export const subir = async (req, res) => {

    try {        

        // Recogo el id del articulo
        const id = req.params.id;        

        // Compruebo que se halla subido al menos un archivo
        if(!req.file && !req.files) {
            return res.status(404).json({
                status: 'error',
                mensaje: 'No se adjunto ningun archivo en la subida'
            });

        }

        // Obtengo el nombre de la imagen
        const archivo = req.file.originalname;

        // Obtengo su extension
        const archivo_split = archivo.split('\.');
        const extension = archivo_split[1];

        // Compruebo si la extension correcta
        if(extension != 'jpg' && extension != 'jpeg' && extension != 'png' && extension != 'gif') {

            // Borro el archivo que se subió por error y respondo con error
            await unlink(req.file.path);

            return res.status(400).json({
                status: 'error',
                mensaje: 'Extensión incorrecta. Extensiones correctas: jpg, jpeg, png o gif',
                extension_erronea: extension
            });
        }

        // Actualizo el documento asociado al id añadiendo la ruta de la imagen
        await Articulo.findOneAndUpdate(
            { _id: id },
            {imagen: req.file.filename},
            { new: true }
        ); 

        // Respondo que se realizó la operacion de forma correcta        
        return res.status(200).json({
            status: 'success',
            mensaje: "imagen subida correctamente",            
            file: req.file
        });


    } catch (error) {

        // Devuelvo que se produjo un error al subir la imagen
        return res.status(500).json({
            status: 'error',            
            mensaje: "Error al subir la imagen",
            error: error.message
        });

    }
    
}

// Metodo que proporciona un buscador de articulos
export const buscador = async (req, res) => {

    try {

        // Obtengo el texto a buscar pasado como parámetro
        const textoABuscar = req.params.busqueda;

        // Obtengo los articulos cuyo titulo o contenido contengan el texto a buscar ordenados por fecha descendente
        const articulosEncontrados = await Articulo.find({
            "$or": [
                { "titulo":   { "$regex": textoABuscar, "$options": "i" } },
                { "contenido":{ "$regex": textoABuscar, "$options": "i" } }
            ]
        }).sort({ fecha: -1 });

        // Respondo lo que encuentre o que no encontré nada
        return res.status(200).json({
            status: "success",
            mensaje: articulosEncontrados.length > 0 
                ? "Artículos encontrados: " + articulosEncontrados.length
                : "No se encontraron artículos con ese texto",            
            articulos: articulosEncontrados,
            
        });

    } catch (error) {

        // Si se produjo algún error en la busqueda devuelvo esto
        return res.status(500).json({
            status: "error",
            mensaje: "Error en la búsqueda",
            error: error.message
        });
    }
};

// Método para borrar todos los articulos
export const borrarTodos = async (req, res) => {

    try {        

        // Elimina todo los articulos
        await Articulo.deleteMany({});

        // Respondo que se borró de forma correcta
        return res.status(200).json({
            status: 'success',        
            mensaje: "Todos los documentos eliminados correctamente"        
        });
        
    } catch (error) {
        return res.status(500).json({
            status: 'error',            
            mensaje: "Error al eliminar todos los artículo",
            error: error.message
        });
    }
    
}
