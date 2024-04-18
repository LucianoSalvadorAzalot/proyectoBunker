import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Swal from 'sweetalert2'
import { Modal} from 'react-bootstrap';
import { MDBInputGroup } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
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

const LoginUsuario = () => {

    const [nombre_usuario, setNombreUsuario] = useState("")
    const [clave_usuario, setClaveUsuario] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [ingresoPlata, setIngresoPlata] = useState(0)
    const [caja, setCaja] = useState([])
    const [Id_caja, setId_caja] = useState("")



    const navigate = useNavigate()
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleShowModal1 = () => setShowModal1(true);
    const handleCloseModal1 = () => setShowModal1(false);

    const Id_usuario = localStorage.getItem("idUsuario")
    const id_sucursal = localStorage.getItem("sucursalId"); 
    const IdCaja = localStorage.getItem('idCaja')

    const regristroPlata = () =>{
        axios.post("http://localhost:3001/plataLogin/post",{
            Id_usuario : Id_usuario,
            Id_sucursal: id_sucursal,
            cantidadPlataLogin: ingresoPlata 
        }).then(()=>{
            alert('todo ok')
            navigate('/testVenta')
        })
    }


    const ComprobarLogin = () => {

        const FechaRegistro = new Date().toISOString(); 

        
        axios.post("http://localhost:3001/loginUsuario/post", {
            nombre_usuario: nombre_usuario,
            clave_usuario: clave_usuario,
            Id_sucursal: id_sucursal,
            Id_caja: IdCaja
        }) 
        .then((response) => {        
            const idUsuario = response.data.idUsuario;
            const rol_usuario = response.data.rol_usuario;  
            if (rol_usuario && idUsuario) {
                localStorage.setItem('rolUsuario', rol_usuario);
                localStorage.setItem('idUsuario', idUsuario);
                localStorage.setItem('nombreUsuario', nombre_usuario)
                localStorage.setItem('FechaRegistro', FechaRegistro);
            } else {
                Swal.fire({
                    title: " <strong>Ingreso invalido!</strong>",
                    html: "<i> <strong>Usuario no asociado a una sucursal</strong>  </i>",
                    icon: 'warning',
                    timer: 3000
               });
            }
        }).then(()=>{
            handleShowModal1()        
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
    

    const verlasCajas = () =>{
        axios.get(`http://localhost:3001/caja/${id_sucursal}`).then((response)=>{
            setCaja(response.data)
        })
    }

    const comprobarLoginCaja = () =>{
        axios.post("http://localhost:3001/caja/post",{
            Id_caja : document.getElementById('Caja').value,
            Id_sucursal: id_sucursal
        }).then(()=>{
            localStorage.setItem('idCaja', document.getElementById('Caja').value)
            handleShowModal()  
            handleCloseModal1()
        }).catch((error)=>{
            alert('no se pudo',error)
        })
    }

    useEffect(()=>{
        verlasCajas()
    },[])

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


    <Modal show={showModal1} onHide={handleCloseModal1}>
            <Modal.Header closeButton>
              <Modal.Title>SALIR</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h2 className="fw-bold mb-2 text-center">Bunker</h2>

            <h3>CAJA:</h3><Form.Select key={Id_caja} aria-label="Caja" id="Caja">
                {caja.map((caj)=>   
                    <option key={caj.Id_caja} value={caj.Id_caja}>{caj.Id_caja}</option>   
                )}
            </Form.Select>

        <Button onClick={comprobarLoginCaja}>ELEGIR</Button>

            </Modal.Body>

            <Modal.Footer>
              <Button variant="danger" onClick={handleCloseModal} >
                CERRAR
              </Button>
            </Modal.Footer>
          </Modal>


    <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>SALIR</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <MDBInputGroup textBefore="💲" className="mb-3">
                    <input className="form-control" type="text" placeholder="Ingrese la cantida de plata en caja" onChange={(e) => setIngresoPlata(e.target.value)}  />
                </MDBInputGroup>
              <Button  variant="outline-success" onClick={regristroPlata}>🕺 Ingresar</Button>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="danger" onClick={handleCloseModal} >
                CERRAR
              </Button>
            </Modal.Footer>
          </Modal>


  </>
  )
}

export default LoginUsuario