/*
    COMPONENTE PARA EDITAR UN ARTICULO
        - Usa un hook para poder comprimir la imagen antes de subirla
    
*/

import { useApi } from "../../hooks/useApi";
import { Global } from "../../helpers/Global";
import { useParams} from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import { useImageCompressor } from "../../hooks/useImageCompressor";
import './../../styles/pages/editar.css';

// Componente
const Editar = () => {

    // Obtengo el id y creo la cte para redirigir
    const { id } = useParams();    
    const navigate = useNavigate();

    // Obtengo la información del articulo a editar de forma inmediata con autoFetch = true
    const { datos: articulo, cargando } = useApi(`${Global.url}articulo/${id}`, "GET", null, true);    

    // Petición para actualizar la base de datos para ejecutar despues con autoFetch = false
    const { fetchData: actualizarBBDD, datos: actualizado, error } = useApi(
        `${Global.url}articulo/${id}`,
        "PUT",
        null,
        false
    );

    // Petición para actualizar la imagen en cloudinary para ejecutar despues con autoFetch = false
    const { fetchData: actualizarImagen} = useApi(
        `${Global.url}subir-imagen-cloudinary`,        
        "PUT",
        null,
        false
    );

    // Petición para eliminar la imagen anterior de Cloudinary para ejecutar despues con autoFetch = false
    const { fetchData: borrarImagen} = useApi(
        `${Global.url}borrar-imagen-cloudinary`,
        "DELETE",
        null,
        false
    );
    
    // Uso el nuevo custom hook para comprimir imágenes
    const { comprimirImagen } = useImageCompressor();

    // Recogo los valores del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let parametros = {
            titulo: e.target.titulo.value,
            contenido: e.target.contenido.value
        };

        // Actualizo el artículo en la bbdd
        const respuestaEdicion = await actualizarBBDD(`${Global.url}articulo/${id}`, parametros, "PUT");

        // Si se actualizó de forma correcta y además seleccionó un archivo lo subo
        const fileInput = document.querySelector("#file");
        if (respuestaEdicion?.articuloActualizado?._id && fileInput?.files[0]) {
            
            // Comprimimos la imagen antes de subirla
            const compressedFile = await comprimirImagen(fileInput.files[0]);

            // Creo el formData y le añado el archivo comprimido
            const formData = new FormData();
            formData.append("file0", compressedFile);
            
            // Subo la imagen y almaceno lo devuelvo en respuestaSubida
            const respuestaSubida = await actualizarImagen(Global.url + 'subir-imagen-cloudinary/', formData, 'POST');  

            // Modifico los parámetros añadiendo la url devuelta por cloudinary en la respuesta
            parametros = {
                titulo: e.target.titulo.value,
                contenido: e.target.contenido.value,
                imagen: respuestaSubida.url,
                public_id_imagen: respuestaSubida.public_id
            }

            // Edito el articulo de la bbdd modificando con la url con la url de la imagen subida
            await actualizarBBDD(`${Global.url}articulo/${id}`, parametros, "PUT");
            

            // Si la imagen antigua se encuentra en la carpeta blog_culinario_iniciales/ de cloudinary no se borrará
            if (respuestaEdicion.articuloActualizado.public_id_imagen && 
                !respuestaEdicion.articuloActualizado.public_id_imagen.startsWith('blog_culinario_iniciales/')) {
                
                // Si no pertenece a la carpeta protegida, procedemos a eliminarla
                await borrarImagen(
                    `${Global.url}borrar-imagen-cloudinary`,
                    { public_id: respuestaEdicion.articuloActualizado.public_id_imagen },
                    'DELETE'
                );
            }
            
        }

        // Paso 3: Redirijo hacia la pagina de detalles del articulo        
        navigate('/articulo/' + respuestaEdicion.articuloActualizado._id);
    };

    if (cargando) return <h3 className="jumbo">Cargando artículo...</h3>;

    // Renderizo
    return (
        <div className="modificaciones-container">
            <h2>Introduzca modificaciones</h2>

            <form className="formulario" onSubmit={handleSubmit}>

                <div className="form-group">
                    
                    {articulo?.consulta?.imagen &&
                        <img                                                 
                            src={`${articulo.consulta.imagen}`} 
                            alt="Imagen del artículo" 
                            className="miniatura" 
                        />
                    }
                </div>

                <div className="form-group">
                    <label htmlFor="titulo">Titulo</label>
                    <input
                        type="text"
                        name="titulo"
                        id="titulo"
                        defaultValue={articulo?.consulta?.titulo}                        
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="contenido">Contenido</label>
                    <textarea
                        name="contenido"
                        id="contenido"
                        defaultValue={articulo?.consulta?.contenido}

                    />
                </div>

                <div className="form-group">
                    <label htmlFor="file0">Seleccione nueva imagen</label>
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

            <div className="mensajes-de-estado">
                {error && <h3 className="mensaje-error">{error}</h3>}
                {actualizado && (<h3 className="mensaje-exito">{actualizado.mensaje}</h3>)}
            </div>

        </div>
    );
};

export default Editar;
