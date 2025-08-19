/*
    COMPONENTE PARA CREAR UN NUEVO ARTICULO
        - Uso el hook useForm para serializar los datos del formulario
*/

import { useApi } from "../../hooks/useApi";
import { Global } from "../../helpers/Global";

// Componente
const Crear = () => {

    // Uso el hook para preparar la petición POST pero sin ejecutarla todavía
    const { fetchData, datos, cargando, error } = useApi(
        Global.url + 'crear',   
        'POST',                 
        null,                 // Body se pasará manualmente con los datos del nuevo formulario
        false                 // No ejecutar automáticamente
    );
    
    // Funcion que recoge los datos del formulario, los almacena en la bbdd y sube la imagen
    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevoArticulo = {
            titulo: e.target.titulo.value,
            contenido: e.target.contenido.value
        };

        // Paso 1: Crear artículo
        const respuestaCreacion = await fetchData(Global.url + 'crear', nuevoArticulo);

        // Paso 2: Cuando tenga respuesta trato de subir la imagen
        if (respuestaCreacion?.articulo?._id) {          

            // Obtengo información del archivo subido mediante el id del input tipo fichero
            const fileInput = document.querySelector("#file");           

            // Solo si tengo un fileInput subo la imagen
            if (fileInput?.files[0]) {

                // Creo y añado la información al formdata
                const formData = new FormData();
                formData.append('file0', fileInput.files[0]);
                await fetchData(Global.url + 'subir-imagen/' + respuestaCreacion.articulo._id, formData, 'POST');
            }
        }
    };


    // Renderizo
    return (
        <div className="jumbo">

            <h3>Introduzca la nueva receta</h3>
            <form className="formulario" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="titulo">Titulo</label>
                    <input type="text" name="titulo" id="titulo" />
                </div>

                <div className="form-group">
                    <label htmlFor="contenido">Contenido</label>
                    <textarea type="text" name="contenido" id="contenido" />
                </div>

                <div className="form-group">
                    <label htmlFor="file0">Imagen</label>
                    <input type="file" name="file0" id="file" />
                </div>

                <input type="submit" value="Guardar" className="btn btn-success" />

            </form>

            {/* Mensajes de estado */}
            <div className="mensajes-de-estado">
                {cargando && <h3 className="mensaje-cargando">Guardando artículo...</h3>}
                {error && <h3 className="mensaje-error">Datos tratados de almacenar no son válidos: {error}</h3>}
                {datos && <h3 className="mensaje-exito">Artículo creado correctamente</h3>}
            </div>
            
        </div>

    );
}
 
export default Crear;