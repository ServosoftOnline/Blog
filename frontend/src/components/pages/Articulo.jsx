// COMPONENTE QUE MUESTRA UN SOLO ARTICULO

import { Global } from '../../helpers/Global';
import { Images } from '../../helpers/Images';
import { fechaFormateada, tiempoRelativo } from '../../helpers/Fechas';
import { useApi } from '../../hooks/useApi';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Componente
const Articulo = () => {

    // Obtengo el id pasado por parámetro y creo mi cte para navegar
    const {id} = useParams();
    const navigate= useNavigate();

    // Creo la url usando mi helper Global.jsx
    const url = Global.url + "articulo/" + id;
    
    // Extraigo datos y cargando del custom hook useAjax. Le paso la url y el método
    const { datos, cargando, error, fetchData} = useApi(url, 'GET');
    
    // Si estubiera cargando devuelvo el mensaje
    if (cargando) {
        return <h3 className="jumbo">Cargando artículos...</h3>;
    }
    
    // Si la consulta fue realizada de forma correcta
    if (!datos?.consulta) {
        return <h3 className="jumbo">No se ha encontrado el artículo</h3>;
    }
    
    // Si se hubiera producirdo un error devuelvo el mensaje
    if (error) return <h3 className="jumbo">Error: {error}</h3>;    
    
    // Renderizo
    return (        
        <article className="articulo-detalle">

            <h2>{datos.consulta.titulo}</h2>
            {/* Imagen */}
            <div className="imagen-articulo grande">
                {/* <img src={Images.url + datos.consulta.imagen} alt={datos.consulta.titulo} /> */}
                <img src={datos.consulta.imagen} alt={datos.consulta.titulo} />
            </div>

            {/* Datos */}
            <div className="datos">
                <h3>Receta: {datos.consulta.titulo}</h3>
                <div className='fechas'>
                
                    <p className="fecha">
                        Receta creada: {" "} 
                        {fechaFormateada(datos.consulta.fecha)} 
                        <span className="relativa"> ( {tiempoRelativo(datos.consulta.fecha)} )</span>
                    </p>                      

                    <p className="fecha">
                        Última fecha de modificación:  {" "}
                        {fechaFormateada(datos.consulta.fechaActualizacion)} 
                        <span className="relativa"> ( {tiempoRelativo(datos.consulta.fechaActualizacion)} )</span>
                    </p> 

                </div>

                                 
                
                <p className='contenido'>{datos.consulta.contenido}</p>                              

                {/* Botones */}
                <div className="botones-articulos">
                    <Link to={"/editar/" + datos.consulta._id} className="edit">Editar</Link>                                        
                    <Link to={"/eliminar/" + datos.consulta._id} className="delete">Borrar</Link>
                    <Link to="/articulos" className="back">Volver</Link>                     
                </div>
            </div>

        </article>
    );    
}
 
export default Articulo;