/* 
    MODELO PARA INTERACTUAR CON LA COLECCION ARTICULOS:

        - Segun la convención la primera letra del archivo es mayúscula

        - Esquema de los artículos.
        
            - Que datos podrá tener la coleccions articulos.
            - Los tipos existentes vienen en esta web: https://mongoosejs.com/docs/schematypes.html
            - required indica si es obligatorio y default sería su valor por defecto si no añadimos ningún valor

        - Cuando exporto el modelo debo añadir tres parámetros:

            - Nombre del modelo, que coincide con el nombre del archivo
            - Nombre del esquema

            - Nombre de la colección (Opcional)
                - Si no la indico la colección que pasaría sería:
                - El nombre del modelo cambiando la primera letra mayúscula por minúsucula y añade "s"

*/

import { Schema, model } from "mongoose";

// Esquema
const ArticuloSchema = Schema({

    titulo: {
        type: String,
        required: true
    },

    contenido: {
        type: String,
        required: true
    },
    
    fecha: {
        type: Date,
        default: Date.now
    },

    imagen: {
        type: String,
        default: "default.png"
    }

});

// Exporto el modelo
export default model("Articulo", ArticuloSchema, "articulos");