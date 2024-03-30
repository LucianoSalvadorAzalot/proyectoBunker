import React, { useContext, useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import { DataContext } from '../context/DataContext';
import { CarritoContext } from '../context/CarritoContext';
import styled from "styled-components";
import ModalCarrito from './ModalCarrito';
import App from '../App';
import { ShoppingCart } from "@mui/icons-material";
import Badge from '@mui/material/Badge';
import axios from 'axios';
import Swal from 'sweetalert2';

const Venta = () => {

  const [vuelto, setVuelto] = useState(0);
  const [vueltoADar, setVueltoADar] = useState(0);
  const [estadoModal1, setEstadoModal1] = useState(false);
  const [buscar, setBuscar] = useState("");
  const [Id_venta, setId_venta] = useState();
  const [verCliente, setVerCliente] = useState([])
  const [verMetodoPago, setVerMetodoPago] = useState([])
  const [intereses, setIntereses] = useState(0)
  const [cantidadesVendidas, setCantidadesVendidas] = useState({});

  const { listaCompras, eliminarCompra, agregarCompra } = useContext(CarritoContext);
  const { productos } = useContext(DataContext);

  const calcularTotal = () => {
    return listaCompras.reduce((total, item) => total + item.precioVenta * cantidadesVendidas[item.Id_producto], 0);
  };

  const SumarIntereses = () => {
    return calcularTotal() + (calcularTotal() * intereses) / 100
  };

  const handleAgregar = (compra) => {
    agregarCompra(compra);
  };

  const buscador = (e) => {
    setBuscar(e.target.value);
  };


  

  useEffect(() => {
    const initialCantidadesVendidas = {};
    listaCompras.forEach(producto => {
      initialCantidadesVendidas[producto.Id_producto] =  producto.cantidadVendida;
    });
    setCantidadesVendidas(initialCantidadesVendidas);
  }, [listaCompras]);

  const verClienteFuncion = () => {
    axios.get("http://localhost:3001/cliente").then((response) => {
      setVerCliente(response.data)
    }).catch((error) => {
      console.log(error)
    })
  };

  const traerVentaCorrelativa = async () => {
    await axios.get("http://localhost:3001/ventacorrelativa").then((response) => {
      setId_venta(response.data[0].ultimopedido);
    }).catch((error) => {
      console.log('error en traer id_venta', error)
    })
  };

  useEffect(() => {
    traerVentaCorrelativa()
  }, []);

  const FinalizarVenta = () => {
    const id_sucursal = localStorage.getItem('sucursalId');
    const id_usuario = localStorage.getItem('idUsuario')
    if (Object.values(cantidadesVendidas).some(cantidad => cantidad > productos.cantidad_producto)) {
      alert('No puedes vender más productos de los que tienes en stock');
      return;
    }

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
          CantidadVendida: cantidadesVendidas[producto.Id_producto]
        }).then(() => {
          axios.put("http://localhost:3001/venta/descStock", {
            Id_producto: producto.Id_producto,
            cantidad_producto: cantidadesVendidas[producto.Id_producto]
          });
        }).then(() => {
          const Id_metodoPago = parseInt(document.getElementById("metodoPago").value);
          if (Id_metodoPago === 3) {
            axios.put("http://localhost:3001/venta/aumentarCredito", {
              Id_cliente: document.getElementById("cliente").value,
              montoCredito: calcularTotal()
            });
          } else {
            console.log('error al asignar el crédito')
          }
        }).catch((error) => {
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
    }).catch((error) => {
      console.log('error en la venta', error);
    });
  };

  const metodoPago = () => {
    axios.get("http://localhost:3001/metodopago").then(response => {
      setVerMetodoPago(response.data);
    }).catch((error) => {
      console.log("error al obtener los métodos de pago", error);
    })
  };

  const cambio = () => {
    const total = SumarIntereses()
    return vuelto - total
  };

  useEffect(() => {
    setVueltoADar(vuelto - SumarIntereses());
  }, [vuelto, listaCompras, intereses]);

  useEffect(() => {
    const manejarKeyDown = (event) => {
      if (event.key === 'F2') {
        setEstadoModal1(true);
      }
      if (event.key === 'Escape') {
        setEstadoModal1(false);
        listaCompras.length = 0;
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
      <App />
      <br />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>
            <ContenedorBotones>
              <Button variant="danger" onClick={() => setEstadoModal1(true)}>
                <Badge badgeContent={listaCompras.length} color="secondary">
                  F2 <ShoppingCart color="action" />
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
            <h3>PRODUCTOS</h3>

            <br /><br />
            <div className='col'>
              <input value={buscar} onChange={buscador} type="text" placeholder='Busca un producto...' className='form-control' />
            </div>
            <br /><br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NOMBRE</th>
                  <th>PRECIO</th>
                  <th>TIPO VENTA</th>
                  <th>CANTIDAD</th>
                  <th>DESCRIPCIÓN</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto, index) => (
                  <tr key={index}>
                    <td>{producto.Id_producto}</td>
                    <td>{producto.nombre_producto}</td>
                    <td>${producto.precioVenta}</td>
                    <td>{producto.tipo_venta}</td>
                    <td>{producto.tipo_venta === 'granel' ? parseFloat(producto.cantidad_producto).toFixed(2) : producto.cantidad_producto}</td>
                    <td>{producto.descripcion_producto}</td>
                    <td>
                      <Button className="btn btn-primary" onClick={() => handleAgregar(producto)}>Vender</Button>
                    </td>
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
              {listaCompras.map(producto => (
                <tr key={producto.Id_producto}>
                  <td>{producto.nombre_producto}</td>
                  <td>${producto.precioVenta}</td>
                  <td>
                    <input type="number" value={cantidadesVendidas[producto.Id_producto]} onChange={(e) => setCantidadesVendidas({...cantidadesVendidas, [producto.Id_producto]: e.target.value})} />
                  </td>
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
              ))}
              <hr />
              <th><b>SUBTOTAL: </b></th>
              <td><b>${calcularTotal()}</b></td>
              <th><b>TOTAL: </b></th>
              <td><b>${SumarIntereses()}</b></td>
              <hr />
            </tbody>
          </table>

          <label><b>ABONA CON:</b></label>
          <input type="number" onChange={(e) => setVuelto(e.target.value)} />

          <label>Metodo de Pago:</label>
          <select id="metodoPago">
            {verMetodoPago.map(metodo => (
              <option key={metodo.Id_metodoPago} value={metodo.Id_metodoPago}>{metodo.tipo_metodoPago}</option>
            ))}
          </select>

          <label>Intereses</label>
          <input type="number" onChange={(e) => setIntereses(e.target.value)} />

          <label><b>Cliente:</b></label>
          <select id="cliente">
            {verCliente.map(cliente => (
              <option key={cliente.Id_cliente} value={cliente.Id_cliente}>{cliente.nombre_cliente}</option>
            ))}
          </select>

        <label><b>CAMBIO:</b> ${cambio()}</label> 

          <Button className="btn btn-primary" onClick={FinalizarVenta}>FINALIZAR VENTA</Button>

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
