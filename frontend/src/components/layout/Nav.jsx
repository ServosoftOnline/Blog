import React from 'react';
import {NavLink} from 'react-router-dom';

// Componente
export const Nav = () => {
  return (
    <nav className="nav">
        <ul>
            <li><NavLink to="/inicio">Inicio</NavLink></li>
            <li><NavLink to="/articulos">Recetas</NavLink></li>  
            <li><NavLink to="/crear-articulo">Crear receta</NavLink></li>
            <li><NavLink to="/contacto">Contacto</NavLink></li>  
        </ul>
    </nav>
  )
}
