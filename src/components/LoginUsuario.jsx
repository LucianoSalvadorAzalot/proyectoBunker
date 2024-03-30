import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
}
from 'mdb-react-ui-kit';
import Swal from 'sweetalert2'
const LoginUsuario = () => {

    const [nombre_usuario, setNombreUsuario] = useState("")
    const [clave_usuario, setClaveUsuario] = useState("")
    const navigate = useNavigate()



    const ComprobarLogin = () => {
        const id_sucursal = localStorage.getItem("sucursalId");
        axios.post("http://localhost:3001/loginUsuario/post", {
            nombre_usuario: nombre_usuario,
            clave_usuario: clave_usuario,
            Id_sucursal: id_sucursal
        }) 
        .then(response => {
            const rol_usuario = response.data.rol_usuario;
            const idUsuario = response.data.idUsuario;
            if (rol_usuario && idUsuario) {
                localStorage.setItem('rolUsuario', rol_usuario);
                localStorage.setItem('idUsuario', idUsuario);
                navigate('/ventas', { replace: true });
                Swal.fire({
                    title: " <strong>Ingreso exitoso!</strong>",
                    html: "<i> <strong>Datos correctos</strong>  </i>",
                    icon: 'success',
                    timer: 3000
                });
            } else {
                Swal.fire({
                    title: " <strong>Ingreso invalido!</strong>",
                    html: "<i> <strong>Usuario no asociado a una sucursal</strong>  </i>",
                    icon: 'warning',
                    timer: 3000
                  });
            }
        })
        .catch(() => {
            Swal.fire({
                title: " <strong>Ingreso invalido!</strong>",
                html: "<i> <strong> nombre y/o contraseña incorrtectos</strong>  </i>",
                icon: 'warning',
                timer: 3000
              });
        });
    }
    

  return (
    <>

    <MDBContainer fluid>

    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
       <MDBCol col='12'>

        <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
        <MDBCardBody className='p-5 w-100 d-flex flex-column'>

            <h2 className="fw-bold mb-2 text-center">Bunker</h2>

            <MDBInput wrapperClass='mb-4 w-100' label='Nombre Usuario' id='formControlLg' type='name' size="lg"  value={nombre_usuario} onChange={(e) => setNombreUsuario(e.target.value)}/>
            <MDBInput wrapperClass='mb-4 w-100' label='Clave Usuario' id='formControlLg' type='password' size="lg"  value={clave_usuario} onChange={(e) => setClaveUsuario(e.target.value)}/>

            <MDBBtn size='lg' onClick={ComprobarLogin}>
            Login
            </MDBBtn>

            <hr className="my-4" />


        </MDBCardBody>
        </MDBCard>

    </MDBCol>
    </MDBRow>

    </MDBContainer>

  </>
  )
}

export default LoginUsuario