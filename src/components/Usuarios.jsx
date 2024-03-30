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


    
   
    const id_sucursal = localStorage.getItem("sucursalId")
    useEffect(() => {
        axios.get(`http://localhost:3001/usuarios/sucursal/${id_sucursal}`)
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
            Id_sucursal: id_sucursal
        }).then(()=>{
            alert('funca')
        }).catch((error)=>{
            console.log('casi pero no post', error)
        })
    }

    const editarUsuario = () =>{
        axios.put(`http://localhost:3001/usuarios/put/${Id_usuario}`,{
            nombre_usuario: nombre_usuario,
            clave_usuario: clave_usuario,
            rol_usuario: document.getElementById("usuariosRol").value,
            Id_sucursal: id_sucursal
        }).then(()=>{
            alert('funca')
        }).catch((error)=>{
            console.log('casi pero no en el put',error)
        })
    }

    const eliminarUsuario = (Id_usuario) =>{
        axios.delete(`http://localhost:3001/usuarios/delete/${Id_usuario}`,
        {}
        ).then(()=>{
            alert('funca')
        }).catch((error)=>{
            console.log('casi pero no en el delete', error)
        })
    }


    const seeUsuarios = (val) =>{
        setNombreUsuario(val.nombre_usuario),
        setClaveUsuario(val.clave_usuario),
        setRolUsuario(val.rol_usuario)
    }

  return (
    <>
    <App/><br /><br />
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
                <div className="row">
                    <div className="col">
                        <Button className="btn btn-success" onClick={crearUsuarios}>Guardar Usuario</Button>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col">
                        <Button className="btn btn-success" onClick={editarUsuario}>Editar Usuario</Button>
                    </div>
                </div>
            </div>

            <table className='table table-striped table-hover mt-5 shadow-lg'>
                <thead>
                    <tr className='table-info'>
                        <th>Nombre</th>
                        <th>Clave</th>
                        <th>Rol</th>
                        <th>Fecha de creacion</th>
                        <th>Opcion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map((val) => (
                            <tr key={val.Id_usuario}>                  
                                <td>{val.nombre_usuario}</td>
                                <td>{val.clave_usuario}</td>
                                <td>{val.rol_usuario}</td>
                                {/*<td>{new Date(val.fecha_registro).toISOString().slice(0, 10)}</td> */}
                                <td><Button onClick={()=>seeUsuarios(val)}>VER USUARIO</Button></td>
                                <td><Button onClick={()=> eliminarUsuario(val.Id_usuario)}>Eliminar Usuario</Button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
    </>
  )
}

export default Usuarios
