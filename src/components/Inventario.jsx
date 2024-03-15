import React from 'react'
import App from '../App'
import { Link } from 'react-router-dom'

export default function Inventario() {
  return (
    <>
      <App/>
      <br /><br />
      <h2>INVENTARIO</h2>
      <section className='container-fluid'>
        <div >
          <div className='row'>
            <div className='col-xl'>
            <Link to="/agregarInventario">Agregar</Link>
            </div>
            <div className='col-xl'>
            <Link to="/ajustesInventario">Ajustes</Link>
            </div>
            <div className='col-xl'>
            <Link to="/bajoInventario">Productos bajos en Inventario</Link>
            </div>
            <div className='col-xl'>
            <Link to="/reportesInventario">Reportes de Inventario</Link>
            </div>
            <div className='col-xl'>
            <Link to="/reportMovimientos">Reporte de Movimientos</Link>
            </div>
          </div>
        </div>
    </section>
    <br /> <br />
    
    </>
  )
}
