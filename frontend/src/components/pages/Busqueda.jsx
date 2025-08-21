/*
    COMPONENTE QUE MUESTRA LOS RESULTADOS DEL BUSCADOR
        - Recibirá por parámetro el texto a buscar
*/

import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { useApi } from "../../hooks/useApi";
import { Listado } from "./Listado";

const Busqueda = () => {

    // Obtengo el parametro pasado por la direccion del navegador
    const {busqueda} = useParams();

    // Creo la url usando mi helper Global.jsx y añado el endpoint    
    const url = Global.url + "buscar/" + busqueda;    

    // Extraigo datos y cargando y errores posibles desde el custom hook useAjax
    const { datos, cargando, error } = useApi(url, 'GET');

    // Si estubiera cargando devuelvo el mensaje
    if (cargando) {
        return <h3>Cargando artículos...</h3>;
    }

    // Si se hubiera producido un error devuelvo el mensaje
    if (error) return <h3>Error: {error}</h3>;

    // Renderizo lo que busco y el listado con los resultados
    return (                 
        <Listado datos={datos}/>
    );
}
 
export default Busqueda;