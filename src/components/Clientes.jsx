import  { useEffect, useState } from 'react'
import App from '../App'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';


 const Clientes = () =>{

  const[Id_cliente,setIdCliente] = useState();
  const[nombre_cliente,setNombreCliente] = useState();
  const[apellido_cliente,setApellidoCliente] = useState();
  const[telefono_cliente,setTelefonoCliente] = useState();
  const[correo_cliente,setCorreoCliente] = useState();
  const[domicilio_cliente,setDomicilioCliente] = useState();
  const[ciudad_cliente,setCiudadCliente] = useState();
  const[codigoPostal_cliente,setCodigoPostal_cliente] = useState();
  const[estado_cliente,setEstadoCliente] = useState();
  const[ver,setVer] = useState([]);
  const[buscar,setBuscar] = useState();
 
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
      correo_cliente:correo_cliente,
      domicilio_cliente:domicilio_cliente,
      ciudad_cliente:ciudad_cliente,
      codigoPostal_cliente:codigoPostal_cliente,
      estado_cliente:estado_cliente
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
        correo_cliente:correo_cliente,
        domicilio_cliente:domicilio_cliente,
        ciudad_cliente:ciudad_cliente,
        codigoPostal_cliente:codigoPostal_cliente,
        estado_cliente: estado_cliente
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

  setIdCliente(val.Id_cliente)
  setNombreCliente(val.nombre_cliente)
  setApellidoCliente(val.apellido_cliente)
  setTelefonoCliente(val.telefono_cliente)
  setCorreoCliente(val.correo_cliente)
  setDomicilioCliente(val.domicilio_cliente)
  setCiudadCliente(val.ciudad_cliente)
  setCodigoPostal_cliente(val.codigoPostal_cliente)
  setEstadoCliente(val.estado_cliente)
}

const limpiarCampos = () =>{
  setNombreCliente('')
  setApellidoCliente('')
  setTelefonoCliente('')
  setCorreoCliente('')
  setDomicilioCliente('')
  setCiudadCliente('')
  setCodigoPostal_cliente('')
  setEstadoCliente(1)
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
                <div className="row">
                    <div className="col">
                        Nombre: <input type="text" value={nombre_cliente} onChange={(e) => setNombreCliente(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Apellidos: <input type="text" value={apellido_cliente} onChange={(e) => setApellidoCliente(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Telefono: <input type="text" value={telefono_cliente} onChange={(e) => setTelefonoCliente(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Correo: <input type="text" value={correo_cliente} onChange={(e) => setCorreoCliente(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Domicilio: <input type="text" value={domicilio_cliente} onChange={(e) => setDomicilioCliente(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Ciudad: <input type="text" value={ciudad_cliente} onChange={(e) => setCiudadCliente(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Codigo Postal: <input type="text" value={codigoPostal_cliente} onChange={(e) => setCodigoPostal_cliente(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Estado: <input type="text" value={estado_cliente} onChange={(e) => setEstadoCliente(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2"><br />
                        <Button className="btn btn-info" onClick={agregarClientes}>✔️Guardar Cliente</Button>
                    </div> 
                    <div className="col-2"><br />
                        <Button className="btn btn-warning" onClick={editarClientes}>✔️Editar Cliente</Button>
                    </div> 
                </div><br /><br />
                <input value={buscar} onChange={buscador} type="text" placeholder='Busca un cliente...' className='form-control'/>
            </div>
            <table className='table table-striped table-hover mt-5 shadow-lg'>
                <thead>
                    <tr className='table-success'>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Telefono</th>
                        <th>Correo</th>
                        <th>Domicilio</th>
                        <th>Ciudad</th>
                        <th>Codigo Postal</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        resultado.map((val, index) => (
                            <tr key={val.Id_cliente}>
                                <td>{val.nombre_cliente}</td>
                                <td>{val.apellido_cliente}</td>
                                <td>{val.telefono_cliente}</td>
                                <td>{val.correo_cliente}</td>
                                <td>{val.domicilio_cliente}</td>
                                <td>{val.ciudad_cliente}</td>
                                <td>{val.codigoPostal_cliente}</td>
                                <td>{val.estado_cliente}</td>
                                <td className='btn-group' role='group' aria-label="Basic example">
                                     <Button type='button' className='btn btn-warning m-2' onClick={()=>{seeClientes(val)}}> EDITAR </Button>
                                </td>
                                <td className='btn-group' role='group' aria-label="Basic example">
                                     <Button type='button' className='btn btn-danger m-2' onClick={()=>{eliminarCliente(val)}}> ELIMINAR </Button>
                                </td>
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
