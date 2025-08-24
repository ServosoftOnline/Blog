// CONEXION A LA BBDD Block_culinario en mongoDB ATLAS
import mongoose from "mongoose";

// Accede a la variable de entorno MONGODB_URI
const MONGODB_URI = process.env.MONGO_URI;

export const conexion = async () => {
    try {
        // Usa la variable de entorno para la conexión
        await mongoose.connect(MONGODB_URI);
        
        console.log("Conectado de forma correcta a la base de datos Blog_culinario en mongoDB-Atlas");

    } catch (error) {
        console.log(error);    
        throw new Error("No se ha podido conectar a la base de datos Blog_culinario en mongoDB-Atlas");
    }
};
