import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './../../styles/layout/header.css';

export const Header = () => {

  // Estados y funciones para abrir y cerrar la hamburguesa
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
      setIsMenuOpen(false);
    };

  // Renderizo
  return (
    <header className="header">
      <div className='titulo-container'>
        <div>🍴</div>        
        <h1>Blog culinario</h1>
      </div>
      
      <button className="nav-toggle" onClick={handleToggleMenu} aria-label="Abrir menú de navegación">
          ☰
      </button>

      <ul className={`menu-hamburguesa ${isMenuOpen ? 'show' : ''}`}>
        <button className='cerrar-menu' onClick={handleCloseMenu} aria-label="Cerrar menú de navegación">X</button>
        <li><NavLink to="/inicio" onClick={handleCloseMenu}>Inicio</NavLink></li>
        <li><NavLink to="/articulos" onClick={handleCloseMenu}>Recetas</NavLink></li>  
        <li><NavLink to="/crear-articulo" onClick={handleCloseMenu}>Crear receta</NavLink></li>
        <li><NavLink to="/contacto" onClick={handleCloseMenu}>Contacto</NavLink></li>          
      </ul>

    </header>
  )
}
