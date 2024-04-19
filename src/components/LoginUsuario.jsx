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
  import { faSackDollar } from '@fortawesome/free-solid-svg-icons';
  import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
  import logo from '../assets/logo-negro.png'
  import logo2 from '../assets/logo-negro2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoginUsuario = () => {

    const [nombre_usuario, setNombreUsuario] = useState("")
    const [clave_usuario, setClaveUsuario] = useState("")
    const [usuarios, setUsuarios] = useState([])
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
            Swal.fire({
                title: " <strong>Ingreso Correcto!</strong>",
                html: "<strong>Que tenga un dia exitoso!</strong>",
                icon: 'success',
                timer:3000
              })       
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


    useEffect(() => {
        const id_sucursal = localStorage.getItem("sucursalId");
        axios.get(`http://localhost:3001/usuarios/sucursal/${id_sucursal}`)
          .then(response => {
            setUsuarios(response.data);
          })
          .catch(error => {
            console.error('Error fetching sucursales:', error);
          });
      }, []);
    
  return (
    <>
    <img src={logo} alt="logo1" style={{ position: 'absolute', top: '15px', left: '15px', width: '130px' }} />
     <MDBContainer fluid>

        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
            <MDBCol col='12'>

                <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
                    <MDBCardBody className='p-5 w-100 d-flex flex-column'>


                        <img src={logo2} alt="" />
                        <br />

                        <select className='form-select mb-4 w-100' value={nombre_usuario} onChange={(e) => setNombreUsuario(e.target.value)}>
                    <option value='' disabled selected>Seleccione usuario</option>
                    {usuarios.map(usuario => (
                      <option key={usuario.Id_usuario} value={usuario.nombre_usuario}>{usuario.nombre_usuario}</option>
                    ))}
                  </select>      
           
                    <input className='form-control mb-4 w-100'  type='password' size="lg" placeholder='Ingrese clave...' value={clave_usuario} onChange={(e) => setClaveUsuario(e.target.value)}/>  
                    <MDBBtn size='lg' onClick={ComprobarLogin}>
                    INGRESAR
                    </MDBBtn>
                    </MDBCardBody>
                </MDBCard>

            </MDBCol>
        </MDBRow>

    </MDBContainer>


    <Modal show={showModal1} onHide={handleCloseModal1}>
            <Modal.Header closeButton>
              <Modal.Title>SELECCIONE CAJA</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <img src={logo2} alt="" style={{display: 'block', maxHeight: '100%', maxHeight: '100px', margin: '0 auto 20px', marginTop: '20px'}}  />

            <h3>CAJA:</h3><Form.Select key={Id_caja} aria-label="Caja" id="Caja">
                {caja.map((caj)=>   
                    <option key={caj.Id_caja} value={caj.Id_caja}>{caj.Id_caja}</option>   
                )}
            </Form.Select>
        <br />
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
              <Modal.Title>DINERO EN CAJA</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
           <FontAwesomeIcon icon={faSackDollar} style={{ color: '#0e7c15', fontSize:'2em' }}></FontAwesomeIcon>
                    <input className="form-control" type="text" placeholder="INGRESE LA CANTIDAD DE DINERO EN CAJA" onChange={(e) => setIngresoPlata(e.target.value)}  style={{width: '350px', marginLeft: '10px'}}/>
                    </div>
              <Button  variant="outline-success" onClick={regristroPlata} style={{margin: '0 auto', marginTop: '10px'}}><FontAwesomeIcon icon={faDoorOpen} style={{fontSize: '30px'}}></FontAwesomeIcon> INGRESAR</Button>
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