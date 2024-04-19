import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap';
import App from '../App';
import {
  MDBInputGroup,
} from 'mdb-react-ui-kit';





export default function Configuracion() {

   const [verProveedores, setVerProveedores] = useState([])
   const [descripcion_proveedor, setdDescripcion_proveedor] = useState("")
   const [numTel_proveedor, setNumTel_proveedor] = useState("")
   const [nombre_proveedor, setNombre_proveedor] = useState("")
   const [Id_proveedor, setId_proveedor] = useState("")
   const[buscar,setBuscar] = useState();
   const [editarProveedores, setEditarProveedores] = useState(false)  

   const buscador = (e)=>{
     setBuscar(e.target.value)
   }
   
   let resultado = []
    if(!buscar)
    {
      resultado = verProveedores
   }else{  
      resultado = verProveedores.filter((dato) =>
      dato.nombre_cliente.toLowerCase().includes(buscar.toLocaleLowerCase())) 
 }

 const seeProveedores= (val) =>{
  setEditarProveedores(true)
  setId_proveedor(val.Id_proveedor)
  setNombre_proveedor(val.nombre_proveedor)
  setdDescripcion_proveedor(val.descripcion_proveedor)
  setNumTel_proveedor(val.numTel_proveedor)
 }
 const limpiarCampos= () =>{
  setEditarProveedores(false)
  setId_proveedor("")
  setNombre_proveedor("")
  setdDescripcion_proveedor("")
  setNumTel_proveedor("")
 }

   const verLosProveedores = () =>{
    axios.get("http://localhost:3001/proveedores").then((response)=>{
      setVerProveedores(response.data)
    })
   }

   const crearProveedores = () =>{
    axios.post("http://localhost:3001/proveedores/post",{
      nombre_proveedor: nombre_proveedor,
      descripcion_proveedor: descripcion_proveedor,
      numTel_proveedor: numTel_proveedor
    }).then(()=>{
      alert('funca')
      verLosProveedores()
      limpiarCampos()
    }).catch(()=>{
      console.log('error al crear proveedor')
    })
   }


   const editarProveedor = () =>{
    axios.put(`http://localhost:3001/proveedores/put/${Id_proveedor}`,
    {
      Id_proveedor: Id_proveedor,
      nombre_proveedor: nombre_proveedor,
      descripcion_proveedor: descripcion_proveedor,
      numTel_proveedor: numTel_proveedor

    }).then(()=>{
      alert('proveedor editado')
      verLosProveedores()
      limpiarCampos()
    }).catch((error)=>{
      console.log('error al ediar proveedor',error)
  
    })
   }


   const eliminarProveedor = (val) =>{
    axios.delete(`http://localhost:3001/proveedores/delete/${val.Id_proveedor}`,).then(()=>{
      verLosProveedores()
    }).then(()=>{
      alert('proveedor eliminado con exito')
    })
   }

    useEffect(()=>{
      verLosProveedores()
    },[])


    return (
      <>
        <App/>
      
      <div className='h3-ventas'>
        <h1>PROVEEDORES</h1>
      </div>
        <br /><br />
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
          </div>
          <div className="col-">
            <br /> <br />
            <div className="container-fluid">
            <MDBInputGroup textBefore='📋'   className='mb-3'>
            <input className='form-control' type='text' placeholder="Nombre"  value={nombre_proveedor} onChange={(e) => setNombre_proveedor(e.target.value)}/>
          </MDBInputGroup>

          <MDBInputGroup textBefore='📋' className='mb-3' >
            <input className='form-control' type='text' placeholder="Descripcion" value={descripcion_proveedor} onChange={(e) => setdDescripcion_proveedor(e.target.value)} />
          </MDBInputGroup>

          <MDBInputGroup textBefore='📞' className='mb-3' >
            <input className='form-control' type='number' placeholder="Telefono" value={numTel_proveedor} onChange={(e) => setNumTel_proveedor(e.target.value)} />
          </MDBInputGroup>
                
          <div className='card-footer text-muted'>
                  {
                  editarProveedores ? 
                  <div >
                    <Button className="btn btn-warning m-2" onClick={editarProveedor}>✔️Editar Proveedor</Button>
                
                    <Button className="btn btn-danger m-2" onClick={limpiarCampos}>❌ Cancelar</Button>
                  </div> 
                  :      
                  <div > 
                    <Button className="btn btn-success m-2" onClick={crearProveedores}>✔️Guardar Proveedor</Button>
                  </div> 
                  }

                    
                   
                </div>
                  <input value={buscar} onChange={buscador} type="text" placeholder='Busca un cliente...' className='form-control'/>
              </div>
              <table className='table table-striped table-hover mt-5 shadow-lg'>
                  <thead>
                      <tr className='table-success'>
                          <th>Nombre</th>
                          <th>Descripcion</th>
                          <th>Telefono</th>
                          <th>EDITAR</th>
                          {/* <th>ELIMINAR</th> */}
                      </tr>
                  </thead>
                  <tbody>
                      {
                          resultado.map((val) => (
                              <tr key={val.Id_proveedor}>
                                  <td>{val.nombre_proveedor}</td>
                                  <td>{val.descripcion_proveedor}</td>
                                  <td>{val.numTel_proveedor}</td>               
                                  <td  aria-label="Basic example">
                                       <Button type='button' className='btn btn-warning m-2' onClick={()=>{seeProveedores(val)}}> EDITAR </Button>
                                  </td>
                                  {/* <td aria-label="Basic example">
                                       <Button type='button' className='btn btn-danger m-2' onClick={()=>{eliminarProveedor(val)}}> ELIMINAR </Button>
                                  </td> */}
                              </tr>
                          ))
                      }
                  </tbody>
              </table> 
          </div>
        </div>
      </div>
  
      </>
    )
  
  }
