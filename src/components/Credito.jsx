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


const handleShowModal = () => setShowModal(true);
const handleCloseModal = () => setShowModal(false);


const sumarPreciosVenta = () => {
  let total = 0;
  detalleCliente.forEach((dt) => {
    total += parseFloat(dt.precioTotal_venta);
  });
  return total.toLocaleString('es-AR');
};




const obtenerDetalleCliente = (Id_cliente) =>{
    axios.get(`http://localhost:3001/creditos/${Id_cliente}`).then((response) =>{
      setDetalleCliente(response.data);
      console.log('xd',response.data)
    })
  }



const obtenerClientes = () => {
  axios.get("http://localhost:3001/cliente").then((response) => {
    setClientes(response.data);
  });
}



const descVenta = (Id_cliente, precioTotal_venta) =>{
  axios.put("http://localhost:3001/creditos/restarCredito",{
    Id_cliente: Id_cliente,
    montoCredito: precioTotal_venta
  }).then(()=>{
    axios.put("http://localhost:3001/creditos/estadoCredito").then(()=>{
      alert('todo ok')
    }).catch((error)=>{
      console.log('error al cambiar el estado',error)
    })
  }).catch((error)=>{
    console.log('error al descontar el credito', error)
  })
}





  useEffect(() => {
    obtenerClientes();
  }, []);
  return (
  <>
  <App/>
  <h1>CUENTAS CREDITOS CLIENTES</h1>
      <Button onClick={handleShowModal}>Mostrar Clientes</Button>

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
                  <td><button onClick={()=>obtenerDetalleCliente(cliente.Id_cliente)} style={{ backgroundColor: '#244983', color: 'white' }}><FontAwesomeIcon icon={faEye}/></button></td>
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
           
                <h3>${sumarPreciosVenta()}</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>NOMBRE</th>
                    <th>CANTIDAD</th>
                    <th>PRECIO UNITARIO</th>
                    <th>TOTAL DE LA VENTA</th>
                    <th>FECHA REGISTRO</th>
                    <th>EMPLEADO QUE HIZO VENTA</th>   
                    <th>ESTADO DE LA VENNTA</th>      
                    <th>ELIMINAR LA VENTA</th>       
                  </tr>
                </thead>
                <tbody>
                {detalleCliente.map((dt)=>(
                  <tr key={dt.Id_credito}>
                  <td>
                    {dt.productos && Array.isArray(dt.productos) && dt.productos.map((producto) => (
                      <li key={producto.Id_producto}>{producto.nombre_producto}</li>
                    ))}
                  </td>
                  <td>
                    {dt.productos.map((producto) => (
                      <li key={producto.Id_producto}>Cantidad:  {parseInt(producto.CantidadVendida)}</li>
                    ))}
                  </td>    
                  <td>
                    {dt.productos.map((producto) => (
                      <li key={producto.Id_producto}>precio producto: {producto.precioVenta}</li>
                    ))}
                  </td>    
                  <td>${dt.precioTotal_venta}</td>
                  <td>{new Date(dt.fecha_registro).toLocaleString()}</td>
                  <td>{dt.usuarios.nombre_usuario}</td>
                  <td>{dt.tipoEstado}</td>
                  <td><Button onClick={()=>descVenta(dt.cliente.Id_cliente, dt.precioTotal_venta)}>PAGAR</Button></td>
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

