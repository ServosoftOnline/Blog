/*
    COMPONENTE QUE RENDERIZA ARTICULOS
        - Obtiene los datos a mostrar por parametros y la funcion fetchData para realizar operaciones en el backend

        - Cada articulo renderizado contiene dos botones:
            - El botón de eliminar que elimina sin preguntar
            - El boton de editar que ejecuta el componente de editar 
*/

import React from 'react';
import { Global } from '../../helpers/Global';
import { Images } from '../../helpers/Images';
import { fechaFormateada, tiempoRelativo } from '../../helpers/Fechas';
import { Link } from 'react-router-dom';


export const Listado = ({datos, fetchData}) => {

    // Funcion para que elimina un articulo
    const eliminar = async (id) => {
        const urlDelete = Global.url + 'articulo/' + id;
        await fetchData(urlDelete, null, 'DELETE');
    
        // Una vez eliminado, recargo los artículos para que se actualice la lista
        await fetchData(Global.url + "listar?orden=desc", null, 'GET');
    };

     // Evita errores cuando datos está vacío o indefinido. Si datos es null o undefined, no intenta acceder a .articulos
    const articulos = datos?.articulos || [];  

    return (
        <>
            {
                articulos.length > 0 ? 
                (
                    articulos.map((articulo) => (

                        <article className="articulo-item" key={articulo._id}>

                            <div className="imagen-articulo">
                                <img src={Images.url + articulo.imagen} alt="Imagen" />
                            </div>

                            <div className="datos">
                                
                                <h3> <Link to={"/articulo/"+articulo._id}>{articulo.titulo}</Link> </h3>   

                                <div className='fechas'>

                                    <p className="fecha">
                                        Creado: {" "} 
                                        {fechaFormateada(articulo.fecha)} 
                                        <span className="relativa"> ( {tiempoRelativo(articulo.fecha)} )</span>
                                    </p>                      

                                    <p className="fecha">
                                        Modificado:  {" "}
                                        {fechaFormateada(articulo.fechaActualizacion)} 
                                        <span className="relativa"> ( {tiempoRelativo(articulo.fechaActualizacion)} )</span>
                                    </p> 

                                </div>                                

                                <p>{articulo.contenido}</p>

                                <div className='botones-articulos'>
                                    <Link to={"/editar/" + articulo._id} className="edit">Editar</Link>                                   
                                    <button className="delete" onClick={() => {eliminar(articulo._id)}}>Borrar</button>
                                </div>
                            
                            </div>

                        </article>
                    ))
                )
                :
                (
                    <article className="articulo-item">
                        <div className="datos">
                            <h3>No existen artículos almacenados</h3>
                        </div>
                    </article>
                )

            }
        
        </>

    )
  
}
