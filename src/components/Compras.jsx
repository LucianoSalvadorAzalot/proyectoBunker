import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import App from '../App.jsx';
import {
  MDBInputGroup,
} from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';

const Compras = () => {

  const [buscar, setBuscar] = useState("");
  const [verProvedores, setVerProveedores] = useState([])
  const [Id_proveedor, setId_proveedor] = useState("")
  const [Id_compra, setId_compra] = useState("")
  const [descripcion_compra, setDescripcionComra] = useState("")
  const [totalCompra, setTotalCompra] = useState("")
  const [personaPideCompra, setPersonaPide] = useState("")
  const [personaRecibeCompra, setPerosonaRecibe] = useState("")
  const [estadoCompra, setEstadoCompra] = useState("")
  const [verCompra, setVerCompra] = useState([])



const verCompras = () =>{
  axios.get("http://localhost:3001/compra").then((response)=>{
    setVerCompra(response.data)
  })
}


const verProveedores =  ()  => {
   axios.get("http://localhost:3001/proveedores").then((response)=>{
    setVerProveedores(response.data)
  })
}


const FinalizarCompra = () => {
  const id_sucursal = localStorage.getItem('sucursalId');
  axios.post("http://localhost:3001/compra/post", {
    descripcion_compra: descripcion_compra,
    totalCompra: totalCompra,
    estado_compra: estadoCompra,
    personaPideCompra: personaPideCompra,
    personaRecibeCompra: personaRecibeCompra,  
    Id_proveedor: document.getElementById('proveedor').value,
    Id_sucursal: id_sucursal
  }).then(() => {
    verCompras()
    alert('compra terminada con exito')
  });
};



useEffect(() => {
  verCompras()
  verProveedores()
}, []);



return (
  <>
  <App/>
  
       <br></br> 
    <br />
    <div className="container-fluid">
    <h2>COMPRAS</h2>

          <MDBInputGroup textBefore='📋' className='mb-3' >
            <input className='form-control' type='text' placeholder="Descripcion" value={descripcion_compra} onChange={(e) => setDescripcionComra(e.target.value)} />
          </MDBInputGroup>

          <MDBInputGroup textBefore='💲' className='mb-3' >
            <input className='form-control' type='number' placeholder="Total Compra " value={totalCompra} onChange={(e) => setTotalCompra(e.target.value)} />
          </MDBInputGroup>

          <MDBInputGroup textBefore='📋' className='mb-3' >
            <input className='form-control' type='text' placeholder="Estado de la compra" value={estadoCompra} onChange={(e) => setEstadoCompra(e.target.value)} />
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

          <Button className="btn btn-success" onClick={FinalizarCompra}>Guardar compra</Button>
            
            
            
        </div>
             <br></br> 
      <div className="container-fluid">
        <h3>Elegir producto existente</h3>
        <div className='col'>    
          <input value={buscar} type="text" placeholder='Busca una compra...' className='form-control'/>
        </div> <br />
        <div className="row">     
          <div className="col">  
            <Table striped bordered hover>
              <thead>
              <tr>
                  <th>ID</th>
                  <th>DESCRIPCION DE LA COMPRA</th>
                  <th>TOTAL COMPRA</th>
                  <th>ESTADO COMPRA</th>
                  <th>PERSONA QUE PIDE LA COMPRA</th>
                  <th>PERSONA QUE RECIBE LA COMPRA</th>
              </tr>
              </thead>
              <tbody>
                {verCompra.map((compra) => (
                  <tr key={compra.Id_compra}>
                    <td>{compra.Id_compra}</td>
                    <td>{compra.descripcion_compra}</td>
                    <td>{compra.totalCompra}</td>
                    <td>{compra.estado_compra}</td>
                    <td>{compra.personaPideCompra}</td>
                    <td>{compra.personaRecibeCompra}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
   
    </>
);
}

export default Compras

