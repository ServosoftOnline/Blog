// COMPONENTE PPAL
import { Footer } from './components/layout/Footer';
import { Rutas } from './routing/Rutas';
import './styles/layout/app.css';

// Componente
const App = () => {  
  return (
    <>
      <div className='layout'>   

        {/* Rutas. Contiene el header, la barra de navegación y el sidebar */}
        <Rutas/>

        {/* Pie de página */}
        <Footer/>

      </div>
    </>
  )
}

export default App
