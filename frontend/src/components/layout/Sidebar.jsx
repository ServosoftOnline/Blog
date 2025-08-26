import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './../../styles/layout/sidebar.css';

// Componente
export const Sidebar = () => {
  
    // Estado para guardar el valor del input y la cte para navegar
    const [busqueda, setBusqueda] = useState('');
    const navigate = useNavigate();

    // Función que maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Redirige a la página de resultados de la búsqueda
        navigate(`/buscar/${busqueda}`);
        
        // Limpia el input después de enviar el formulario
        setBusqueda('');
    };

    // Función para manejar el cambio en el input
    const handleChange = (e) => {
        setBusqueda(e.target.value);
    };

    return (
        <aside className="lateral">
            <div className="search">

                <h3 className="title">Buscador</h3>

                {/* Formulario */}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="search_field"
                        name='find'
                        autoComplete='off'                
                        value={busqueda}                        
                        onChange={handleChange}
                    />
                    <input type='submit' id='search' value="Buscar" />
                </form>

            </div>
        </aside>
    );
};