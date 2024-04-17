import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const Login = () => {
  const navigate = useNavigate();
  const [nombre_sucursal, setNombre_sucursal] = useState("");
  const [clave, setClave] = useState("");
 

  const comprobarLogin = () => {
    axios.post("http://localhost:3001/login/post",{ 
      nombre_sucursal: nombre_sucursal,
      clave: clave
    })
    .then(response => {
      const sucursalId = response.data.sucursalId;
      if (sucursalId) {
        localStorage.setItem('sucursalId', sucursalId);
        localStorage.setItem('nombreSucursal', nombre_sucursal)
        navigate('/loginUsuario', { replace: true });
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
  };

  return (
    <>
      
      <MDBContainer fluid>

<MDBRow className='d-flex justify-content-center align-items-center h-100'>
  <MDBCol col='12'>

    <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
      <MDBCardBody className='p-5 w-100 d-flex flex-column'>

        <h2 className="fw-bold mb-2 text-center">Bunker</h2>

        <MDBInput wrapperClass='mb-4 w-100' label='Nombre Sucursal' id='formControlLg' type='name' size="lg" value={nombre_sucursal} onChange={(e) => setNombre_sucursal(e.target.value)}/>
        <MDBInput wrapperClass='mb-4 w-100' label='Clave Sucursal' id='formControlLg' type='password' size="lg" value={clave} onChange={(e) => setClave(e.target.value)}/>

        <MDBBtn size='lg' onClick={comprobarLogin}>
          Login
        </MDBBtn>

        <hr className="my-4" />


      </MDBCardBody>
    </MDBCard>

  </MDBCol>
</MDBRow>

</MDBContainer>
    </>
  );
};

export default Login;
