import { Link } from 'react-router-dom'
import './App.css'



function App(  ) {
 

  const rolUsuario = localStorage.getItem("rolUsuario")





  return (
    <>
    <section className='container-fluid'>
        <div >
          <div className='row'>
        
         
            <div className='col-xl'>
            <Link to="/ventas"> Ventas</Link>
            </div>    
            <div className='col-xl'>
            <Link to="/clientes">Clientes</Link>
            </div>
            <div className='col-xl'>
            <Link to="/productos">Productos </Link>
            </div>
            <div className='col-xl'>
            <Link to="/compra">Compras</Link>
            </div>
            
            {rolUsuario === 'admin' && (
            <div className='col-xl'>
            <Link to="/usuarios">Usuarios</Link>
            </div>
            )}

            {rolUsuario === 'admin' && (
            <div className='col-xl'>
            <Link to="/configuracion">Proveedores</Link>
            </div>
            )}
            {rolUsuario === 'admin' && (
             <div className='col-xl'>
                <Link to="/metodoPago">Metodo de Pago</Link>
              </div>
            )}
            {rolUsuario === 'admin' && (
              <div className='col-xl'>
              <Link to="/corteV">Corte Venta</Link>
              </div>
             )}

            {rolUsuario === 'admin' && (
              <div className='col-xl'>
              <Link to="/corteC">Corte Compra</Link>
              </div>
            )}

            {rolUsuario === 'admin' && (
                <div className='col-xl'>
                <Link to="/reportes">Reportes</Link>
                </div>
            )}

              <div className='col-xl'>
                <Link to="/" className="btn btn-danger">🕺 Salir</Link>
              </div>

           
          </div>
        </div>
        <hr />
    </section>

    </>
  )
}

export default App
