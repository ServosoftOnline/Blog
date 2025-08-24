// OBJETO CON LA CONFIGURACIÓN DEL PROYECTO

// La URL de la API se toma de la variable de entorno de Vite
const url_base = import.meta.env.VITE_API_URL;

export const Images = {
    // La URL de las imágenes se construye a partir de la URL de la API
    url: `${url_base}/imagenes/`  
}


