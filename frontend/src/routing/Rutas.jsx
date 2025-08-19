// RUTAS DEL FRONT

import React from 'react'
import { Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import { Nav } from './../components/layout/Nav';

// Componentes de las rutas
import Inicio from "./../components/pages/Inicio";
import Articulos from './../components/pages/Articulos';
import Articulo from './../components/pages/Articulo';
import Crear from './../components/pages/Crear';
import Contacto from '../components/pages/Contacto';
import Busqueda from '../components/pages/Busqueda';
import Editar from '../components/pages/Editar';
import { Sidebar } from '../components/layout/Sidebar';

export const Rutas = () => {
  return (
    <BrowserRouter>

        {/* Barra de navegación */}        
        <Nav/>

        {/* Sidebar */}
        <Sidebar/>

        {/* Contenido central y rutas */}
        <section id='content' className="content">
            <Routes>
                <Route path="/"                 element={<Inicio />}/>
                <Route path="/inicio"           element={<Inicio />}/>
                <Route path="/articulos"        element={<Articulos />}/>
                <Route path='/crear-articulo'   element={<Crear />} />
                <Route path='/contacto'         element={<Contacto />} />
                <Route path='/buscar/:busqueda' element={<Busqueda />} />
                <Route path='/articulo/:id'     element={<Articulo />} />
                <Route path='/editar/:id'     element={<Editar />} />

                {/* Ruta 404 */}
                <Route path='*' element={
                  <div className='jumbo'>
                    <h2>Error 404. Página no encontrada</h2>
                  </div>
                } />

            </Routes>

        </section>

    </BrowserRouter>
    
  )
}
