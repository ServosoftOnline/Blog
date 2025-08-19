/*
    CUSTOM HOOK QUE PERMITE PODER HACER PETICIONES AL SERVIDOR CON CUALQUIER METODO HTTP

        - Funciona con cualquier método HTTP.
            - Genera un body personalizado cuando el método no sea GET
            - Permite body en POST/PUT.

        - Puedes elegir si la petición se hace automáticamente (autoFetch = true) o manualmente (false).
            - true  → útil para GET automáticos (listar, buscar, mostrar detalle, etc.).
            - false → útil para peticiones que dependen de una acción del usuario (crear, actualizar, borrar). 

        - Siempre devuelve { datos, cargando, error }.
        - Permite usar parámetros dinámicos en la URL.
        - No rompe aunque la API esté caída.

        - Usos de useCallback y useEffect
            - useCallback sirve para memorizar una función y que no se vuelva a crear en cada render.
                - Devuelve la misma referencia de función mientras las dependencias no cambien.

            - El useEffect tiene dependencia de fetchData

        - Ejemplos de uso con tus rutas:

            - Para listar todos los articulos ver el componente Articulos.jsx
            - Para listar con ordenes y límites de articulos mostrados
                - const { datos } = useApi(Global.url + 'listar?orden=asc&limite=3'); 

            - Para obtener un articulo con un id determinado
                - const { datos } = useApi(Global.url + 'articulo/123456789'); 

            - Para crear un nuevo articulo en la bbdd:
                -   const { fetchData, datos } = useApi(Global.url + 'crear', 'POST', { 
                        titulo: "Nuevo artículo", 
                        contenido: "Texto del artículo" 
                    }, false);

                    // Llamada manual
                    const crearArticulo = () => {
                        fetchData();
                    };

            - Para modificar un articulo pasandole el id:
                -   const { fetchData } = useApi(Global.url + 'articulo/12345', 'PUT', { 
                        titulo: "Título actualizado" 
                    }, false);

                    const actualizar = () => {
                        fetchData();
                    };

            - Para eliminar un articulo pasandole el id:
                -   const { fetchData } = useApi(Global.url + 'articulo/12345', 'DELETE', null, false);
                    const borrarArticulo = () => {
                        fetchData();
                    };
            
*/

// useApi.jsx
import { useState, useEffect, useCallback } from 'react';

export const useApi = (url, metodo = 'GET', body = null, autoFetch = true) => {
    const [estado, setEstado] = useState({
        datos: null,
        cargando: false,
        error: null
    });

    const fetchData = useCallback(async (customUrl = url, customBody = body, customMethod = metodo) => {
        setEstado({ datos: null, cargando: true, error: null });

        try {
            const opciones = { method: customMethod };

            // Si el body es FormData, no ponemos Content-Type
            if (customBody instanceof FormData) {
                opciones.body = customBody;
            } 
            // Si es un objeto normal y no es GET, enviamos JSON
            else if (customBody && customMethod !== 'GET') {
                opciones.headers = { 'Content-Type': 'application/json' };
                opciones.body = JSON.stringify(customBody);
            }

            const respuesta = await fetch(customUrl, opciones);

            if (!respuesta.ok) {
                throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
            }

            const data = await respuesta.json();
            setEstado({ datos: data, cargando: false, error: null });
            return data;

        } catch (err) {
            setEstado({ datos: null, cargando: false, error: err.message });
            console.error("Error en la petición:", err);
        }
    }, [url, metodo, body]);

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, [fetchData, autoFetch]);

    return {
        datos: estado.datos,
        cargando: estado.cargando,
        error: estado.error,
        fetchData
    };
};
