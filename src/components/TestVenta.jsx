import App from '../App'
import { Modal, Button, Table} from 'react-bootstrap';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { CarritoContext } from '../context/CarritoContext';
import Swal from 'sweetalert2';
import Badge from '@mui/material/Badge';
import styled from "styled-components";
import ModalCarrito from './ModalCarrito';
import { ShoppingCart } from "@mui/icons-material";
import { VentaContext } from '../context/VentaContext';
import { MDBInputGroup } from 'mdb-react-ui-kit';


const TestVenta = () => {
    
    const [vuelto, setVuelto] = useState(0);
    const [vueltoADar, setVueltoADar] = useState(0);
 
    const [productoSeleccionado,setProductoSeleccionado] = useState("")
    const [mostrarTablaProducto, setMostrarTablaProducto] = useState(false);
    const [Id_venta, setId_venta] = useState();
    const [verCliente, setVerCliente] = useState([])
    const [verMetodoPago, setVerMetodoPago] = useState([])
    const [intereses, setIntereses] = useState(0)
    const [cantidadesVendidas, setCantidadesVendidas] = useState({});
    const [buscar, setBuscar] = useState("");
    const [limiteCredito, setLimiteCredito] = useState(0)
    const [creditoActaul, setCreditoActual] = useState(0)
    const [ultimaVenta, setUltimaVenta] = useState("")
    const [ultimoDetalle, setUltimoDetalle] = useState([])
    const [montoTotalEgreso, setMontoTotalEgreso] = useState(0)
    const [montoTotalIngreso, setMontoTotalIngreso] = useState(0)
    const [descripcionEgreso, setDescripcionEgreso] = useState('')
    const [descripcionIngreso, setDescripcionIgreso] = useState('')
    
    const [estadoModal1, setEstadoModal1] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [showModal5, setShowModal5] = useState(false);
    const [showModal6, setShowModal6] = useState(false);
    const [showModal7, setShowModal7] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);


    const handleShowModal2 = () => setShowModal2(true);
    const handleCloseModal2 = () => setShowModal2(false);

    const handleShowModal3 = () => setShowModal3(true);
    const handleCloseModal3 = () => setShowModal3(false);
    
    const handleShowModal4 = () => setShowModal4(true);
    const handleCloseModal4 = () => setShowModal4(false);

    const handleShowModal5 = () => setShowModal5(true);
    const handleCloseModal5 = () => setShowModal5(false);

    const handleShowModal6 = () => setShowModal6(true);
    const handleCloseModal6 = () => setShowModal6(false);

    const handleShowModal7 = () => setShowModal7(true);
    const handleCloseModal7 = () => setShowModal7(false);

    const { listaCompras, eliminarCompra, agregarCompra } = useContext(CarritoContext);
    const {listaVentas,agregarVenta} = useContext(VentaContext)
    const { productos } = useContext(DataContext);
    


  const id_sucursal = localStorage.getItem('sucursalId');
  const IdCaja = localStorage.getItem('idCaja')


  const calcularTotal = () => {
    return listaCompras.reduce((total, item) => total + item.precioVenta * cantidadesVendidas[item.Id_producto], 0);

  };

  const SumarIntereses = () => { 
    return calcularTotal() + (calcularTotal() * intereses) / 100
  };


  const cambio = () => {
    const total = SumarIntereses()
    return vuelto - total
  };

  const buscador = (e) => {
    setBuscar(e.target.value)
  }
  let resultado = []
  if (!buscar) {
    resultado = productos
  } else {
    resultado = productos.filter((dato) =>
      dato.nombre_producto.toLowerCase().includes(buscar.toLowerCase())
    )
  }

    
  const totalConCredito  = () =>{
    return  creditoActaul + SumarIntereses()
  }


  const guardarVenta = () => {
    const venta = {
      productos: listaCompras,
    };
    agregarVenta(venta);
    alert('Venta guardada');
    console.log('aqui',venta)
  };
  


  const handleAgregar = (compra) => {
    const cantidadActual = cantidadesVendidas[compra.Id_producto];
    if (cantidadActual === undefined) {
      setCantidadesVendidas({ ...cantidadesVendidas, [compra.Id_producto]: 0 });
    } 
    agregarCompra(compra);
    setProductoSeleccionado(resultado);
    console.log(listaCompras)
    setMostrarTablaProducto(true);
    handleCloseModal();
  };
  
  useEffect(() => {
    const initialCantidadesVendidas = {};
    listaCompras.forEach(producto => {
      initialCantidadesVendidas[producto.Id_producto] =  producto.cantidadVendida;
    });
    setCantidadesVendidas(initialCantidadesVendidas);
  }, []);

  useEffect(() => {

    setVueltoADar(vuelto - SumarIntereses());
  }, [vuelto, listaCompras, intereses]);
        
  const metodoPago = () => {
    axios.get("http://localhost:3001/metodopago").then(response => {
      setVerMetodoPago(response.data);
    }).catch((error) => {
      console.log("error al obtener los métodos de pago", error);
    })
  }  

  const verClienteFuncion = () => {
    axios.get("http://localhost:3001/cliente").then((response) => {
      setVerCliente(response.data)
    }).catch((error) => {
      console.log(error)
    })
  };



   const traerUltimaVenta = async() =>{
     await axios.get(`http://localhost:3001/venta/UltimaVenta`).then((response)=>{
      setUltimaVenta( response.data[0].ultimoIdVenta)
      console.log('aqui ta la ultima venta', ultimaVenta)
    }).catch((error)=>{
      console.log('no se puede traer la ultima venta',error)
    })
   }



  const traerUltimoDetalle = async  () =>{
    await  axios.get(`http://localhost:3001/detalleVenta/ultimoDetalle/${id_sucursal}`).then((response)=>{
      setUltimoDetalle(response.data)
      console.log('ultimo detalle',ultimoDetalle)
    }).catch((error)=>{
      console.log('no se puede traer el ultimo detalle', error)
    })  
  }

  const eliminarUltimaVenta = (Id_producto, CantidadVendida) => {  
         axios.put(`http://localhost:3001/venta/aumentarCantidad`, {
            Id_producto: Id_producto,
            Id_sucursal: id_sucursal,
            cantidad: CantidadVendida
        }).then(() => {
        console.log('esto es idProducto', Id_producto);
        console.log('Esto es cantidad', CantidadVendida);
        alert('Se eliminó todo correctamente');
    })
    .catch((error) => {
        alert(`Error al eliminar la venta o actualizar cantidad: ${error}`);
    });
};

