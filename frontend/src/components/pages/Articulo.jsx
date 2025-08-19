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

            {/* Imagen */}
            <div className="imagen-articulo grande">
                <img src={Images.url + datos.consulta.imagen} alt={datos.consulta.titulo} />
            </div>

            {/* Datos */}
            <div className="datos">
                <h3>{datos.consulta.titulo}</h3>
                <p className="fecha">
                    {fechaFormateada(datos.consulta.fecha)} <span className="relativa">({tiempoRelativo(datos.consulta.fecha)})</span>
                </p>
                <p>{datos.consulta.contenido}</p>                              

                {/* Botones */}
                <div className="botones-articulos">
                    <Link to="/articulos">
                        <button className="edit">Volver</button>
                    </Link>
                    <button className="delete" onClick={() => {eliminar(datos.consulta._id)}}>Borrar</button>
                </div>
            </div>

        </article>
    );    
}
 
export default Articulo;