import  {useNavigate} from 'react-router-dom'
import './App.css'
import { Button, Navbar } from 'react-bootstrap'
import  axios from 'axios'
import { Modal} from 'react-bootstrap';
import { MDBInputGroup } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/logo-blanco.png'
import Container  from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {NavLink} from 'react-bootstrap';
import { Link } from 'react-router-dom'

function App(  ) {

 
  const [cantidadPlataCaja, setCantidadPlataCaja] = useState("")
  const [showModal, setShowModal] = useState(false);
  const [totalVentas, setTotalVentas] = useState([]);
  const [time, setTime] = useState(new Date());



      
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const rolUsuario = localStorage.getItem("rolUsuario")

 const navigate = useNavigate()

  const navegar = (ruta) =>{
    navigate(ruta)
  }

 const id_sucursal = localStorage.getItem("sucursalId")
 const id_usuario = localStorage.getItem("idUsuario")
 const FechaRegistro = localStorage.getItem("FechaRegistro")
 const IdCaja = localStorage.getItem('idCaja')
 const nombreUsuario = localStorage.getItem('nombreUsuario')
 const nombreSucursal = localStorage.getItem('nombreSucursal')



  const calcularFaltante = () =>{
    return totalVentas.reduce((total,item)=> total + item.total_ventas - cantidadPlataCaja, 0)
  }


 const IngresarPlataCaja = () =>{
  axios.post("http://localhost:3001/plataCaja/post",{
    Id_sucursal: id_sucursal,
    Id_usuario: id_usuario,
    cantidadPlata: cantidadPlataCaja,
    faltante: calcularFaltante(),
    Id_caja: IdCaja
  }).then(()=>{
    alert('todo ok')
    navegar('/')
  }).catch((error)=>{
    console.log('no casi pero no', error)
  })
 }





 const obtenerTotalVentas = () => {
  const FechaRegistroFormatted = format(new Date(FechaRegistro), 'yyyy-MM-dd HH:mm:ss');
  axios.get(`http://localhost:3001/plataCaja/${id_usuario}/${FechaRegistroFormatted}`)
      .then((response) => {
          const data = Array.isArray(response.data) ? response.data : [response.data];
          setTotalVentas(data);
      })
      .catch((error) => {
          console.error("Error al obtener el total de ventas:", error);
      });
};

useEffect(() => {
  const intervalID = setInterval(() => {
    setTime(new Date());
  }, 1000); 

  return () => clearInterval(intervalID);
}, []);


 useEffect(()=>{
  obtenerTotalVentas()
 },[totalVentas])

  return (
    <>
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" style={{ width: "100vw", marginLeft: "-15px", marginRight: "-15px" }}>
    <Container>
    <Navbar.Brand href="" style={{ marginLeft: "-250px" }}>
            <img src={logo}
            height='30'
            className='d-inline-block align-top' 
            alt="logo" />
          </Navbar.Brand>

          <Nav className='me-auto' style={{margin: "auto"}}>
          <Button onClick={() => navegar('/testVenta')}  className=' m-2' variant="outline-info">VENTAS</Button>
            <Button onClick={() => navegar('/credito')} className=' m-2' variant="outline-info">CREDITOS</Button>
            <Button onClick={() => navegar('/clientes')}  className=' m-2'variant="outline-info">CLIENTES</Button>
            <Button onClick={() => navegar('/productos')}  className=' m-2'variant="outline-info">PRODUCTOS</Button>
            <Button onClick={() => navegar('/compra')}   className=' m-2'variant="outline-info">COMPRA</Button>
            {rolUsuario === 'admin' && (
               <Button onClick={() => navegar('/usuarios')}  className='m-2'variant="outline-info">USUARIOS</Button>
            )} 
            {rolUsuario === 'admin' && (
             <Button onClick={() => navegar('/configuracion')} className='m-2' variant="outline-info">PROVEEDORES</Button>
          )}
           {rolUsuario === 'admin' && (
              <Button onClick={() => navegar('/metodoPago')} className=' m-2' variant="outline-info">METODO PAGO</Button>
           )}
           {rolUsuario === 'admin' && (
            <Button onClick={() => navegar('/corte2')} className=' m-2' variant="outline-info">CORTE</Button>
           )}
           {rolUsuario === 'admin' && (
            <Button onClick={() => navegar('/corteC')} className=' m-2' variant="outline-info">CORTE COMPRA</Button>
           )}
           {rolUsuario === 'admin' && (
            <Button onClick={() => navegar('/reportes')}  className=' m-2'variant="outline-info">REPORTES</Button>
           )}
           </Nav>
           <Nav className='ms-auto'  style={{ marginRight: "-290px" }}>
           <Button onClick={handleShowModal} >
            <FontAwesomeIcon icon={faDoorOpen} style={{ marginRight: '5px', width: '30px' }}></FontAwesomeIcon>SALIR</Button>
          </Nav>
        </Container>
      </Navbar>    
           
          <div className='container-fluid datos'>
            <div className='row'>
              <div className='col'><h4>Usuario: {nombreUsuario}</h4></div>
              <div className='col'><h4>Sucursal: {nombreSucursal}</h4></div>
              <div className='col'><h4>Caja: {IdCaja}</h4></div>
              <div className='col'><h5>Dia/Hora: {time.toLocaleString()}</h5></div>        
            </div>
          </div>
          
        
   
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
            <Modal.Title>SALIR</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          {totalVentas.map((t)=>(
            // eslint-disable-next-line react/jsx-key
            <h3>Plata en caja: ${t.total_ventas}</h3>
          ))}      
       


            <MDBInputGroup textBefore="💲" className="mb-3">
              <input className="form-control" type="text" placeholder="Ingrese la cantidad de plata en caja" value={cantidadPlataCaja} onChange={(e) => setCantidadPlataCaja(e.target.value)} />
            </MDBInputGroup>

            <h4>Falta ${calcularFaltante()}</h4>
            <Button onClick={IngresarPlataCaja} variant="outline-danger">🕺 Salir</Button>      
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={handleCloseModal}>
              CERRAR
            </Button>
        </Modal.Footer>
    </Modal>

    </>
  )
}

export default App
