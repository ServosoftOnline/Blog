import {Link} from 'react-router-dom';

// Componente
const Inicio = () => {
    return (
        <div className="jumbo">
            <h2>Bienvenido al blog con React</h2>
            <p>Blog desarrollado con el Stack MERN (MongoDb, Express, React y Nodejs)</p>
            <Link to='/articulos' className='button'>Ir a recetas</Link>
        </div>
    );
}
 
export default Inicio;