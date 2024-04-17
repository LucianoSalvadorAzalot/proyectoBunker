import  { useEffect, useState } from 'react'
import App from '../App'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  MDBInputGroup,
} from 'mdb-react-ui-kit';

 const Clientes = () =>{

  const[Id_cliente,setIdCliente] = useState();
  const[nombre_cliente,setNombreCliente] = useState();
  const[apellido_cliente,setApellidoCliente] = useState();
  const[telefono_cliente,setTelefonoCliente] = useState();
  const[domicilio_cliente,setDomicilioCliente] = useState();
  const [montoCredito, setMontoCredito] = useState("")
  const [LimiteCredito, setLimiteCredito] = useState(0)
  const [editarCliente, setEditarCliente] = useState(false)  
  
  
  const[buscar,setBuscar] = useState();
  const[ver,setVer] = useState([]);
  const buscador = (e) => {
    setBuscar(e.target.value)
  }

  let resultado = []
  if (!buscar) {
    resultado = ver
  } else {
    resultado = ver.filter((dato) =>
      dato.nombre_cliente.toLowerCase().includes(buscar.toLowerCase())
    )
  }






  /**********VER CLIENTES************/
  const verClientes = () =>{
    axios.get("http://localhost:3001/cliente").then((response) =>{
      setVer(response.data)
    });
  }
  
  /*********CREAR CLIENTES************/
  
  const agregarClientes = () =>{
    axios.post("http://localhost:3001/cliente/post",{
      Id_cliente:Id_cliente,
      nombre_cliente:nombre_cliente,
      apellido_cliente:apellido_cliente,
      telefono_cliente:telefono_cliente,
      domicilio_cliente:domicilio_cliente,
      montoCredito: montoCredito,
      LimiteCredito: LimiteCredito
    }).then(()=>{
      verClientes()
      limpiarCampos()
      Swal.fire({
        title: " <strong>Agregacion exsitosa!</strong>",
        html: "<i>El cliente <strong> "+nombre_cliente+" </strong> fue agregado con exito</i>",
        icon: 'success',
        timer:3000
      })       
    });      
  }

  /*********EDITAR CLIENTES************/
  const editarClientes = () =>{
    axios.put(`http://localhost:3001/cliente/put/${Id_cliente}`,
    {    
        Id_cliente:Id_cliente,
        nombre_cliente:nombre_cliente,
        apellido_cliente:apellido_cliente,
        telefono_cliente:telefono_cliente,
        domicilio_cliente:domicilio_cliente,
        montoCredito: montoCredito,
        LimiteCredito: LimiteCredito
    }).then(()=>{
        verClientes()
        limpiarCampos()
        Swal.fire({
            title: " <strong>Actualizacion exsitosa!</strong>",
            html: "<i>El cliente <strong> "+nombre_cliente+" </strong> fue actualizado con exito</i>",
            icon: 'success',
            timer:3000
          })       
    });
}

 /*********ELIMINAR CLIENTE************/
const eliminarCliente =(val) =>{
  Swal.fire({
    title: 'Confirmar eliminacion?',
    html: "<i>Realmente desea eliminar el cliente <strong>"+val.nombre_cliente + val.apellido_cliente+ "</strong></strong></i>",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminarlo!'
  }).then((result)=>{
      if(result.isConfirmed){
        axios.delete(`http://localhost:3001/cliente/delete/${val.Id_cliente}`,{  
        }).then(()=>{
          verClientes()
          Swal.fire(
            'Eliminado!',
            val.nombre_cliente+'fue eliminado.',
            'success',
          )   
        });
      }
  });
}


const seeClientes = (val) =>{
  setEditarCliente(true)
  setIdCliente(val.Id_cliente)
  setNombreCliente(val.nombre_cliente)
  setApellidoCliente(val.apellido_cliente)
  setTelefonoCliente(val.telefono_cliente)
  setDomicilioCliente(val.domicilio_cliente)
  setMontoCredito(val.montoCredito)
  setLimiteCredito(val.LimiteCredito)
}

const limpiarCampos = () =>{
  setEditarCliente(false)
  setNombreCliente('')
  setApellidoCliente('')
  setTelefonoCliente('')
  setDomicilioCliente('')
  setMontoCredito('')
  setLimiteCredito('')
}


/*********FILTRO DE BUSQUEDA************/
 

  useEffect(() => {
    verClientes()
  }, [])

  return (
    <>
      <App/>
      <br />
      <h2>CLIENTES</h2>
      <h4>ADMINISTRACION DE CLIENTES</h4>
      <h4>
        Administra a todos los clientes de tu negocio(credito,facturacion,etc.)
        de forma centralizada.
      </h4>
      <br /><br />
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
        </div>
        <div className="col-">
          <br /> <br />
          <div className="container-fluid">
          <MDBInputGroup textBefore='👥'  className='mb-3'>
            <input className='form-control' type='text' placeholder="Nombre"  value={nombre_cliente} onChange={(e) => setNombreCliente(e.target.value)}/>
          </MDBInputGroup>

          <MDBInputGroup textBefore='👀' className='mb-3' >
            <input className='form-control' type='text' placeholder="Apellido" value={apellido_cliente} onChange={(e) => setApellidoCliente(e.target.value)}/>
          </MDBInputGroup>

          <MDBInputGroup textBefore='📞' className='mb-3' >
            <input className='form-control' type='number' placeholder="Telefono" value={telefono_cliente} onChange={(e) => setTelefonoCliente(e.target.value)}/>
          </MDBInputGroup>
          
          <MDBInputGroup  textBefore='🏠' className='mb-3' >
            <input className='form-control' type='text' placeholder="Domicilio" value={domicilio_cliente} onChange={(e) => setDomicilioCliente(e.target.value)}/>
          
          </MDBInputGroup>

          <MDBInputGroup  textBefore='💲' className='mb-3' textAfter='.00' >
            <input className='form-control' type='number' placeholder="Credito"  value={montoCredito} onChange={(e) => setMontoCredito(e.target.value)}/>
          </MDBInputGroup>

          <MDBInputGroup  textBefore='💲' className='mb-3' textAfter='.00' >
            <input className='form-control' type='number' placeholder="Credito"  value={LimiteCredito} onChange={(e) => setLimiteCredito(e.target.value)}/>
          </MDBInputGroup>


                <div className='card-footer text-muted'>
                  {
                  editarCliente ? 
                  <div >
                  <Button className="btn btn-warning m-2" onClick={editarClientes}>✔️Editar Cliente</Button>
                
                  <Button className="btn btn-danger m-2" onClick={limpiarCampos}>❌ Cancelar</Button>
                  </div> 
                  :
                
                      <div > 
                      <Button className="btn btn-success m-2" onClick={agregarClientes}>✔️Guardar Cliente</Button>
                      </div> 
                  }

                    
                   
                </div>




                <br /><br />
                <input value={buscar} onChange={buscador} type="text" placeholder='Busca un cliente...' className='form-control'/>
            </div>



            
            <table className='table table-striped table-hover mt-5 shadow-lg'>
                <thead>
                    <tr className='table-success'>
                        <th>NOMBRE</th>
                        <th>APELLIDO</th>
                        <th>TELEFONO</th>
                        <th>DOMICILIO</th>
                        <th>CREDITO</th>
                        <th>LIMITE CREDITO</th>
                        <th>EDITAR</th>
                        {/* <th>Eliminar</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        resultado.map((val) => (
                            <tr key={val.Id_cliente}>
                                <td>{val.nombre_cliente}</td>
                                <td>{val.apellido_cliente}</td>
                                <td>{val.telefono_cliente}</td>
                                <td>{val.domicilio_cliente}</td>              
                                <td>{val.montoCredito}</td>
                                <td>{val.LimiteCredito}</td>
                                <td className=''  aria-label="Basic example">
                                     <Button type='button' className='btn btn-warning m-2' onClick={()=>{seeClientes(val)}}> 👀VER </Button>
                                </td>
                                {/* <td className=''  aria-label="Basic example">
                                     <Button type='button' className='btn btn-danger m-2' onClick={()=>{eliminarCliente(val)}}> ELIMINAR </Button>
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
export default Clientes
