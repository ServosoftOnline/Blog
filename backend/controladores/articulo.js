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
            - Sube las imagenes al backend de forma local
            
            - Sube imagenes a cloudinary
                - Esta ruta sí se encuentra en el front
                - La ejecuto para subir imagenes posteriores a las iniciales que si se borrarán al iniciar desde el front

            - Sube las imagenes iniciales en la carpeta blog_culinario_iniciales.
                - Esta ruta no se encuentra en el front
                - La ejecuto desde postman solo para subir las fotografías de la recetas iniciales

            - Buscador de artículos
            - Inicia la bbdd, borrando todos los documentos de la colección y elimina las imagenes del backend y deja las necesarias

*/

import Articulo from "../modelos/Articulo.js";
import validar from "../helpers/validar.js";
import { unlink } from 'fs/promises';
import fs from "fs";

// Para optimizar el almacenamiento de imagenes de forma remota en cloudinary
import sharp from 'sharp';
// import cloudinary from 'cloudinary';

// Para almacenar imagenes de forma local. Solo válido en la fase de desarrollo
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Para almacenar imagenes en los servidores de cloudinary
import { v2 as cloudinary } from 'cloudinary';

// Información necesaria para el conectar a Cloudinary usando las variables de entorno
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


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
        // await new Promise(resolve => setTimeout(resolve, 2000));

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

