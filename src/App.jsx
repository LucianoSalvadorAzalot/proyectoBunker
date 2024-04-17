import  {useNavigate} from 'react-router-dom'
import './App.css'
import { Button } from 'react-bootstrap'
import  axios from 'axios'
import { Modal} from 'react-bootstrap';
import { MDBInputGroup } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';


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

  const calcularFaltante = () =>{
    return totalVentas.reduce((total,item)=> total + item.total_ventas - cantidadPlataCaja, 0)
  }


 const IngresarPlataCaja = () =>{
  axios.post("http://localhost:3001/plataCaja/post",{
    Id_sucursal: id_sucursal,
    Id_usuario: id_usuario,
    cantidadPlata: cantidadPlataCaja,
    faltante: calcularFaltante()
  }).then(()=>{
    alert('todo ok')
    navegar('/')
  }).catch((error)=>{
    console.log('no casi pero no', error)
  })
 }

 const nombreUsuario = localStorage.getItem('nombreUsuario')
 const nombreSucursal = localStorage.getItem('nombreSucursal')
 const IdCaja = localStorage.getItem('idCaja')


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
    <section >
        <div >
          <div className='row'>
        
            <div className='col'>
                <Button onClick={() => navegar('/testVenta')}  variant="outline-primary"> Venta</Button>
            </div>
            <div className='col'>
            <Button onClick={() => navegar('/clientes')} variant="outline-primary" >Clientes</Button>
            </div>
            <div className='col'>
            <Button onClick={() => navegar('/productos')} variant="outline-primary" >Productos </Button>
            </div>
            <div className='col'>
            <Button  onClick={() => navegar('/compra')} variant="outline-primary" >Compras</Button>
            </div>
            
            {rolUsuario === 'admin' && (
            <div className='col'>
            <Button onClick={() => navegar('/usuarios')} variant="outline-primary">Usuarios</Button>
            </div>
            )}

            {rolUsuario === 'admin' && (
            <div className='col'>
            <Button onClick={() => navegar('/configuracion')} variant="outline-primary">Proveedores</Button>
            </div>
            )}
            {rolUsuario === 'admin' && (
             <div className='col'>
                <Button onClick={() => navegar('/metodoPago')} variant="outline-primary" >Metodo Pago</Button>
              </div>
            )}
            <div className='col'>
             <Button onClick={() => navegar('/credito')} variant="outline-primary">Creditos</Button>
            </div>
            {/* {rolUsuario === 'admin' && (
              <div className='col-xl'>
              <Button onClick={() => navegar('/corteV')} variant="outline-primary">Corte Venta</Button>
              </div>
             )} */}

            {rolUsuario === 'admin' && (
              <div className='col'>
              <Button onClick={() => navegar('/corteC')} variant="outline-primary" >Corte Compra</Button>
              </div>
            )}
         
              <div className='col-xl'>
              <Button onClick={() => navegar('/plataCaja')} variant="outline-primary" >Informe Usuarios</Button>
              </div>
            
       

            {rolUsuario === 'admin' && (
                <div className='col'>
                <Button onClick={() => navegar('/reportes')}  variant="outline-primary">Reportes</Button>
                </div>
            )}

              <div className='col'>
                <Button onClick={handleShowModal} variant="outline-danger">🕺 Salir</Button>
              </div>

           
          </div>
          <div className='container'>
            <div className='row'>
              <div className='col'><h4>Usuario: {nombreUsuario}</h4></div>
              <div className='col'><h4>Sucursal: {nombreSucursal}</h4></div>
              <div className='col'><h4>Caja: {IdCaja}</h4></div>
              <div className='col'><h5>Dia/Hora: {time.toLocaleString()}</h5></div>

                              
            </div>
           
          </div>
          
          
        </div>
        <hr />
    </section>
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
