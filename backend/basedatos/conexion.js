// CONEXION A LA BBDD mi_blog
import mongoose from "mongoose";

export const conexion = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/mi_blog");
        console.log("Conectado de forma correcta a la base de datos mi_blog");
    } catch (error) {
        console.log(error);    
        throw new Error("No se ha podido conectar a la base de datos");
    }
};
