import  { useContext, useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import { DataContext } from '../context/DataContext';
import { CarritoContext } from '../context/CarritoContext';
import styled from "styled-components";
import ModalCarrito from './ModalCarrito';
import App from '../App';
import { ShoppingCart } from "@mui/icons-material";
import Badge from '@mui/material/Badge';
import axios from 'axios';
import Swal from 'sweetalert2'

const Venta = () => {


  const [vuelto, setVuelto] = useState(0);
  const [vueltoADar, setVueltoADar] = useState(0);
  const [estadoModal1, setEstadoModal1] = useState(false);
  const [buscar, setBuscar] = useState("");
  const [Id_venta, setId_venta] = useState();
  const [verCliente, setVerCliente] = useState ([])


   //METODO-PAGO
   const [verMetodoPago, setVerMetodoPago] = useState([])



  const { productos } = useContext(DataContext);
  const { listaCompras, aumentarCantidad, disminuirCantidad, eliminarCompra, agregarCompra } = useContext(CarritoContext);
  const calcularTotal = () => {
    return listaCompras.reduce((total, item) => total + item.precio_producto * item.cantidad_producto, 0);
  };
  const handleAgregar = (compra) => {
    agregarCompra(compra);
  };


  const buscador = (e) => {
    setBuscar(e.target.value);
  };

  let resultado = [];
  if (!buscar) {
    resultado = productos;
  } else {
    resultado = productos.filter((dato) =>
      dato.nombre_producto.toLowerCase().includes(buscar.toLowerCase())
    );
  }
  

  const verClienteFuncion = () =>{
    axios.get("http://localhost:3001/cliente").then((response)=>{
      setVerCliente(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  }

  const traerVentaCorrelativa = async () => {
    try {
      const response = await axios.get("http://localhost:3001/ventacorrelativa");
      const ventaCorrelativa = response.data[0].ultimopedido;
      setId_venta(ventaCorrelativa);
      
      if (ventaCorrelativa) {
        FinalizarVenta(ventaCorrelativa);
      }
    } catch (error) {
      console.log(error);
    }
  };



  useEffect (()=> {
    traerVentaCorrelativa()
  },[])



  const FinalizarVenta = () => {
    axios.post("http://localhost:3001/venta/post", {
      descripcion_venta: 'XDD',
      precioTotal_venta: calcularTotal(),
      Id_metodoPago: document.getElementById("metodoPago").value,
      Id_cliente: document.getElementById("cliente").value
    })
    .then(() => {
      listaCompras.forEach((productos) => {
        axios.post("http://localhost:3001/detalleVenta/post", {
      
          descripcion_detalleVenta: 'test',
          ventasTotales_detalleVenta: '1',
          ganacia_detalleVenta: 0.0,
          Id_producto: productos.Id_producto,
          Id_venta: parseInt(Id_venta)
        })
        .then(() => {
          listaCompras.length = 0;
          Swal.fire({
            title: " <strong>Venta exitosa!</strong>",
            html: "<i>La venta <strong> </strong> fue agregada con éxito</i>",
            icon: 'success',
            timer: 3000
          });
          setEstadoModal1(false);
        
        })
        .catch((error) => {
          console.log('error en el detalle de venta', error);
        });
      });
    })
    .catch((error) => {
      console.log('casi pero no ', error);
    });
  };
  


  
const metodoPago = () =>{
  axios.get("http://localhost:3001/metodopago")
  .then(response=>
    {console.log(response)
      setVerMetodoPago(response.data)
    })
    .catch((error) =>{
      console.log("error al obtnere la tarasquita",error);
    })
}





const cambio = () =>{
  const total = calcularTotal()
  return  vuelto - total
 }


  useEffect(() => {
    setVueltoADar(vuelto - calcularTotal());
  }, [vuelto, listaCompras]);


 
  useEffect(() => {
    const manejarKeyDown = (event) => {
      if (event.key === 'F2') {
        setEstadoModal1(true);    
      }      
      if (event.key === 'Escape') {
        setEstadoModal1(false);
        listaCompras.length= 0;
      }
    };
    document.addEventListener('keydown', manejarKeyDown);
    return () => {
      document.removeEventListener('keydown', manejarKeyDown);
    };
  }, [listaCompras]);


  useEffect(() => {
    metodoPago();
    verClienteFuncion();
  }, []);
 
  return (
    <>
 
    <App/>
    <br></br> 
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>    
          <input value={buscar} onChange={buscador} type="text" placeholder='Busca un producto...' className='form-control'/>
        </div>
        <div className='col'>    
                         <ContenedorBotones  >

                          <Button variant="danger"  onClick={() => setEstadoModal1(true)}>
                            <Badge badgeContent={listaCompras.length} color="secondary">
                             F2
                         <ShoppingCart color="action" />                                    
                            </Badge>
                          </Button>
                        </ContenedorBotones>   
        </div>
      </div>
    </div>
    <br /><br /><br />
      <div className="container-fluid"> 
        <div className="row">     
          <div className="col">  
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NOMBRE PRODUCTO</th>
                  <th>PRECIO PRODUCTO</th>
                  <th>CANTIDAD PRODUCTO</th>
                  <th>DESCRIPCION PRODUCTO</th>
                </tr>
              </thead>
              <tbody>
                {resultado.map((producto, index) => (
                  <tr key={index}>
                    <td>{producto.Id_producto}</td>
                    <td>{producto.nombre_producto }</td>
                    <td>{producto.precio_producto }</td>
                    <td>{producto.cantidad_producto}</td>
                    <td>{producto.descripcion_producto}</td>
                    <td><Button  className="btn btn-primary" onClick={() => handleAgregar(producto)}> Comprar </Button></td>
               
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <ModalCarrito
        estado={estadoModal1}
        cambiarEstado={setEstadoModal1}
      >
        <Contenido>
          <table>
                  <thead>
                      <br /><br /><br />
                      <tr>
                          <th scope="col">NOMBRE</th>
                          <th scope="col">PRECIO</th>
                          <th scope="col">CANTIDAD</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                          listaCompras.map(productos => (
                              <tr key={productos.Id_producto}>
                                  <td>{productos.nombre_producto}</td>
                                  <td>{productos.precio_producto}</td>
                                  <td>
                                      <button 
                                      className="btn btn-ouline-primary" 
                                      onClick={ () => disminuirCantidad(productos.Id_producto)}
                                      >-</button>
                                      <button className="btn btn-primary">{productos.cantidad_producto}</button>
                                      <button 
                                      className="btn btn-ouline-primary" 
                                      onClick={ () => aumentarCantidad(productos.Id_producto)}
                                      >+</button>
                                  </td>
                                  <td><button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={()=>eliminarCompra(productos.Id_producto)}
                                  >ELIMINAR
                                  </button>
                                  </td>
                              </tr>
                          ))
                      }
                     
                      <hr />
                      <th><b>TOTAL: </b></th>
                      {/* <td></td>
                      <td></td> */}
                      <td><b>${calcularTotal()}</b></td>
                      <hr />      
                  </tbody>
              </table>
              
              <label>
                <b>ABONA CON:</b>
                <input
                  type="number"
                  onChange={(e) => setVuelto(e.target.value)}
                />
              </label>     
                <label>
                  Metodo de Pago:
                </label>      
                <select id="metodoPago">
                  {verMetodoPago.map((metodo) => (
                    <option key={metodo.Id_metodoPago} value={metodo.Id_metodoPago}>{metodo.tipo_metodoPago}</option>
                  ))}     
                </select>
                <label>
                 Cliente:
                </label>      
                <select id="cliente">
                  {verCliente.map((cliente) => (
                    <option key={cliente.Id_cliente} value={cliente.Id_cliente}>{cliente.nombre_cliente}</option>
                  ))}     
                </select>
                    
              <label value={cambio()}>
                  <b>CAMBIO: ${vueltoADar}</b>                 
              </label>
              <Button  className="btn btn-primary" onClick={FinalizarVenta}> FINALIZAR VENTA </Button>
        </Contenido>
      </ModalCarrito>
    </>
  );
};

export default Venta;

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