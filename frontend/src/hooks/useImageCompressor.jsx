/*
    CUSTOM HOOK PARA COMPRIMIR IMAGENES. 
        - Propuesto enteramente por gemini
        - Cambia las fotografias subidas y las pasa a jpg.
        - Ej: Puedo subir imagenes png que las transforma a jpg ahorrando así espacio
*/

import { useState } from 'react';

// Hook
export const useImageCompressor = () => {

    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const comprimirImagen = (file) => {
        return new Promise((resolve, reject) => {
            if (!file) {
                resolve(null); // Resuelve con null si no hay archivo
                return;
            }

            setCargando(true);
            setError(null);

            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const elem = document.createElement('canvas');
                    const MAX_WIDTH = 1200; // Puedes ajustar este valor
                    const scaleFactor = img.width > MAX_WIDTH ? MAX_WIDTH / img.width : 1;
                    elem.width = img.width * scaleFactor;
                    elem.height = img.height * scaleFactor;
                    
                    const ctx = elem.getContext('2d');
                    ctx.drawImage(img, 0, 0, elem.width, elem.height);
                    
                    ctx.canvas.toBlob((blob) => {
                        const compressedFile = new File([blob], file.name, {
                            type: 'image/jpeg',
                            lastModified: Date.now(),
                        });
                        setCargando(false);
                        resolve(compressedFile);
                    }, 'image/jpeg', 0.8); // 0.8 es la calidad de compresión (0.0 a 1.0)
                };
            };
            reader.onerror = (error) => {
                setCargando(false);
                setError("Error al procesar la imagen.");
                reject(error);
            };
        });
    };

    return { comprimirImagen, cargando, error };
};
