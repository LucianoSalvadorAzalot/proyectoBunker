import { Link } from 'react-router-dom'
import './App.css'
import { Button } from 'react-bootstrap'

function App() {
 

  return (
    <>
    <section className='container-fluid'>
        <div >
          <div className='row'>
        
            <div className='col-xl'>
            <Link to="/ventas">F1 Ventas</Link>
            </div>
            <div className='col-xl'>
            <Link to="/creditos">F2 Creditos</Link>
            </div>
            <div className='col-xl'>
            <Link to="/clientes"> Clientes</Link>
            </div>
            <div className='col-xl'>
            <Link to="/productos">F3 Productos </Link>
            </div>
            <div className='col-xl'>
            <Link to="/inventario">F4 Inventario</Link>
            </div>
            <div className='col-xl'>
            <Link to="/compra">Compras</Link>
            </div>
            <div className='col-xl'>
            <Link to="/configuracion">Configuracion</Link>
            </div>
            <div className='col-xl'>
            <Link to="/facturas">Facturas</Link>
            </div>
            <div className='col-xl'>
            <Link to="/corte">Corte</Link>
            </div>
            <div className='col-xl'>
            <Link to="/reportes">Reportes</Link>
            </div>
          </div>
        </div>
    </section>
    </>
  )
}

export default App
