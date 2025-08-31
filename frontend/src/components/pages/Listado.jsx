/*
    COMPONENTE QUE RENDERIZA ARTICULOS
        - Obtiene los datos a mostrar por parametros y la funcion fetchData para realizar operaciones en el backend

        - Cada articulo renderizado contiene dos botones:
            - El botón de eliminar que elimina sin preguntar
            - El boton de editar que ejecuta el componente de editar 
*/

import React from 'react';
import { fechaFormateada, tiempoRelativo } from '../../helpers/Fechas';
import { Link } from 'react-router-dom';
import './../../styles/pages/listado.css';

// Componente
export const Listado = ({datos}) => {    

     // Evita errores cuando datos está vacío o indefinido. Si datos es null o undefined, no intenta acceder a .articulos
    const articulos = datos?.articulos || [];     

    return (
        <>
            {
                articulos.length > 0 ? 
                (
                    articulos.map((articulo) => (                        
                        
                        <article className="articulo-item" key={articulo._id}>

                            <h3 className='titulo-item'> <Link to={"/articulo/"+articulo._id}>{articulo.titulo}</Link> </h3>
                            
                            <div className="imagen-articulo">
                                <Link to={"/articulo/"+articulo._id}>
                                    <img src={articulo.imagen} alt="Imagen" />
                                </Link>                                 
                            </div>

                            <div className="datos">
                                
                                <h3 className='titulo'>
                                    <Link to={"/articulo/"+articulo._id}>{articulo.titulo}</Link>
                                </h3>   

                                <div className='fechas'>

                                    <div className='fecha'>
                                        <p>Creada:</p>
                                        <p>{fechaFormateada(articulo.fecha)} - {tiempoRelativo(articulo.fecha)} </p>
                                    </div>

                                    <div className='fecha'>
                                        <p>Modificada:</p>
                                        <p>{fechaFormateada(articulo.fechaActualizacion)} - {tiempoRelativo(articulo.fechaActualizacion)} </p>
                                    </div>
                                    
                                </div>                                

                                <p className='contenido'>{articulo.contenido}</p>

                                <div className='botones-articulos'>
                                    <Link to={"/editar/" + articulo._id} className="edit">Editar</Link>                                   
                                    <Link to={"/eliminar/" + articulo._id} className="delete">Borrar</Link>                                     
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
