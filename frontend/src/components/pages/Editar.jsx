import { useApi } from "../../hooks/useApi";
import { Global } from "../../helpers/Global";
import { Images } from "../../helpers/Images"; 
import { useEffect } from "react";
import { useParams} from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";

// Componente
const Editar = () => {

    // Obtengo el id y creo la cte para redirigir
    const { id } = useParams();    
    const navigate = useNavigate();

    

    // 1️⃣ GET: obtener el artículo con autoFetch = true
    const { datos: articulo, cargando } = useApi(`${Global.url}articulo/${id}`, "GET", null, true);    

    // 2️⃣ PUT: hook preparado pero manual (autoFetch = false)
    const { fetchData: actualizar, datos: actualizado, error } = useApi(
        `${Global.url}articulo/${id}`,
        "PUT",
        null,
        false
    );

    // Submit: recogemos valores del formulario y hacemos el PUT
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1️⃣ Primero recojo los valores básicos
        const parametros = {
            titulo: e.target.titulo.value,
            contenido: e.target.contenido.value
        };

        // 2️⃣ Actualizo el artículo
        const respuestaEdicion = await actualizar(`${Global.url}articulo/${id}`, parametros, "PUT");

        // 3️⃣ Si se actualizó y además hay archivo, lo subo
        const fileInput = document.querySelector("#file");
        if (respuestaEdicion?.articuloActualizado?._id && fileInput?.files[0]) {
            const formData = new FormData();
            formData.append("file0", fileInput.files[0]);

            // Aquí puedes usar el mismo hook useApi o un fetch "a mano"
            await fetch(`${Global.url}subir-imagen/${respuestaEdicion.articuloActualizado._id}`, {
                method: "POST",
                body: formData
            });
        }

        // Paso 3: Redirijo hacia la pagina de detalles del articulo        
        navigate('/articulo/' + respuestaEdicion.articuloActualizado._id);
    };

    if (cargando) return <h3 className="jumbo">Cargando artículo...</h3>;

    // Renderizo
    return (
        <div className="jumbo">
            <h3>Introduzca las modificaciones de la receta</h3>

            <form className="formulario" onSubmit={handleSubmit}>
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
                    <label>Imagen actual</label>                         
                    {articulo?.consulta?.imagen &&
                        <img                             
                            src={`${Images.url}${articulo.consulta.imagen}`} 
                            alt="Imagen del artículo" 
                            className="miniatura" 
                        />
                    }
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