import { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import '../index.css';
import App from '../App';
import { Button, Table } from 'react-bootstrap';
import {
  MDBInputGroup,
} from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';


const CorteCompra = ({ filename, sheetname }) => {

  const [compraVer, setCompraVer] = useState([])
  const [buscar, setBuscar] = useState("");
  const [resultado, setResultado] = useState([]);
  const [verProvedores, setVerProveedores] = useState([])
  const [Id_proveedor, setId_proveedor] = useState("")
  const [Id_compra, setId_compra] = useState("")
  const [descripcion_compra, setDescripcionComra] = useState("")
  const [totalCompra, setTotalCompra] = useState("")
  const [personaPideCompra, setPersonaPide] = useState("")
  const [personaRecibeCompra, setPerosonaRecibe] = useState("")
  const [estado_compra, setEstadoCompra] = useState("")
 
  



  const idSucursal = localStorage.getItem("sucursalId")
  
  const buscador = (e) => {
    const textoBuscado = e.target.value.toLowerCase();
    setBuscar(textoBuscado);
    let resultadoFiltrado = [];
  
    if (!textoBuscado) {
      resultadoFiltrado = [...resultado];
    } else {
      resultadoFiltrado = resultado.filter((dato) => {
        const fechaRegistroStr = new Date(dato.fecha_registro).toLocaleString().toLowerCase();
        return fechaRegistroStr.includes(textoBuscado)
      });
    }
    setResultado(resultadoFiltrado);
};


const verProveedores =  ()  => {
  axios.get("http://localhost:3001/proveedores").then((response)=>{
   setVerProveedores(response.data)
 })
}


 const verlaCompra = () =>{ 
  axios.get(`http://localhost:3001/compra`).then((response) => {
   setCompraVer(response.data);
   }).catch((error) => {
     console.log('Error al obtener los productos:', error);
  });
 }



 const editarCompra = () =>{
  axios.put(`http://localhost:3001/compra/put/${Id_compra}`,
  {
    Id_compra: Id_compra,
    descripcion_compra: descripcion_compra,
    totalCompra: totalCompra,
    estado_compra: estado_compra,
    personaPideCompra: personaPideCompra,
    personaRecibeCompra: personaRecibeCompra,  
    Id_proveedor: document.getElementById('proveedor').value,
    Id_sucursal: idSucursal
  }).then(()=>{
    limpiarCampos()
    alert('usuario editado')
    verlaCompra()
  }).catch((error)=>{
    console.log('no se pudo editar la compra',error)
  })
 }

 const seeCompra= (compra) =>{
  setId_compra(compra.Id_compra)
  setDescripcionComra(compra.descripcion_compra)
  setTotalCompra(compra.totalCompra)
  setEstadoCompra(compra.estado_compra)
  setPersonaPide(compra.personaPideCompra)
  setPerosonaRecibe(compra.personaRecibeCompra)
  setId_proveedor(compra.Id_proveedor)
 }
 const limpiarCampos= () =>{
  setId_compra('')
  setDescripcionComra('')
  setTotalCompra('')
  setEstadoCompra('')
  setPersonaPide('')
  setPerosonaRecibe('')
  setId_proveedor('')
 }

useEffect(()=>{
  verlaCompra()
  verProveedores()
},[])
    

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
      
      


      <MDBInputGroup textBefore='📋' className='mb-3' >
            <input className='form-control' type='text' placeholder="Descripcion" value={descripcion_compra} onChange={(e) => setDescripcionComra(e.target.value)} />
          </MDBInputGroup>

          <MDBInputGroup textBefore='💲' className='mb-3' >
            <input className='form-control' type='number' placeholder="Total Compra " value={totalCompra} onChange={(e) => setTotalCompra(e.target.value)} />
          </MDBInputGroup>

          <MDBInputGroup textBefore='📋' className='mb-3' >
            <input className='form-control' type='text' placeholder="Estado de la compra" value={estado_compra} onChange={(e) => setEstadoCompra(e.target.value)} />
          </MDBInputGroup>

          <MDBInputGroup textBefore='🙍‍♂️' className='mb-3' >
            <input className='form-control' type='text' placeholder="Persona que pide " value={personaPideCompra} onChange={(e) => setPersonaPide(e.target.value)} />
          </MDBInputGroup>
          <MDBInputGroup textBefore='🙍🏻‍♂️' className='mb-3' >
            <input className='form-control' type='text' placeholder="Persona que recibe " value={personaRecibeCompra} onChange={(e) => setPerosonaRecibe(e.target.value)} />
          </MDBInputGroup>
        <br />
          <h3>Proveedores:</h3><Form.Select  key={Id_proveedor} aria-label="Nombre proveedor" id="proveedor">
                {verProvedores.map((cat)=>   
                    <option key={cat.Id_proveedor} value={cat.Id_proveedor}>{cat.nombre_proveedor}</option>   
                )}
            </Form.Select>
                
                <br />

                <div className='card-footer text-muted'>
                  <div >
                  <Button className="btn btn-warning m-2" onClick={editarCompra}>✔️Editar</Button>
                
                  <Button className="btn btn-danger m-2" onClick={limpiarCampos}>❌ Cancelar</Button>
                  </div>          
                   
                </div>



            
      <div className='container-fluid'><br />
        <input value={buscar} onChange={buscador} type="text" placeholder='Busca una compra...' className='form-control' />
        <table className='table mt-5 shadow-lg'>
          <thead>
            <tr className='table-success'>
              <th>Id Compra</th>
              <th>descripcion compra</th>
              <th>Total de la compra</th>
              <th>estado compra</th>
              <th>persona Pide Compra</th>
              <th>persona Recibe Compra</th>
              <th>FECHA DE REGISTRO</th>
              <th>OPCION</th>

            </tr>
          </thead>
          <tbody>
                {compraVer.map((compra) => (
                  <tr key={compra.Id_compra}>
                    <td>{compra.Id_compra}</td>
                    <td>{compra.descripcion_compra}</td>
                    <td>{compra.totalCompra}</td>
                    <td>{compra.estado_compra}</td>
                    <td>{compra.personaPideCompra}</td>
                    <td>{compra.personaRecibeCompra}</td>
                    <td>{new Date(compra.FechaRegistro).toLocaleString()}</td>
                    <td><Button onClick={()=>seeCompra(compra)}>SELECCIONAR</Button></td>
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
