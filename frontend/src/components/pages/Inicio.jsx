import {Link} from 'react-router-dom';

// Componente
const Inicio = () => {
    return (
        <div>
            <div className='Bienvenida'>
                <h2>Bienvenido al blog culinario</h2>
                <p>Blog desarrollado con el Stack MERN (MongoDb, Express, React y Nodejs)</p>
            </div>
            

            {/* Botones */}
            <div className='botones-articulos'>
                <Link to='/articulos'       className='edit'>Ir a recetas</Link>
                <Link to='/borrar-todos'    className='delete'>Ir a Iniciar la base de datos</Link>
            </div>

        </div>
    );
}
 
export default Inicio;