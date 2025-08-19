import React from 'react';
import { useNavigate } from "react-router-dom";
import Busqueda from '../pages/Busqueda';
import { Global } from '../../helpers/Global';

// Componente
export const Sidebar = () => {

  // Constante para la navegacion
  const navigate = useNavigate();

  // Funcion que recoge la información del formulario del buscador
  const handleSubmit = (e) => {
    e.preventDefault();    
    const query = e.target.find.value;
    navigate(`/buscar/${query}`)
  }

  // Renderizo
  return (
    <aside className="lateral">
      <div className="search">

        <h3 className="title">Buscador</h3>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
            <input type="text" id="search_field" name='find' autoComplete='off'/>
            <input type='submit' id='search' value="Buscar" />            
        </form>

      </div>
    </aside>
  )
}
