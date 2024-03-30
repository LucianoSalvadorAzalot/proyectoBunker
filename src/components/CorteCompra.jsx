import { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import '../index.css';
import App from '../App';


const CorteCompra = ({ filename, sheetname }) => {

    const [compraVer, setCompraVer] = useState([])
const [buscar, setBuscar] = useState("");
  const [resultado, setResultado] = useState([]);

  
  const buscador = (e) => {
    const textoBuscado = e.target.value.toLowerCase();
    setBuscar(textoBuscado);
    let resultadoFiltrado = [];
  
    if (!textoBuscado) {
      resultadoFiltrado = [...resultado];
    } else {
      resultadoFiltrado = resultado.filter((dato) => {
        const fechaRegistroStr = new Date(dato.fecha_registro).toLocaleString().toLowerCase();
        const nombreUsuarioStr = dato.usuarios.nombre_usuario.toLowerCase();
        return fechaRegistroStr.includes(textoBuscado) || nombreUsuarioStr.includes(textoBuscado);
      });
    }
    setResultado(resultadoFiltrado);
};


    const id_sucursal = localStorage.getItem('sucursalId');
    useEffect(() => {
        axios.get(`http://localhost:3001/compra/sucursal/${id_sucursal}`)
          .then((response) => {
            setCompraVer(response.data);
          })
          .catch((error) => {
            console.log('Error al obtener los productos:', error);
          });
      }, []);
    

      const exportToExcel2 = () => {
        const ws = XLSX.utils.json_to_sheet(compraVer);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheetname);
        XLSX.writeFile(wb, `${filename}.xlsx`);
      };
  return (
    <>
    <App/>
    <br />
       <h2>REPORTE DE LAS COMPRAS </h2>
      <h4>Ventas completas junto a sus detalles de venta</h4>
      <br /><br />
      <div className="container-fluid">
        <input value={buscar} onChange={buscador} type="text" placeholder='Busca una compra...' className='form-control' />
      </div>
      <div className='container-fluid'>
        <table className='table mt-5 shadow-lg'>
          <thead>
            <tr className='table-success'>
              <th>Id Compra</th>
              <th>Descripcion de la venta</th>
              <th>Total de la compra</th>
              <th>Nombre Producto</th>
              <th>Fecha Registro</th>
            </tr>
          </thead>
          <tbody>
            {compraVer.map((val) => (
              <tr key={val.Id_compra}>
                <td>{val.Id_compra}</td>
                <td>{val.descripcion_compra}</td>
                <td>${val.total_compra}</td>
                <td>
                    {val.productos && Array.isArray(val.productos) && val.productos.map((producto) => (
                      <li key={producto.Id_producto}> {producto.nombre_producto}</li>
                      
                    ))}
                </td>
                <td>{new Date(val.fecha_registro).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={exportToExcel2}>Exportar a Excel</button>


    </>
  )
}

export default CorteCompra
