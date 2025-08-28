import React from 'react';
import { NavLink } from 'react-router-dom';
import './../../styles/layout/nav.css';
import { Buscador } from '../pages/Buscador';

export const Nav = () => {

    // Renderizo
    return (
        <nav className="nav">
            <ul className='nav-menu'>
                <li><NavLink to="/inicio">Inicio</NavLink></li>
                <li><NavLink to="/articulos">Recetas</NavLink></li>  
                <li><NavLink to="/crear-articulo">Crear receta</NavLink></li>
                <li><NavLink to="/contacto">Contacto</NavLink></li>
                <Buscador/>            
            </ul>
        </nav>
    );
};