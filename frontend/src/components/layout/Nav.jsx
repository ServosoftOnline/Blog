import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './../../styles/layout/nav.css';
import { Buscador } from '../pages/Buscador';


export const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="nav">

            <button className="nav-toggle" onClick={handleToggleMenu} aria-label="Abrir menú de navegación">
                ☰
            </button>

            {/* AQUÍ ESTÁ EL CAMBIO: añadimos la clase 'nav-menu' */}
            <ul className={`nav-menu ${isMenuOpen ? 'show' : ''}`}>
                <li><NavLink to="/inicio" onClick={handleCloseMenu}>Inicio</NavLink></li>
                <li><NavLink to="/articulos" onClick={handleCloseMenu}>Recetas</NavLink></li>  
                <li><NavLink to="/crear-articulo" onClick={handleCloseMenu}>Crear receta</NavLink></li>
                <li><NavLink to="/contacto" onClick={handleCloseMenu}>Contacto</NavLink></li>  
                <Buscador/>
            </ul>
            
        </nav>
    );
};