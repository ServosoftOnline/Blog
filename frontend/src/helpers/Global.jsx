// OBJETO CON LA CONFIGURACIÓN DEL PROYECTO

const url_base = import.meta.env.VITE_API_URL;

// La URL de la API se toma de la variable de entorno
export const Global = {    
    url: `${url_base}/api/`
}