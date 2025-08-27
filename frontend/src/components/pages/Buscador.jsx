import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './../../styles/pages/buscador.css'; // Importa los nuevos estilos para el buscador

// Componente del buscador minimalista
export const Buscador = () => {
  
    // Estado para guardar el valor del input y la cte para navegar
    const [busqueda, setBusqueda] = useState('');
    const navigate = useNavigate();

    // Función que maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/buscar/${busqueda}`);
        setBusqueda('');
    };

    // Función para manejar el cambio en el input
    const handleChange = (e) => {
        setBusqueda(e.target.value);
    };

    return (
        <div className="search-nav-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="search_field_nav"
                    name='find'
                    autoComplete='off'                
                    value={busqueda}                        
                    onChange={handleChange}
                    placeholder="Buscar..."
                />
                <button type='submit' id='search-submit-btn'>
                    {/* Icono SVG de una lupa */}
                    <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                </button>
            </form>
        </div>
    );
};
