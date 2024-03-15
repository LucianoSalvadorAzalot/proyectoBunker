
import App from '../App'
import { Link } from 'react-router-dom'

export default function Productos() {
  return (
    <>
      <App/>
      <h1>Productos</h1>
      <section className='container-fluid'>
        <div >
          <div className='row'>
        
            <div className='col-xl'>
            <Link to="/nuevoProducto">Nuevo</Link>
            </div>
            <div className='col-xl'>
            <Link to="/editarProducto">Modificar</Link>
            </div>
            <div className='col-xl'>
            <Link to="/eliminarProducto">Eliminar</Link>
            </div>
            <div className='col-xl'>
            <Link to="/departamentos">Departamentos</Link>
            </div>
            <div className='col-xl'>
            <Link to="/ventasPeriodo">Ventas por periodo</Link>
            </div>
            <div className='col-xl'>
            <Link to="/">Importar</Link>
            </div>
            <div className='col-xl'>
            <Link to="/catalogo">Catalogo</Link>
            </div>
          </div>

        </div>
    </section>
    </>
  )
}
