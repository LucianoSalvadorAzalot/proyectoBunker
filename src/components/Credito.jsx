import  { useState, useEffect } from 'react'
import App from '../App'
import { Modal, Button, Table} from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'

const Creditos = () => {

const [showModal, setShowModal] = useState(false);
const [clientes, setClientes] = useState([]);
const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
const [mostrarTablaCliente, setMostrarTablaCliente] = useState(false);
const [detalleCliente, setDetalleCliente] = useState([]);
const [montoCredito, setMontoCredito] = useState(0);


const handleShowModal = () => setShowModal(true);
const handleCloseModal = () => setShowModal(false);


const sumarPreciosVenta = () => {
  let total = 0;
  detalleCliente.forEach((dt) => {
    total += parseFloat(dt.precioTotal_venta);
  });
  return total.toLocaleString('es-AR');
};




const obtenerDetalleCliente = (Id_cliente, montoCredito) =>{
    axios.get(`http://localhost:3001/creditos/${Id_cliente}`).then((response) =>{
      setDetalleCliente(response.data);
      setMontoCredito(montoCredito)
      console.log('xd',response.data)
    })
  }



const obtenerClientes = () => {
  axios.get("http://localhost:3001/cliente").then((response) => {
    setClientes(response.data);
  });
}

<<<<<<< HEAD
const descVenta = (Id_cliente, precioTotal_venta, Id_venta) =>{
=======


const descVenta = (Id_cliente, precioTotal_venta) =>{
>>>>>>> 427a73de24f0ec25152ac8304d079a20ad0d2666
  axios.put("http://localhost:3001/creditos/restarCredito",{
    Id_cliente: Id_cliente,
    montoCredito: precioTotal_venta
  }).then(()=>{
<<<<<<< HEAD
    axios.put(`http://localhost:3001/creditos/estadoCredito/${Id_venta}`).then(()=>{
=======
    axios.put("http://localhost:3001/creditos/estadoCredito").then(()=>{
>>>>>>> 427a73de24f0ec25152ac8304d079a20ad0d2666
      alert('todo ok')
    }).catch((error)=>{
      console.log('error al cambiar el estado',error)
    })
  }).catch((error)=>{
    console.log('error al descontar el credito', error)
  })
}
<<<<<<< HEAD
=======





>>>>>>> 427a73de24f0ec25152ac8304d079a20ad0d2666
  useEffect(() => {
    obtenerClientes();
  }, []);
  return (
  <>
  <App/>
  
  <div className='h3-ventas'>
  <h1>CUENTAS CREDITOS CLIENTES</h1>
  </div>
      <Button onClick={handleShowModal}>MOSTRAR CLIENTES</Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>VER ESTADO DE CUENTA CLIENTES</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>APELLIDO</th>
                <th>ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.Id_cliente}>
                  <td>{cliente.Id_cliente}</td>
                  <td>{cliente.nombre_cliente}</td>
                  <td>{cliente.apellido_cliente}</td>
                  <td><button onClick={()=>obtenerDetalleCliente(cliente.Id_cliente, cliente.montoCredito)} style={{ backgroundColor: '#244983', color: 'white' }}><FontAwesomeIcon icon={faEye}/></button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            CERRAR
          </Button>
        </Modal.Footer>
      </Modal>

     
            <div>
              <br />
              <h2>TOTAL DE CUENTA</h2>
           
                <h3>${montoCredito}</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>NOMBRE</th>
                    <th>CANTIDAD</th>
                    <th>PRECIO UNITARIO</th>
                    <th>TOTAL DE LA VENTA</th>
                    <th>FECHA REGISTRO</th>
<<<<<<< HEAD
                    <th>EMPLEADO QUE HIZO VENTA</th>
                    <th>ESTADO DE LA VENTA</th> 
                    <th>ELIMINAR VENTA</th>               
=======
                    <th>EMPLEADO QUE HIZO VENTA</th>   
                    <th>ESTADO DE LA VENNTA</th>      
                    <th>ELIMINAR LA VENTA</th>       
>>>>>>> 427a73de24f0ec25152ac8304d079a20ad0d2666
                  </tr>
                </thead>
                <tbody>
                {detalleCliente.map((dt)=>(
                  <tr key={dt.Id_credito}>
                 <td>
                  <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0 }}>
                    {dt.productos && Array.isArray(dt.productos) && dt.productos.map((producto) => (
                      <li style={{marginLeft: '20px'}}   key={producto.Id_producto}>{producto.nombre_producto}</li>
                    ))}
                  </ul>
                  </td>

                 <td>
                  <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0 }}>
                    {dt.productos && Array.isArray(dt.productos) && dt.productos.map((producto) => (
                      <li style={{marginLeft: '20px'}}   key={producto.Id_producto}>{producto.nombre_producto}</li>
                    ))}
                  </ul>
                  </td>

                  <td>
                  <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0 }}>
                    {dt.productos && Array.isArray(dt.productos) && dt.productos.map((producto) => (
                      <li style={{marginLeft: '20px'}}   key={producto.Id_producto}>{producto.nombre_producto}</li>
                    ))}
                  </ul>
                  </td>
                  <td>${dt.precioTotal_venta}</td>
                  <td>{new Date(dt.fecha_registro).toLocaleString()}</td>
                  <td>{dt.usuarios.nombre_usuario}</td>
                  <td>{dt.tipoEstado}</td>
<<<<<<< HEAD
                  <td><Button onClick={()=>descVenta(dt.cliente.Id_cliente, dt.precioTotal_venta, dt.Id_venta)}>PAGAR</Button></td>
=======
                  <td><Button onClick={()=>descVenta(dt.cliente.Id_cliente, dt.precioTotal_venta)}>PAGAR</Button></td>
>>>>>>> 427a73de24f0ec25152ac8304d079a20ad0d2666
                  </tr>
                ))}
                <tr>
                  
                </tr>
                </tbody>
              </Table>
            </div>
  </>
  )
}

export default Creditos

