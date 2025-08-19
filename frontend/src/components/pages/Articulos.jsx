/*
    COMPONENTE QUE SE ENCARGA DE LISTAR LOS ARTICULOS EXISTENTES EN EL BLOG:

        - Mostará mientras se cargan los articulos y se produce algún error
        - Para ejecutar las operaciones con la bbdd usa el hook useApi

*/
import { Global } from '../../helpers/Global';
import { useApi } from '../../hooks/useApi';
import { Listado } from './Listado';


// Componente
const Articulos = () => {

    // Creo la url usando mi helper Global.jsx y añado un orden descendente
    const url = Global.url + "listar?orden=desc";

    // Extraigo datos y cargando del custom hook useAjax. Le paso la url y el método
    const { datos, cargando, error, fetchData } = useApi(url, 'GET');

    // Si estubiera cargando devuelvo el mensaje
    if (cargando) {
        return <h3 className='jumbo'>Cargando recetas...</h3>;
    }

    // Si se hubiera producirdo un error devuelvo el mensaje
    if (error) return <h3 className='jumbo'>Error: {error}</h3>;

    // Renderizo el listado de los encontrados
    return (
        <Listado datos={datos} fetchData={fetchData}/>            
    );
}

export default Articulos;
