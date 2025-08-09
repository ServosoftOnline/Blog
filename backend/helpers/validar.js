// Helper para validar título, contenido e id (opcional)
import mongoose from "mongoose";
import validator from "validator";

const validar = (parametros, id = null) => {
    const idInvalido = id && !mongoose.Types.ObjectId.isValid(id);

    const tituloInvalido = !parametros.titulo ||
        validator.isEmpty(parametros.titulo) ||
        !validator.isLength(parametros.titulo, { min: 5 });

    const contenidoInvalido = !parametros.contenido ||
        validator.isEmpty(parametros.contenido);

    if (idInvalido) return { valido: false, mensaje: "ID no válido" };
    if (tituloInvalido) return { valido: false, mensaje: "Título no válido" };
    if (contenidoInvalido) return { valido: false, mensaje: "Contenido no válido" };

    return { valido: true };
}
 
export default validar;
