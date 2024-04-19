import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from 'react-bootstrap';
import App from "../App";
import {
    MDBInputGroup,
  } from 'mdb-react-ui-kit';
  import Form from 'react-bootstrap/Form';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([])
    const [Id_usuario, setIdUsuario] = useState("")
    const [nombre_usuario, setNombreUsuario] = useState("")
    const [clave_usuario, setClaveUsuario] = useState("")
    const [rol_usuario, setRolUsuario] = useState("")
    const [editarUsuarios, setEditarUsuarios] = useState(false)  

    
   
    const Id_sucursal = localStorage.getItem("sucursalId")
    useEffect(() => {
        axios.get(`http://localhost:3001/usuarios/sucursal/${Id_sucursal}`)
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch((error) => {
                console.log('Error al obtener los usuarios:', error);
            });
    }, [usuarios]);



    const crearUsuarios = () =>{        
        axios.post("http://localhost:3001/usuarios/post",{
            nombre_usuario: nombre_usuario,
            clave_usuario: clave_usuario,
            rol_usuario: document.getElementById("usuariosRol").value,
            Id_sucursal: Id_sucursal
        }).then(()=>{
            alert('funca')
            limpiarCampos()
        }).catch((error)=>{
            console.log('casi pero no post', error)
        })
    }

    const editarUsuario = () =>{
        axios.put(`http://localhost:3001/usuarios/put/${Id_usuario}`,{
            nombre_usuario: nombre_usuario,
            clave_usuario: clave_usuario,
            rol_usuario: document.getElementById("usuariosRol").value,
            Id_sucursal: Id_sucursal
        }).then(()=>{
            alert('funca')
            limpiarCampos()
        }).catch((error)=>{
            console.log('casi pero no en el put',error)
        })
    }

    // const eliminarUsuario = (Id_usuario) =>{
    //     axios.delete(`http://localhost:3001/usuarios/delete/${Id_usuario}`,
    //     {}
    //     ).then(()=>{
    //         alert('funca')
    //     }).catch((error)=>{
    //         console.log('casi pero no en el delete', error)
    //     })
    // }


    const seeUsuarios = (val) =>{
        setEditarUsuarios(true)
        setIdUsuario(val.Id_usuario)
        setNombreUsuario(val.nombre_usuario),
        setClaveUsuario(val.clave_usuario),
        setRolUsuario(val.rol_usuario)
    }
    const limpiarCampos = () =>{
        setEditarUsuarios(false)
        setIdUsuario('')
        setNombreUsuario(''),
        setClaveUsuario(''),
        setRolUsuario('')
    }

  return (
    <>
    <App/>

    <div className="h3-ventas">
        <h1>USUARIOS</h1>
    </div>
       <div className="container-fluid">
       <MDBInputGroup textBefore='📋'   className='mb-3'>
            <input className='form-control' type='text' placeholder="Nombre" value={nombre_usuario} onChange={(e) => setNombreUsuario(e.target.value)}/>
          </MDBInputGroup>

          <MDBInputGroup textBefore='📋' className='mb-3' >
            <input className='form-control' type='text' placeholder="Clave"  value={clave_usuario} onChange={(e) => setClaveUsuario(e.target.value)} />
          </MDBInputGroup>
              
          <h3> Rol:</h3> <Form.Select aria-label="Tipo de venta" id="usuariosRol" onChange={(e)=> setRolUsuario(e.target.value)}>
                <option value="admin">admin</option>
                <option value="empleado">empleado</option>
            </Form.Select>

              <br />
             
              <div className='card-footer text-muted'>
                  {
                  editarUsuarios ? 
                  <div >
                  <Button className="btn btn-warning m-2" onClick={editarUsuario}>✔️Editar Usuario</Button>
                
                  <Button className="btn btn-danger m-2" onClick={limpiarCampos}>❌ Cancelar</Button>
                  </div> 
                  :
                
                      <div > 
                      <Button className="btn btn-success m-2" onClick={crearUsuarios}>✔️Guardar Usuario</Button>
                      </div> 
                  }

                    
                   
                </div>
            </div>

            <table className='table table-striped table-hover mt-5 shadow-lg'>
                <thead>
                    <tr className='table-info'>
                        <th>NOMBRE</th>
                        <th>CLAVE</th>
                        <th>ROL</th>
                        <th>EDITAR</th>
                        {/* <th>Opcion</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map((val) => (
                            <tr key={val.Id_usuario}>                  
                                <td>{val.nombre_usuario}</td>
                                <td>{val.clave_usuario}</td>
                                <td>{val.rol_usuario}</td>
                                {/* <td>{new Date(val.fecha_registro).toISOString().slice(0, 10)}</td>  */}
                                <td><Button className="btn btn-warning" onClick={()=>seeUsuarios(val)}>👀ver</Button></td>
                                {/* <td><Button onClick={()=> eliminarUsuario(val.Id_usuario)}>Eliminar Usuario</Button></td> */}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
    </>
  )
}

export default Usuarios