const Id_caja = localStorage.getItem('idCaja')
const id_usuario = localStorage.getItem('idUsuario')

  const traerVentaCorrelativa = async () => {
   await axios.get("http://localhost:3001/ventacorrelativa").then((response) => {
      setId_venta(response.data[0].ultimoIdVenta);
      console.log('y ahora que',Id_venta)
    }).catch((error) => {
      console.log('error en traer id_venta', error)
    })
  };
  


  const RegistrarIngreso = () =>{
    axios.post("http://localhost:3001/Ingreso/post",{
      DescripcionIngreso: descripcionIngreso,
      montoTotalIngreso: montoTotalIngreso,
      Id_sucursal: id_sucursal,
      Id_usuario: id_usuario,
      Id_caja: Id_caja
    }).then(()=>{
      alert('ingreso registrado')
      setShowModal6(false);
    }).catch((error)=>{
      alert('ingreso no registrado')
      console.log(error)
    })

  }
  const RegistrarEngreso = () =>{
    axios.post("http://localhost:3001/Egreso/post",{
      DescripcionEgreso: descripcionEgreso,
      montoTotalEgreso: montoTotalEgreso,
      Id_sucursal: id_sucursal,
      Id_usuario: id_usuario,
      Id_caja: Id_caja
   
    }).then(()=>{
      alert('Egreso registrado')
      setShowModal7(false);
    }).catch((error)=>{
      alert('Egreso no registrado')
      console.log(error)
    })

  }

  const seleccionarCliente = (e) => {
    const clienteId = e.target.value;
    const clienteSeleccionado = verCliente.find(cliente => cliente.Id_cliente.toString() === clienteId);
    if (clienteSeleccionado) {
        setLimiteCredito(clienteSeleccionado.LimiteCredito); 
        setCreditoActual(clienteSeleccionado.montoCredito)
    }
};

  
  const FinalizarVenta = () => {

    
    const Id_metodoPago = parseInt(document.getElementById("metodoPago").value); 
    if (Object.values(cantidadesVendidas).some(cantidad => cantidad > productos.cantidad_producto)) {
      alert('No puedes vender más productos de los que tienes en stock');
      return;
    }
    if( Id_metodoPago === 3 &&   SumarIntereses() > totalConCredito()){
      alert('no se puede vender a este cliente xq deber mucho')
      return;
     }  
    const totalParaTodo = SumarIntereses()
    console.log('aqui1', totalParaTodo)
    axios.post("http://localhost:3001/venta/post", {
  
      descripcion_venta: 'XDD',
      precioTotal_venta: SumarIntereses(),
      Id_metodoPago: document.getElementById("metodoPago").value,
      Id_cliente: document.getElementById("cliente").value,
      Id_sucursal: id_sucursal,
      Id_usuario: id_usuario

    }).then(() => {
      listaCompras.forEach((producto) => {
        axios.post("http://localhost:3001/detalleVenta/post", {
          descripcion_detalleVenta: 'test',
          ventasTotales_detalleVenta: '1',
          ganacia_detalleVenta: 0.0,
          Id_producto: producto.Id_producto,
          Id_venta: parseInt(Id_venta),
          CantidadVendida: cantidadesVendidas[producto.Id_producto],
          Id_caja: IdCaja
        }).then(() => {
          console.log('a ver q pasa',producto.Id_producto)
          console.log('a ver q pasa',Id_venta)
          axios.put("http://localhost:3001/venta/descStock", {
            Id_sucursal: id_sucursal,
            Id_producto: producto.Id_producto,
            cantidad: cantidadesVendidas[producto.Id_producto],
          });
        }).then(() => {   
          if (Id_metodoPago === 3) {           
           axios.put("http://localhost:3001/venta/aumentarCredito", {
              Id_cliente: document.getElementById("cliente").value,
              montoCredito: totalParaTodo,           
            });    
          } 
           else {
            console.log('aqui3', totalParaTodo)
             console.log('error al asignar el crédito')
          }
        }).catch((error) => {
          console.log('Id_venta en el error',Id_venta)
          console.log('casi pero no', error)

        });
      });
      listaCompras.length = 0;
      Swal.fire({
        title: " <strong>Venta exitosa!</strong>",
        html: "<i>La venta <strong> </strong> fue agregada con éxito</i>",
        icon: 'success',
        timer: 3000
      });
      setEstadoModal1(false);
      console.log('Id_venta cuando sale bien',Id_venta)
    }).catch((error) => {
      console.log('Id_venta en el error',Id_venta)
      console.log('error en la venta', error);
    });
  };

  useEffect(() => {
    const manejarKeyDown = (event) => {
      if (event.key === 'F2') {
        setEstadoModal1(true);
      }
      if (event.key === 'Escape') {
        setEstadoModal1(false);
      }
    };
    document.addEventListener('keydown', manejarKeyDown);
    return () => {
      document.removeEventListener('keydown', manejarKeyDown);
    };
  }, [listaCompras]);


  useEffect(() => {
   
    traerUltimoDetalle()
    traerUltimaVenta()
    totalConCredito()
    traerVentaCorrelativa()
    metodoPago();
    verClienteFuncion();
  }, []);

      return (
      <>
      <App/>
      <h1>VENTAS</h1>
      <div className='container-fluid'>
            <div className='row'>
            <div className='col'>
                <ContenedorBotones>
                <Button variant="dark" onClick={() => setEstadoModal1(true)}>
                    <Badge badgeContent={listaCompras.length} color="secondary">
                    F2 PRODUCTOS  <ShoppingCart color="action" />
                    </Badge>
                </Button>
                </ContenedorBotones>
            </div>
            </div>
        </div>
       
    
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>VER DETALLE VENTA</Modal.Title>
            </Modal.Header>

    
            <Modal.Body>
            <h3><b>SUBTOTAL: </b></h3>
              <h4><b>${calcularTotal()}</b></h4>
              <h3><b>TOTAL: </b></h3>
              <h4><b>${SumarIntereses()}</b></h4>

          <label><b>ABONA CON:</b></label>
          <input type="number" onChange={(e) => setVuelto(e.target.value)} />
          <br/>
          <label>Metodo de Pago:</label>
          <select id="metodoPago">
            {verMetodoPago.map(metodo => (
              <option key={metodo.Id_metodoPago} value={metodo.Id_metodoPago}>{metodo.tipo_metodoPago}</option>
            ))}
          </select>
          <br/>
          <label>Intereses</label>
          <input type="number" onChange={(e) => setIntereses(e.target.value)} />
          <br/>
          <label><b>Cliente:</b></label>
          <select id="cliente" onChange={(e)=>{seleccionarCliente(e)}}>
              {verCliente.map(cliente => (
                  <option key={cliente.Id_cliente} value={cliente.Id_cliente}>{cliente.nombre_cliente}</option>
              ))}
          </select><br />
          <h6>Límite de Crédito: {limiteCredito}</h6>
          <h6> Crédito Actual: {creditoActaul}</h6>
          <br/>
          <label><b>CAMBIO:</b> ${cambio()}</label>
        <br/>
          <Button className="btn btn-primary" onClick={FinalizarVenta}>FINALIZAR VENTA</Button><br /><br />



            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleCloseModal}>
                CERRAR
              </Button>
            </Modal.Footer>
          </Modal>


          <Modal show={showModal2} onHide={handleCloseModal2}>
            <Modal.Header closeButton>
              <Modal.Title>ULRIMA VENTA</Modal.Title>
            </Modal.Header>   
            <Modal.Body>
         
            <Table striped bordered hover>
            <thead>
           
              <tr>
                <th scope="col">Id Producto</th>
                <th scope="col">Id venta</th>
                <th scope="col">Cantidad Vendida</th>
              </tr>
            </thead>
            <tbody>
              {ultimoDetalle.map(detalle => (
                <tr key={detalle.Id_detalleVenta}>
                    <td>
                        {detalle.productos && Array.isArray(detalle.productos) && detalle.productos.map((producto) => (
                            <li key={producto.Id_producto}>{producto.Id_producto}</li>
                        ))}
                    </td>
                    <td>{detalle.Id_venta}</td> 
                    <td>
                        {detalle.productos.map((producto) => (
                            <p key={producto.Id_producto}>Cantidad: {parseInt(producto.cantidadVendida)}</p>
                        ))}
                    </td>  
                     <td>{/* eslint-disable react/jsx-key */}
                        {detalle.productos.map((producto) => (
                            <Button className="btn btn-primary" onClick={() => eliminarUltimaVenta(producto.Id_producto, producto.cantidadVendida)}>ELIMINAR VENTA</Button>
                        ))}
                    </td> 
                </tr>            
            ))}

            </tbody>
           
          </Table>
         
         
          
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleCloseModal2}>
                CERRAR
              </Button>
             
            </Modal.Footer>
          </Modal>
    
    
          <Modal show={showModal3} onHide={handleCloseModal3}>
            <Modal.Header closeButton>
              <Modal.Title>GUARDAR VENTA</Modal.Title>
            </Modal.Header>   
            <Modal.Body>
         
            <>
  <Table striped bordered hover>
    <thead>
      <tr>
        <th scope="col">NOMBRE</th>
        <th scope="col">PRECIO</th>
        <th scope="col">TIPO VENTA</th>
            
      </tr>
    </thead>
    <tbody>
      {listaCompras.map(producto => (
        <tr key={producto.Id_producto}>
          <td>{producto.nombre_producto}</td>
          <td>${producto.precioVenta}</td>
          <td>{producto.tipo_venta}</td>
          <td> 
           
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
 
  {listaCompras.length > 0 && (
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => guardarVenta()} 
    >
      Guardar
    </button>
  )}
</>

             
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleCloseModal3}>
                CERRAR
              </Button>
             
            </Modal.Footer>
          </Modal>



          <Table striped bordered hover>
            <thead>
           
              <tr>
                <th scope="col">NOMBRE</th>
                <th scope="col">PRECIO</th>
                <th scope="col">TIPO VENTA</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {listaCompras.map(producto => (
                <>
                <tr key={producto.Id_producto}>
                  <td>{producto.nombre_producto}</td>
                  <td>${producto.precioVenta}</td>
                  <td>{producto.tipo_venta}</td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => eliminarCompra(producto.Id_producto)}
                    >
                      ELIMINAR
                    </button>

                  </td>

                </tr>
                </>
              ))}
             
            </tbody>
          </Table>



          <ModalCarrito
        estado={estadoModal1}
        cambiarEstado={setEstadoModal1}
      >
        <Contenido>
        <br /><br /><br />
              <input value={buscar} onChange={buscador} type="text" placeholder='Busca un producto...' className='form-control' />
            <br />
             <Table striped bordered hover>
              <thead>
                <tr>
     
                  <th>NOMBRE</th>
                  <th>DESCRIPCIÓN</th>
                  <th>PRECIO</th>
                  <th>TIPO VENTA</th>
                  <th>CANTIDAD</th>
                  <th>VENDER</th>
                </tr>
              </thead>
              <tbody>
                {buscar.length > 0 ?(
                    resultado.map((producto, index) => (
                        <tr key={index}>
                        
                        <td>{producto.nombre_producto}</td>
                        <td>{producto.descripcion_producto}</td>
                        <td>${producto.precioVenta}</td>
                        <td>{producto.tipo_venta}</td>
                        <td>
                            <input type="number" value={cantidadesVendidas[producto.Id_producto]} onChange={(e) => setCantidadesVendidas({...cantidadesVendidas, [producto.Id_producto]: e.target.value})} />
                        </td>
                        <td>
                            <Button className="btn btn-primary" onClick={() => handleAgregar(producto)}>Vender</Button>
                        </td>
                        </tr>
                    ))
                ) :  (
                    <tr>
                      <td colSpan="5" className="text-center">Por favor, comience a buscar para ver los resultados</td>
                    </tr>
                  )}
              
              </tbody>
            </Table>
        </Contenido>
      </ModalCarrito>


      <Modal show={showModal4} onHide={handleCloseModal4}>
            <Modal.Header closeButton>
              <Modal.Title> VENTA GUARDADA</Modal.Title>
            </Modal.Header>   
            <Modal.Body>
         
            <>
  <Table striped bordered hover>
          <thead>
                <tr>
                  <th scope="col">NOMBRE</th>
                  <th scope="col">PRECIO</th>
                  <th scope="col">TIPO VENTA</th>
                  <th scope="col">CONTINUAR CON LA VENTA</th>
                </tr>
              </thead>
              <tbody>
                {listaVentas.map((venta, index) => (
                  venta.productos.map((productoVendido, i) => (
                    <tr key={`${index}-${i}`}>
                      <td>{productoVendido.nombre_producto}</td>
                      <td>${productoVendido.precioVenta}</td>
                      <td>{productoVendido.tipo_venta}</td>
                      <td>
                        <Button onClick={() => handleAgregar(productoVendido)}>CONTINUAR CON LA VENTA</Button>
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
  </Table>
</>


             
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleCloseModal4}>
                CERRAR
              </Button>
             
            </Modal.Footer>
          </Modal>






          <Modal show={showModal5} onHide={handleCloseModal5}>
            <Modal.Header closeButton>
              <Modal.Title>INGRESOS Y EGRESOS </Modal.Title>
            </Modal.Header>   
            <Modal.Body >    
                <Button className='btn btn-success m-2' onClick={handleShowModal6}>REGISTRAR INGRESO</Button>
                <Button className='btn btn-danger m-2' onClick={handleShowModal7}>REGISTRA EGRESO </Button>         
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleCloseModal5}>
                CERRAR
              </Button>
             
            </Modal.Footer>
          </Modal>
          <Modal show={showModal6} onHide={handleCloseModal6}>
            <Modal.Header closeButton>
              <Modal.Title >REGISTRAR INGRESO</Modal.Title>
            </Modal.Header>   
            <Modal.Body>       
              <MDBInputGroup textBefore="📋" className="mb-3">
                <input className="form-control" type="text" placeholder="Ingrese el motivo" value={descripcionIngreso} onChange={(e) => setDescripcionIgreso(e.target.value)} />
              </MDBInputGroup>
              <MDBInputGroup textBefore="💲" className="mb-3">
                <input className="form-control" type="number" placeholder="Ingrese el monto total" value={montoTotalIngreso} onChange={(e) => setMontoTotalIngreso(e.target.value)} />
              </MDBInputGroup>


              <Button className='btn btn-success m-2' onClick={RegistrarIngreso}>REGISTRAR </Button>   
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleCloseModal6}>
                CERRAR
              </Button>
             
            </Modal.Footer>
          </Modal>
          <Modal show={showModal7} onHide={handleCloseModal7}>
            <Modal.Header closeButton>
              <Modal.Title>REGISTRA EGRESO </Modal.Title>
            </Modal.Header>   
            <Modal.Body>    

            <MDBInputGroup textBefore="📋" className="mb-3">
                <input className="form-control" type="text" placeholder="Ingrese el motivo" value={descripcionEgreso} onChange={(e) => setDescripcionEgreso(e.target.value)} />
            </MDBInputGroup>
            <MDBInputGroup textBefore="💲" className="mb-3">
                <input className="form-control" type="number" placeholder="Ingrese el monto total" value={montoTotalEgreso} onChange={(e) => setMontoTotalEgreso(e.target.value)} />
            </MDBInputGroup>

            <Button className='btn btn-success m-2' onClick={RegistrarEngreso}>REGISTRAR </Button> 
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleCloseModal7}>
                CERRAR
              </Button>
             
            </Modal.Footer>
          </Modal>



      <Button onClick={handleShowModal} className='btn btn-success'>MOSTRAR TOTAL</Button><br /><br />
      <Button onClick={handleShowModal2}className='btn btn-danger'>ELIMINAR ULTIMA VENTA</Button>---
      <Button onClick={handleShowModal3}className='btn btn-light'>GUARDAR VENTA</Button>---
      <Button onClick={handleShowModal4}className='btn btn-info'>VENTAS GUARDADAS</Button> --- 
      <Button onClick={handleShowModal5}>REGISTRAR MOVIMIENTOS</Button>
    
      </>
      )
    }

export default TestVenta



const ContenedorBotones = styled.div`
padding: 10px;
display: flex;
flex-wrap: wrap;
justify-content: center;
gap: 30px;
`;

const Contenido = styled.div`
display: flex;
flex-direction: column;

h2 {
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 10px;
}
p {
  font-size: 20px;
  margin-bottom: 20px;
}
label {
  font-size: 30px;
  margin-top: 40px;
  margin-right: 50px;
}
`;
