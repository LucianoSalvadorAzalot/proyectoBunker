import  { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import { DataContext } from '../context/DataContext';
import { CarritoContext } from '../context/CarritoContext';
import App from '../App.jsx';
import styled from "styled-components";
import { ShoppingCart } from "@mui/icons-material";
import Badge from '@mui/material/Badge';
import ModalCarrito from './ModalCarrito';
import Swal from 'sweetalert2'
import {
  MDBInputGroup,
} from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';

const Compras = () => {


  const [ver, setVer] = useState([]);
  const [nombre_producto, setnombre_Producto] = useState('');
  const [descripcion_producto, setdescripcion_Producto] = useState('');
  const [cantidad_producto, setcantidad_Producto] = useState('');
  const [Id_categoria, setId_categoria] = useState('');
  const [buscar, setBuscar] = useState("");
  const [estadoModal1, setEstadoModal1] = useState(false);
  const [verProvedores, setVerProveedores] = useState([])
  const [Id_compra, setId_compra] = useState("")
  const [precioCompra, setPrecioCompra] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [tipo_venta, setTipoVenta] = useState('unidad');
  const [cantidadComprada, setCantidadComprada] = useState(0)


  const { productos } = useContext(DataContext);
  const { listaCompras, eliminarCompra, agregarCompra } = useContext(CarritoContext);


  
  
  const calcularTotal = () => {
    return listaCompras.reduce((total, item) => total + item.precioCompra * cantidadComprada, 0);
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

  const verProductos = () => {
    axios.get("http://localhost:3001/productos")
        .then((response) => {
            setVer(response.data);
        })
        .catch((error) => {
            console.log('Error al obtener los productos:', error);
        });
};


  const crearProductos = () => {
    axios.post("http://localhost:3001/productos/post", 
    {        
        nombre_producto: nombre_producto,
        descripcion_producto: descripcion_producto,
        precioCompra: parseFloat(precioCompra),
        precioVenta: parseFloat(precioVenta),
        cantidad_producto: parseFloat(cantidad_producto),
        Id_categoria: Id_categoria,
        tipo_venta: tipo_venta
    })
    .then(() => {
        verProductos();
    })
    .catch(() => {
        console.log('Error al crear el producto:');
    });
};
const verProveedores =  ()  => {
   axios.get("http://localhost:3001/proveedores").then((response)=>{
    setVerProveedores(response.data)
  })
}

const compraCorrelativa = async () =>{
  await axios.get("http://localhost:3001/compra/correlativa").then((response)=>{
      setId_compra(response.data[0].ultimacompra)
  }).catch((error)=>{
    console.log('error en traer ultima compra', error)
  })
}
console.log(Id_compra)

useEffect(()=>{
  compraCorrelativa()
},[])


const FinalizarCompra = () => {
  const id_sucursal = localStorage.getItem('sucursalId');
  
  axios.post("http://localhost:3001/compra/post", {
    descripcion_compra: 'test',
    Id_proveedor: document.getElementById('proveedor').value,
    total_compra: calcularTotal(),
    Id_sucursal: id_sucursal
  }).then(() => {

    listaCompras.forEach((productos) => {
      axios.post("http://localhost:3001/detalleCompra/post", {
        descripcion_Detallecompra: 'test detallecompra',
        Id_producto: productos.Id_producto,
        Id_compra: parseInt(Id_compra)
      }).then(() => {
       axios.put("http://localhost:3001/compra/aumentarStock",{
        Id_producto: productos.Id_producto,
        cantidad_producto: cantidadComprada
       })
      }).then(()=>{
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





useEffect(() => {
  verProductos();
  verProveedores()
}, []);




return (
  <>
  <App/>
  
       <br></br> 
    <div className='container-fluid'>
      <div className='row'>
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
    <br />
    <div className="container-fluid">
    <h3>AGREGAR NUEVO PRODUCTO</h3> 
    <MDBInputGroup textBefore='📋'   className='mb-3'>
            <input className='form-control' type='text' placeholder="Nombre"  value={nombre_producto} onChange={(e) => setnombre_Producto(e.target.value)}/>
          </MDBInputGroup>

          <MDBInputGroup textBefore='📋' className='mb-3' >
            <input className='form-control' type='text' placeholder="Descripcion" value={descripcion_producto} onChange={(e) => setdescripcion_Producto(e.target.value)} />
          </MDBInputGroup>

          <MDBInputGroup textBefore='💲' className='mb-3' >
            <input className='form-control' type='number' placeholder="Precio costo" value={precioCompra} onChange={(e) => setPrecioCompra(e.target.value)} />
          </MDBInputGroup>
          
          <MDBInputGroup textBefore='💲'  className='mb-3' >
            <input className='form-control' type='email' placeholder="Precio venta" value={precioVenta} onChange={(e) => setPrecioVenta(e.target.value)}/>
          </MDBInputGroup>
      
         <h3> Tipo de venta:</h3> <Form.Select aria-label="Tipo de venta"  value={tipo_venta} onChange={(e) => setTipoVenta(e.target.value)} >
                <option value="unidad">Unidad</option>
                <option value="granel">Granel gr</option>
            </Form.Select>


        <br />
          <MDBInputGroup textBefore='➕' className='mb-3' >
            <input className='form-control' type='text' placeholder="Cantidad" value={cantidad_producto} onChange={(e) => setcantidad_Producto(e.target.value)}/>
          </MDBInputGroup>

          <MDBInputGroup  textBefore='🛒' className='mb-3' >
            <input className='form-control' type='text' placeholder="Departamento" value={Id_categoria} onChange={(e) => setId_categoria(e.target.value)} />
          </MDBInputGroup>
                

          <Button className="btn btn-success" onClick={crearProductos}>Guardar Producto</Button>
            
            
            
        </div>
             <br></br> 
      <div className="container-fluid">
        <h3>Elegir producto existente</h3>
        <div className='col'>    
          <input value={buscar} onChange={buscador} type="text" placeholder='Busca un producto...' className='form-control'/>
        </div> <br />
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
                  <th>COMPRAR </th>
              </tr>
              </thead>
              <tbody>
                {resultado.map((producto, index) => (
                  <tr key={index}>
                    <td>{producto.Id_producto}</td>
                    <td>{producto.nombre_producto }</td>
                    <td>{producto.precioCompra }</td>
                    <td>{producto.tipo_venta === 'granel' ? parseFloat(producto.cantidad_producto).toFixed(2) : producto.cantidad_producto}</td>
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
                                 <input type='number' onChange={(e)=> setCantidadComprada(e.target.value)}/>
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
                      <td><b>${calcularTotal()}</b></td>
                      <hr />      
                  </tbody>
              </table>
                <label>
                 Proveedores:
                </label>      
                <select id="proveedor">
                  {verProvedores.map((proveedor) => (
                    <option key={proveedor.Id_proveedor} value={proveedor.Id_proveedor}>{proveedor.nombre_proveedor}</option>
                  ))}     
                </select> 
                    
              <label >
                  <b>Total: ${calcularTotal()}</b>                 
              </label>
              <Button  className="btn btn-primary" onClick={FinalizarCompra}> FINALIZAR Compra </Button>
        </Contenido>
      </ModalCarrito>
    </>
);
}

export default Compras


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