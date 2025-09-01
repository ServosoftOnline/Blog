import {Link} from 'react-router-dom';
import './../../styles/pages/inicio.css';
import anchoDePantalla from './../../helpers/anchoDePantalla';

// Componente
const Inicio = () => {

    const {anchoActual} = anchoDePantalla();   

    return (
        <div>

            <h3>{anchoActual}</h3>
            <div className='Bienvenida'>

                <div className='logo-en-construccion'>
                    <i className="fa-solid fa-cogs"></i>                
                </div>  

                <div>
                    <h2>Bienvenido al blog culinario <span className="texto-coloreado">en construcción</span> </h2>
                    <p>Desarrollado con el Stack MERN (MongoDb, Express, React y Nodejs)</p>
                </div>
                
            </div>
            

            {/* Botones */}
            <div className='botones-articulos'>
                <Link to='/articulos'       className='edit'>Ir a recetas</Link>
                <Link to='/borrar-todos'    className='delete'>Reiniciar base de datos</Link>
            </div>

        </div>
    );
}
 
export default Inicio;