// Método para borrar un artículo
export const borrar = async (req, res) => {

    try {

        // Uso req.params.id para identificar un recurso.
        const idABorrar = req.params.id;

        // Buscar el articulo en la bbdd
        const consulta = await Articulo.findOneAndDelete({_id:idABorrar});                 

        if (consulta) {

            // Si existe una imagen asociada, la borramos de Cloudinary
            // AÑADIMOS ESTA COMPROBACIÓN ADICIONAL
            if (consulta.public_id_imagen) {
              
              // Verificamos si la imagen pertenece a la carpeta que queremos proteger
              if (consulta.public_id_imagen.startsWith('blog_culinario_iniciales/')) {
                  console.log("No se ha eliminado la imagen porque pertenece a la carpeta protegida de imágenes iniciales.");
              } else {
                  // Si no pertenece a la carpeta protegida, procedemos a eliminarla
                  await cloudinary.uploader.destroy(consulta.public_id_imagen);
                  console.log("Imagen eliminada de Cloudinary:", consulta.public_id_imagen);
              }
            }            

            // Respondo que se borró de forma correcta
            return res.status(200).json({
                status: 'success',        
                mensaje: "Documento e imagen eliminados correctamente",
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
    
};


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

// Metodo para subir una imagen a cloudinary
export const subirImagenCloudinary = async (req, res) => {

  try {

    // Si no hay un archivo, devuelve un error
    if (!req.file) {
      return res.status(400).send({
        status: "error",
        mensaje: "No se ha proporcionado ningún archivo."
      });
    }

    // Sube el archivo a Cloudinary
    const resultado = await cloudinary.uploader.upload(req.file.path, {
      folder: "blog_culinario" // Opcional: crea una carpeta en Cloudinary
    });

    // Elimina el archivo temporal de la carpeta local
    fs.unlinkSync(req.file.path);

    // Devuelve la URL de la imagen subida
    return res.status(200).send({
      status: "success",
      url: resultado.secure_url,
      public_id: resultado.public_id
    });

  } catch (error) {
    console.error("Error al subir la imagen a Cloudinary:", error);
    return res.status(500).send({
      status: "error",
      mensaje: "Error interno del servidor al subir la imagen."
    });
  }
};


// Metodo para subir una imagen optimizada de prueba inicial a cloudinary. Solo la uso desde postman. No desde el front
export const subirImagenInicialCloudinary = async (req, res) => {

  try {

    // Si no hay un archivo, devuelve un error
    if (!req.file) {
      return res.status(400).send({
        status: "error",
        mensaje: "No se ha proporcionado ningún archivo."
      });
    }

    // Usamos sharp para redimensionar la imagen antes de subirla
    const compressedImageBuffer = await sharp(req.file.path)
      .resize({ width: 1200, withoutEnlargement: true }) // Redimensiona a un ancho máximo de 1200px
      .jpeg({ quality: 80 }) // Comprime a calidad 80
      .toBuffer();

    // Ahora subimos el buffer de la imagen procesada a Cloudinary
    const resultado = await cloudinary.uploader.upload_stream({
      folder: "blog_culinario_iniciales"
    }, (error, result) => {
      if (error) {
        throw new Error(error);
      }
      
      // Elimina el archivo temporal de la carpeta local
      fs.unlinkSync(req.file.path);
      
      // Devuelve la URL de la imagen subida
      return res.status(200).send({
        status: "success",
        url: result.secure_url,
        public_id: result.public_id
      });
    }).end(compressedImageBuffer);


  } catch (error) {
    console.error("Error al subir la imagen inicial a Cloudinary:", error);
    return res.status(500).send({
      status: "error",
      mensaje: "Error interno del servidor al subir la imagen inicial.",
      error: error.message
    });
  }
};


// Método para borrar una imagen de Cloudinary
export const borrarImagenCloudinary = async (req, res) => {
    try {

        // Obtenemos el public_id de la imagen a borrar desde el body        
        const public_id = req.body.public_id;        

        if (!public_id) {
            return res.status(400).send({
                status: "error",
                mensaje: "Falta el public_id de la imagen a eliminar."
            });
        }

        // Eliminamos la imagen de Cloudinary
        const resultado = await cloudinary.uploader.destroy(public_id);
        
        if (resultado.result === 'ok') {
            return res.status(200).send({
                status: "success",
                mensaje: `Imagen con public_id ${public_id} eliminada correctamente.`,
                resultado
            });
        } else {
            return res.status(404).send({
                status: "error",
                mensaje: "No se encontró la imagen en Cloudinary o no pudo ser eliminada."
            });
        }
        
    } catch (error) {
        
        console.error("Error al borrar la imagen de Cloudinary:", error);
        return res.status(500).send({
            status: "error",
            mensaje: "Error interno del servidor al intentar borrar la imagen."
        });        
    }
    
};


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


// Método para borrar todos los articulo. Solo usado en fase de producción
export const borrarTodosLocal = async (req, res) => {

    try {        

        // Paso 1: Eliminar todos los articulos en MongoDB
        await Articulo.deleteMany({});

        // Paso 2: Eliminar los archivos de la carpeta backend/imagenes/articulos que empiecen por "articulo"
        const dirPath = path.join(__dirname, "../imagenes/articulos");

        // Leer los ficheros de la carpeta
        const files = await fs.promises.readdir(dirPath);

        for (const file of files) {
            if (file.startsWith("articulo")) {
                try {
                    await fs.promises.unlink(path.join(dirPath, file));
                } catch (err) {
                    console.error(`Error al borrar ${file}:`, err.message);
                }
            }
        }

        // Paso 3: Responder al cliente
        return res.status(200).json({
            status: "success",
            mensaje: "Todos los documentos e imágenes eliminados correctamente"
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al eliminar todos los artículos",
            error: error.message
        });
    }
};

// Método para borrar todos los articulo. Solo usado en fase de desarrpññp
export const borrarTodosCloudinary = async (req, res) => {

    try {        

        // Paso 1: Eliminar todos los articulos en MongoDB
        await Articulo.deleteMany({});

        // Paso 2: Eliminar todos los archivos de la carpeta en Cloudinary
        // `max_results` es opcional, lo usamos para asegurarnos de que se borran
        // más de 500 imágenes si las hubiera
        await cloudinary.api.delete_resources_by_prefix('blog_culinario/');

        // Paso 3: Responder al cliente
        return res.status(200).json({
            status: "success",
            mensaje: "Todos los documentos e imágenes eliminados correctamente de la base de datos y de Cloudinary"
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al eliminar todos los artículos",
            error: error.message
        });
    }
};