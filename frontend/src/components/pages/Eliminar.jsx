// COMPONENTE QUE MUESTRA LA PANTALLA ANTES DE CONFIRMAR LA ELIMINACIÓN DE UN ARTICULO

import { Global } from '../../helpers/Global';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './../../styles/pages/eliminar.css';
import { fechaFormateada, tiempoRelativo } from '../../helpers/Fechas';
import { useApi } from '../../hooks/useApi';


// Componente
const Eliminar = () => {

    // Obtengo el id pasado por parámetro y creo mi cte para navegar
    const {id} = useParams();
    const navigate= useNavigate();

    // Creo la url usando mi helper Global.jsx
    const url = Global.url + "articulo/" + id;
    
    // Extraigo datos y cargando del custom hook useAjax. Le paso la url y el método
    const { datos, cargando, error, fetchData} = useApi(url, 'GET');
    
    // Si estubiera cargando devuelvo el mensaje
    if (cargando) {
        return <h3 className="jumbo">Cargando artículo...</h3>;
    }
    
    // Si la consulta fue realizada de forma correcta
    if (!datos?.consulta) {
        return <h3 className="jumbo">No se ha encontrado el artículo</h3>;
    }
    
    // Si se hubiera producirdo un error devuelvo el mensaje
    if (error) return <h3 className="jumbo">Error: {error}</h3>;    

    // Funcion para que elimina un articulo
    const eliminar = async (id) => {
        
        const urlDelete = Global.url + 'articulo/' + id;
        await fetchData(urlDelete, null, 'DELETE');

        // Redirigir tras eliminar
        navigate("/articulos");        
    };

    // Renderizo
    return (        
        
        <article className="articulo-detalle">
            <h2 className='eliminar-receta'>Confirmar eliminación</h2>

            {/* Imagen */}
            <div className="imagen-articulo grande">
                <img src={datos.consulta.imagen} alt={datos.consulta.titulo} />
            </div>

            {/* Datos */}
            <div className="datos">
                <h3>{datos.consulta.titulo}</h3>
                <div className='fechas'>

                    <div className='fecha'>
                        <p>Creada:</p>
                        <p>{fechaFormateada(datos.consulta.fecha)} - {tiempoRelativo(datos.consulta.fecha)} </p>
                    </div>

                    <div className='fecha'>
                        <p>Modificada:</p>
                        <p>
                            {fechaFormateada(datos.consulta.fechaActualizacion)} - {tiempoRelativo(datos.consulta.fechaActualizacion)}  
                        </p>

                    </div>   

                </div>  
                
                <p>{datos.consulta.contenido}</p>                              

                {/* Botones */}
                <div className="botones-articulos">
                    <Link to="/articulos">
                        <button className="back">Volver</button>
                    </Link>
                    <button
                        className="delete" onClick={
                            () => {eliminar(datos.consulta._id)}
                        }>Eliminación definitiva
                    </button>
                </div>
            </div>

        </article>
    );    
}
 
export default Eliminar;