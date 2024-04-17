import { useEffect, useState } from 'react';
import axios from 'axios';
import App from '../App';
import * as XLSX from 'xlsx';
import '../index.css';

export const Corte = ({ filename, sheetname }) => {
  
  const [buscar, setBuscar] = useState("");
  const [resultado, setResultado] = useState([]);
  const [sumaTotal, setSumaTotal] = useState(0);
  const [usuarios, setUsuarios] = useState([])




  const buscador = (e) => {
    const textoBuscado = e.target.value.toLowerCase();
    setBuscar(textoBuscado);
    let resultadoFiltrado = [];
    let total = 0;
  
    if (!textoBuscado) {
      resultadoFiltrado = [...resultado];
    } else {
      resultadoFiltrado = resultado.filter((dato) => {
        const fechaRegistroStr = new Date(dato.fecha_registro).toLocaleString().toLowerCase();
        const nombreUsuarioStr = dato.usuarios.nombre_usuario.toLocaleString().toLowerCase();
        return fechaRegistroStr.includes(textoBuscado) || nombreUsuarioStr.includes(textoBuscado);
      });
    }
  
    total = resultadoFiltrado.reduce((acumulador, valorActual) => acumulador + parseFloat(valorActual.precioTotal_venta), 0);
    setSumaTotal(total);

    setResultado(resultadoFiltrado);
  };

 

  const verUsuarios = () =>{
  
    axios.get(`http://localhost:3001/usuarios/sucursal/${id_sucursal}`)
    .then((response) => {
      setUsuarios(response.data);
    })
   .catch((error) => {
      console.log('Error al obtener los usuarios:', error);
    });
  
  
  }





  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(resultado);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetname);
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };
  
  const id_sucursal = localStorage.getItem('sucursalId');

  useEffect(() => {
    axios.get(`http://localhost:3001/venta/sucursal/${id_sucursal}`)
      .then((response) => {
        console.log(response.data)
        setResultado(response.data);       
      })
      .catch((error) => {
        console.log('Error al obtener los datos:', error);
      });
  }, [id_sucursal]); 

useEffect(()=>{
  verUsuarios()
},[])

  return (
    <>
      <App />
      <br />
      <h2>REPORTE DE LAS VENTAS</h2>
      <h4>Ventas completas junto a sus detalles de venta</h4>
      <br /><br />
      <div className="container-fluid">
        <input value={buscar} onChange={buscador} type="text" placeholder='Busca una venta...' className='form-control' />
        <div><h4>Suma total de ventas: ${sumaTotal}</h4></div>
      </div>
      <div className='container-fluid'>
      <table className='table mt-5 shadow-lg'>
  <thead>
    <tr className='table-success'>
      <th>Id venta</th>
      <th>Descripcion de la venta</th>
      <th>Total de la venta</th>
      <th>Productos de la venta</th>
      <th>Cantidad vendida</th>
      <th>Precio producto</th>
      <th>Fecha Registro</th>
      <th>Empleado que realizó la venta</th>

    </tr>
  </thead>
  <tbody>
    {resultado.map((val) => (
      <tr key={val.Id_venta}>
        <td>{val.Id_venta}</td>
        <td>{val.descripcion_venta}</td>
        <td>${val.precioTotal_venta}</td>
        <td>
          {val.productos && Array.isArray(val.productos) && val.productos.map((producto) => (
            <li key={producto.Id_producto}>{producto.nombre_producto}</li>
          ))}
        </td>
        <td>
          {val.productos.map((producto) => (
            <li key={producto.Id_producto}>Cantidad: {parseInt(producto.cantidadVendida)}</li>
          ))}
        </td>        
        <td>
          {val.productos.map((producto) => (
            <li key={producto.Id_producto}>Precio del producto: {producto.precioVenta}</li>
          ))}
        </td>        
        <td>{new Date(val.fecha_registro).toLocaleString()}</td>
        <td>{val.usuarios.nombre_usuario}</td>
       
      </tr>
    ))}
  </tbody>
</table>

      </div>
      <button onClick={exportToExcel}>Exportar a Excel</button><br /><br /><br />
    </>
  );
};

export default Corte;
