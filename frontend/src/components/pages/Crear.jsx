/*
    COMPONENTE PARA CREAR UN NUEVO ARTICULO        
*/

import { useApi } from "../../hooks/useApi";
import { Global } from "../../helpers/Global";
import { Link, useNavigate } from "react-router-dom";
import { useImageCompressor } from "../../hooks/useImageCompressor";

// Componente
const Crear = () => {

    // Creo mi cte para redirigir
    const navigate = useNavigate();

    // Uso el hook para preparar la petición POST pero sin ejecutarla todavía
    const { fetchData, datos, cargando, error } = useApi(
        Global.url + 'crear',   
        'POST',                 
        null,                 // Body se pasará manualmente con los datos del nuevo formulario
        false                 // No ejecutar automáticamente
    );

    // Uso el nuevo custom hook para comprimir imágenes
    const { comprimirImagen } = useImageCompressor();
    
    // Funcion que recoge los datos del formulario, los almacena en la bbdd y sube la imagen
    const handleSubmit = async (e) => {
        e.preventDefault();

        let nuevoArticulo = {
            titulo: e.target.titulo.value,
            contenido: e.target.contenido.value
        };

        // Paso 1: Crear artículo
        const respuestaCreacion = await fetchData(Global.url + 'crear', nuevoArticulo);

        // Paso 2: Cuando tenga respuesta trato de subir la imagen
        if (respuestaCreacion?.articulo?._id) {          

            // Obtengo información del archivo subido mediante el id del input tipo fichero
            const fileInput = document.querySelector("#file");           

            // Solo si tengo un fileInput subo la imagen
            if (fileInput?.files[0]) {
                
                // Comprimo la imagen antes de subirla
                const compressedFile = await comprimirImagen(fileInput.files[0]);

                // Creo y añado la información al formdata
                const formData = new FormData();
                formData.append('file0', compressedFile);
                const respuestaSubida = await fetchData(Global.url + 'subir-imagen-cloudinary/', formData, 'POST');                     
               
                // Modifico el objeto nuevoArticulo con el link de la imagen devuelto en la subida
                nuevoArticulo = {
                    titulo: e.target.titulo.value,
                    contenido: e.target.contenido.value,
                    imagen: respuestaSubida.url,
                    public_id_imagen: respuestaSubida.public_id
                }                
                
                // Edito el articulo modificando con la url de la imagen subida
                await fetchData(`${Global.url}articulo/${respuestaCreacion.articulo._id}`, nuevoArticulo, "PUT");
            }
        }

        // Paso 3: Redirijo hacia la pagina de detalles del articulo        
        navigate('/articulo/'+respuestaCreacion.articulo._id);
    };


    // Renderizo
    return (
        <div className="jumbo">

            <h2>Nueva receta</h2>
            <form className="formulario" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="titulo">Titulo</label>
                    <input type="text" name="titulo" id="titulo" />
                </div>

                <div className="form-group">
                    <label htmlFor="contenido">Contenido</label>
                    <textarea type="text" name="contenido" id="contenido" />
                </div>

                <div className="form-group">
                    <label htmlFor="file0">Imagen</label>
                    <input type="file" name="file0" id="file" />
                </div>

                {/* Botones */}
                <div className="botones-articulos">
                    <input type="submit" value="Guardar" className="edit" />
                    <Link to="/articulos">
                        <button className="back">Volver</button>
                    </Link>
                </div>

            </form>

            {/* Mensajes de estado */}
            <div className="mensajes-de-estado">
                {cargando && <h3 className="mensaje-cargando">Guardando artículo...</h3>}
                {error && <h3 className="mensaje-error">Datos tratados de almacenar no son válidos: {error}</h3>}
                {datos && <h3 className="mensaje-exito">Artículo creado correctamente</h3>}
            </div>
            
        </div>

    );
}
 
export default Crear;