/*
    COMPONENTE PARA INICIALIZAR LA BBDD

        - Eliminara todos los articulos y creará unos por defecto
        - Cuando finalize el blog y pueda añadir jwt este componente ya no lo usaré
*/

import { useApi } from "../../hooks/useApi";
import { Global } from "../../helpers/Global";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Componente
const Iniciar = () => {   

    const navigate = useNavigate();

    // Petición DELETE para eliminar los documentos de la colección para ejecutarla mas tarde. (autoFetch = false)
    const { fetchData: eliminarColeccion} = useApi(
        `${Global.url}borrar-todos`,
        "DELETE",
        null,
        false
    );
    
    // Petición POST para crear la nueva colección para ejecutarla más tarde. (autoFetch = false)
    const { fetchData: crearColeccion, datos, cargando, error } = useApi(
        Global.url + 'crear',   
        'POST',                 
        null,                 // Body se pasará manualmente con el objeto de la nueva coleccion
        false
    );
    
    // Funcion que recoge los datos del formulario, los almacena en la bbdd y sube la imagen
    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevosArticulos = [
            {
                titulo: "Paella Valenciana",
                contenido:
                "Receta tradicional de la Comunidad Valenciana. Se elabora con arroz de grano corto, pollo, conejo, judía verde plana, garrofó y sofrito de tomate, todo cocinado en caldo con aceite de oliva y azafrán. La paella se cocina a fuego medio en una paellera ancha y poco profunda hasta que el arroz queda en su punto, con una capa uniforme y ligeramente tostada en el fondo (socarrat). Ideal para compartir en familia o con amigos los domingos.",
                imagen: "https://res.cloudinary.com/dsreafpsw/image/upload/v1756061570/blog_culinario_iniciales/mlhotuhtc5iq9bxd34th.jpg",
                public_id_imagen: "blog_culinario_iniciales/mlhotuhtc5iq9bxd34th"
            },
            {
                titulo: "Tarta de Queso al Horno",
                contenido:
                "Un postre clásico y cremoso. Se prepara con queso crema, huevos, azúcar y nata, vertidos sobre una base de galleta triturada con mantequilla. La mezcla se hornea lentamente hasta que cuaje y adquiera un ligero dorado en la superficie. Al enfriar, se consigue una textura suave y delicada, perfecta para acompañar con mermelada de frutos rojos o caramelo.",
                imagen: "https://res.cloudinary.com/dsreafpsw/image/upload/v1756061802/blog_culinario_iniciales/jg0q9pdvugdhzaur4eqk.jpg",
                public_id_imagen: "blog_culinario_iniciales/jg0q9pdvugdhzaur4eqk"
            },
            {
                titulo: "Gazpacho Andaluz",
                contenido:
                "Sopa fría típica del sur de España. Se elabora triturando tomates maduros, pepino, pimiento verde, ajo, pan duro, vinagre de vino y aceite de oliva virgen extra hasta obtener una crema fina y ligera. Se sirve bien frío y puede acompañarse con picatostes, huevo duro picado o trocitos de verduras frescas. Es refrescante, hidratante y muy nutritivo, perfecto para los días de verano.",
                imagen: "https://res.cloudinary.com/dsreafpsw/image/upload/v1756061881/blog_culinario_iniciales/i28urwea0u6emirabjbw.jpg",
                public_id_imagen: "blog_culinario_iniciales/i28urwea0u6emirabjbw"
            },
            {
                titulo: "Tacos de Pollo",
                contenido:
                "Tortillas de maíz rellenas con pollo marinado en especias mexicanas como comino, pimentón, ajo en polvo y chile. El pollo se cocina a la plancha o sartén y se desmenuza antes de rellenar los tacos. Se acompañan con cebolla, cilantro fresco, salsa picante y guacamole casero. Una comida versátil que puede servirse con diferentes guarniciones como arroz, frijoles o ensaladas.",
                imagen: "https://res.cloudinary.com/dsreafpsw/image/upload/v1756062130/blog_culinario_iniciales/kiudjckowua2zn7udb8s.jpg",
                public_id_imagen: "blog_culinario_iniciales/kiudjckowua2zn7udb8s"
            },
            {
                titulo: "Ensalada Mediterránea",
                contenido:
                "Plato ligero y lleno de sabor. Lleva tomate maduro, pepino fresco, aceitunas negras, cebolla roja y queso feta en dados. Se aliña con aceite de oliva virgen extra, orégano seco, un toque de limón y sal marina. Se puede complementar con hojas de lechuga o rúcula y acompañar con pan crujiente. Una ensalada perfecta para días calurosos, rica en nutrientes y muy saludable.",
                imagen: "https://res.cloudinary.com/dsreafpsw/image/upload/v1756062188/blog_culinario_iniciales/ifakgcgexzb6t3vtd29w.jpg",
                public_id_imagen: "blog_culinario_iniciales/ifakgcgexzb6t3vtd29w"
            }
        ];

        // Paso 1: Eliminar los documentos existentes        
        // await eliminarColeccion(`${Global.url}borrar-todos`, null, "DELETE");        
        await eliminarColeccion(`${Global.url}borrar-todos-cloudinary`, null, "DELETE");  

        // Paso 2: Insertar cada receta por separado
        for (let articulo of nuevosArticulos) {
            await crearColeccion(Global.url + 'crear', articulo, 'POST');
        }        
    };

    // Cuando se hallan devuelto los datos indicando que acabó el proceso correctamente. Espera 3 segundos y redirige a articulos
    useEffect(() => {
        if (datos) {
            const timer = setTimeout(() => {
                navigate("/articulos");
            }, 3000); 

            return () => clearTimeout(timer); // limpieza si se desmonta antes
        }
    }, [datos, navigate]);


    // Renderizo
    return (
        <div className="jumbo">            

            <h3>Proceso irreversible: Se borrarán todas las recetas y se restaurarán unas nuevas a modo de ejemplo </h3>

            <form onSubmit={handleSubmit}>  

                {/* Botones */}
                <div className="botones-articulos">
                    <input type="submit" value="Haga click aquí para proceder" className="delete" /> 
                    <Link to="/inicio">
                        <button className="back">Volver</button>
                    </Link>                    
                </div>

            </form>

            {/* Mensajes de estado */}
            <div className="mensajes-de-estado">
                {cargando && <h3 className="mensaje-cargando">Creando la nueva colección...</h3>}
                {error && <h3 className="mensaje-error">Error al crear la nueva colección. {error}</h3>}
                {datos && <h3 className="mensaje-exito">Colección restaurada correctamente</h3>}
            </div>
            
        </div>

    );
}
 
export default Iniciar;