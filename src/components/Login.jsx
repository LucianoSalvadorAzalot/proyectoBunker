import { useState, useEffect } from 'react';
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
import logo2 from '../assets/logo-negro2.png'
import logoblanco from '../assets/logo-blanco.png'

const Login = () => {
  const navigate = useNavigate();
  const [nombre_sucursal, setNombre_sucursal] = useState("");
  const [clave, setClave] = useState("");
  const [sucursales, setSucursales] = useState([]);
 

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

  
  useEffect(() => {
    
    document.body.style.backgroundColor = '#1F1F1F';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/sucursales")
      .then(response => {
        setSucursales(response.data);
      })
      .catch(error => {
        console.error('Error fetching sucursales:', error);
      });
  }, []);

  return (
    <>
      <img src={logoblanco} alt="loguito" style={{ position: 'absolute', top: '15px', left: '15px', width: '120px' }} />
      <MDBContainer fluid>

<MDBRow className='d-flex justify-content-center align-items-center h-100'>
  <MDBCol col='12'>

    <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
      <MDBCardBody className='p-5 w-100 d-flex flex-column'>

        <img src={logo2} alt="logo" />
        <br />

        <select className='form-select mb-4 w-100' value={nombre_sucursal} onChange={(e) => setNombre_sucursal(e.target.value)}>
                    <option value='' disabled selected>Seleccione sucursal</option>
                    {sucursales.map(sucursal => (
                      <option key={sucursal.Id_sucursal} value={sucursal.nombre_sucursal}>{sucursal.nombre_sucursal}</option>
                    ))}
                  </select>           
      
        <input className='form-control mb-4 w-100' placeholder='Ingrese clave...' type='password' size="lg" value={clave} onChange={(e) => setClave(e.target.value)}/>

        <MDBBtn size='lg' onClick={comprobarLogin}>
          INGRESAR
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>

  </MDBCol>
</MDBRow>

</MDBContainer>
    </>
  );
};

export default Login;
