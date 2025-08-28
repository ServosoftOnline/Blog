// RUTAS DEL FRONT

import React from 'react'
import { Routes, Route, BrowserRouter} from "react-router-dom";
import { Nav } from './../components/layout/Nav';

// Estilos
import './../styles/layout/rutas.css';

// Componentes de las rutas
import Inicio from "./../components/pages/Inicio";
import Articulos from './../components/pages/Articulos';
import Articulo from './../components/pages/Articulo';
import Crear from './../components/pages/Crear';
import Contacto from '../components/pages/Contacto';
import Busqueda from '../components/pages/Busqueda';
import Editar from '../components/pages/Editar';
import Eliminar from '../components/pages/Eliminar';
import Iniciar from '../components/pages/Iniciar';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';

export const Rutas = () => {
  return (
    <BrowserRouter>

      {/* Cabecera. El menú de hamburguesa se mostrará en entorno mobil */}
      <Header/>
        
      {/* Barra de navegación. El buscador se encuentra en el interior se mostrará en entorno de escritorio */}        
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
          <Route path='/editar/:id'       element={<Editar />} />
          <Route path='/eliminar/:id'     element={<Eliminar />} />
          <Route path='/borrar-todos/'    element={<Iniciar />} />

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
