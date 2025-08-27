// COMPONENTE PPAL
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Rutas } from './routing/Rutas';
import './styles/layout/app.css';



// Componente
const App = () => {  
  return (
    <>
      <div className='layout'>   

        {/* Cabecera */}
        <Header/>

        {/* Rutas. Contiene la barra de navegación y el sidebar */}
        <Rutas/>

        {/* Pie de página */}
        <Footer/>

      </div>
    </>
  )
}

export default App
