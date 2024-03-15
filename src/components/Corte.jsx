import  { useEffect, useState } from 'react'
import App from '../App'
import axios from 'axios';




export const Corte = () => {
  const [buscar, setBuscar] = useState("");
  const[ver,setVer] = useState([]);

  const buscador = (e)=>{
    setBuscar(e.target.value)
  }
  
  let resultado = []
   if(!buscar)
   {
     resultado = ver
  }else{  
     resultado = ver.filter((dato) =>
     dato.nombre_cliente.toLowerCase().includes(buscar.toLocaleLowerCase())) 
}



 const verVentaCompleta = () => {
  axios.get("http://localhost:3001/venta/verVentaCompleta").then((response)=>{
    setVer(response.data)
  })
 }

 useEffect(()=>{
  verVentaCompleta()
 },[])

  return (
    <>
      <App/>
      <br />
      <h2>REPORTE DFE LAS VENTAS</h2>
      <h4>
        Ventas completas junto a sus detalles de venta
      </h4>
      <br /><br />
    <div className="container-fluid">
          <input value={buscar} onChange={buscador} type="text" placeholder='Busca una venta...' className='form-control'/>
    </div>
        <table className='table table-striped table-hover mt-5 shadow-lg'>
           <thead>
             <tr className='table-success'>
                  <th>Id detalleVenta</th>
                  <th>Descripcion del detalle</th>              
                  <th>Id venta</th>
                  <th>Descripcion de la venta</th>
                  <th>Total de la venta</th>
                  <th>Id producto</th>
                  <th>Nombre Producto</th>
                  <th>Descripcion Producto</th>
                  <th>Precio Producto</th>
                  <th>Nombre Cliente</th>
                  <th>Domicilio Cliente</th>
                  <th>Tipo metodo pago</th>
                  
              </tr>
              </thead>
                <tbody>
                    {
                        resultado.map((val) => (
                            <tr key={val.venta}>
                                <td>{val.Id_detalleVenta}</td>
                                <td>{val.descripcion_detalleVenta}</td>                       
                                <td>{val.Id_venta}</td>
                                <td>{val.descripcion_venta}</td>
                                <td>${val.precioTotal_venta}</td>
                                <td>{val.Id_producto}</td>
                                <td>{val.nombre_producto}</td>
                                <td>{val.descripcion_producto}</td>
                                <td>{val.precio_producto}</td>
                                <td>{val.nombre_cliente}</td>
                                <td>{val.domicilio_cliente}</td>
                                <td>{val.tipo_metodoPago}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table> 
     
   


    </>
  )
}

export default Corte