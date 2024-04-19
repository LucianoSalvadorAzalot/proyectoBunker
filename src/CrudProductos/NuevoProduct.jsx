import  { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import { MDBInputGroup } from 'mdb-react-ui-kit';
import { DataContext } from '../context/DataContext.jsx';
import Productos from '../components/Productos.jsx'

const NuevoProduct = ({ filename, sheetname }) => {
    const { sucursales } = useContext(DataContext);

    const [ver, setVer] = useState([]);
    const [nombre_producto, setNombre_Producto] = useState('');
    const [descripcion_producto, setDescripcion_Producto] = useState('');
    const [precioCompra, setPrecioCompra] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    const [cantidad_producto, setCantidad_Producto] = useState('');
    const [Id_categoria, setId_categoria] = useState('');
    const [tipo_venta, setTipoVenta] = useState('unidad');
    const [categorias, setCategorias] = useState([]);
    const [Id_producto, setId_producto] = useState('');
    const [Id_sucursal, setId_sucursal] = useState('');
    const [stock,setStock] = useState([])
    const [stockPlata, setStockPlata] = useState([])

    const {productos} = useContext(DataContext)

      
  const[buscar,setBuscar] = useState();
  const buscador = (e) => {
    setBuscar(e.target.value)
  }

  let resultado = []
  if (!buscar) {
    resultado = stock
  } else {
    resultado = stock.filter((dato) =>
      dato.nombre_producto.toLowerCase().includes(buscar.toLowerCase())
    )
  }



    // useEffect(() => {
    //     axios.get('http://localhost:3001/productos/')
    //         .then((response) => {
    //             setVer(response.data);
    //         })
    //         .catch((error) => {
    //             console.log('Error al obtener los productos:', error);
    //         });
    // }, [ver]);

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(ver);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheetname);
        XLSX.writeFile(wb, `${filename}.xlsx`);
    };

    const crearProductos = () => {
        axios.post('http://localhost:3001/productos/post', {
            nombre_producto,
            descripcion_producto,
            precioCompra: parseFloat(precioCompra),
            precioVenta: parseFloat(precioVenta),
            Id_categoria: document.getElementById('categoria').value,
            tipo_venta,
        })
        .then(() => {
            alert('Producto creado con éxito');
        })
        .catch((error) => {
            console.log('Error al crear el producto:', error);
        });
    };

    const crearStock = () => {
        axios.post('http://localhost:3001/stock/post', {
            cantidad: cantidad_producto,
            Id_sucursal: document.getElementById('suc').value,
            Id_producto: Id_producto
        })
        .then(() => {
            alert('Stock creado con éxito');
        })
        .catch((error) => {
            console.log('Error al crear el stock:', error);
        });
    };

    const verStock = () =>{
        axios.get("http://localhost:3001/stock").then((response)=>{
            setStock(response.data)
        }).catch((error)=>{
            console.log('casi pero no' , error)
        })
    }
    

    const verCategorias = () => {
        axios.get('http://localhost:3001/categorias')
            .then((response) => {
                setCategorias(response.data);
            })
            .catch((error) => {
                console.log('Error al obtener las categorías:', error);
            });
    };

    const verStockEnPlata = () =>{
        axios.get("http://localhost:3001/productos/verPlataStock").then((response)=>{
            setStockPlata(response.data)
        })
    }

    useEffect(() => {
        verStockEnPlata()
        verCategorias();
        verStock()
    }, []);

    return (
        <>

            <Productos /><br /><br />
        {stockPlata.map((val)=>(
            <h4 key={val.precioCompra}><strong>Cantidad de productos:{val.cantidad_productos}</strong>/ <strong>Valor del stock:$ {parseFloat(val.total_valor)}</strong> </h4>
           
        ))}

            <div className="container-fluid">
                <MDBInputGroup textBefore="📋" className="mb-3">
                    <input className="form-control" type="text" placeholder="Nombre" value={nombre_producto} onChange={(e) => setNombre_Producto(e.target.value)} />
                </MDBInputGroup>
                <MDBInputGroup textBefore="📋" className="mb-3">
                    <input className="form-control" type="text" placeholder="Descripcion" value={descripcion_producto} onChange={(e) => setDescripcion_Producto(e.target.value)} />
                </MDBInputGroup>
                <MDBInputGroup textBefore="💲" className="mb-3">
                    <input className="form-control" type="number" placeholder="Precio costo" value={precioCompra} onChange={(e) => setPrecioCompra(e.target.value)} />
                </MDBInputGroup>
                <MDBInputGroup textBefore="💲" className="mb-3">
                    <input className="form-control" type="email" placeholder="Precio venta" value={precioVenta} onChange={(e) => setPrecioVenta(e.target.value)} />
                </MDBInputGroup>
                <h3> Tipo de venta:</h3>
                <Form.Select aria-label="Tipo de venta" value={tipo_venta} onChange={(e) => setTipoVenta(e.target.value)}>
                    <option value="unidad">Unidad</option>
                    <option value="granel (kg)">Granel Kg</option>
                </Form.Select>
                <br />
                <h3> Categoria producto:</h3>
                <Form.Select key={Id_categoria} aria-label="Nombre Categoria" id="categoria">
                    {categorias.map((cat) => (
                        <option key={cat.Id_categoria} value={cat.Id_categoria}>{cat.nombre_categoria}</option>
                    ))}
                </Form.Select>
                <br />
                <div className="row">
                    <div className="col">
                        <Button className="btn btn-success" onClick={crearProductos}>Guardar Producto</Button>
                    </div>
                </div>
            </div>
        <br />
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <MDBInputGroup textBefore="📋" className="mb-3">
                            <input className="form-control" type="number" placeholder="Cantidad" value={cantidad_producto} onChange={(e) => setCantidad_Producto(e.target.value)} />
                        </MDBInputGroup>
                        <MDBInputGroup textBefore="📋" className="mb-3">
                            <input className="form-control" type="number" placeholder="Id PRODUCTO" value={Id_producto} onChange={(e) => setId_producto(e.target.value)} />
                        </MDBInputGroup>
                        <h3>Sucursal:</h3>
                        <Form.Select key={Id_sucursal} aria-label="Nombre Categoria" id="suc" value={Id_sucursal} onChange={(e) => setId_sucursal(e.target.value)}>
                            {sucursales.map((suc) => (
                                <option key={suc.Id_sucursal} value={suc.Id_sucursal}>{suc.Id_sucursal}</option>
                            ))}
                        </Form.Select>
                        <br />
                        <div className="row">
                            <div className="col">
                                <Button className="btn btn-success" onClick={crearStock}>Guardar Stock</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <table className="table table-striped table-hover mt-5 shadow-lg">
                <thead>
                    <tr className="table-info">
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Precio costo</th>
                        <th>Precio venta</th>
                        <th>Tipo venta</th>
                        <th>Departamento</th>
                        <th>Fecha de creacion</th>
                        <th>Ganancia</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((val) => (
                        <tr key={val.Id_producto}>
                            <td>{val.Id_producto}</td>
                            <td>{val.nombre_producto}</td>
                            <td>{val.descripcion_producto}</td>
                            <td>{val.precioCompra}</td>
                            <td>{val.precioVenta}</td>
                            <td>{val.tipo_venta}</td>
                            <td>{val.nombre_categoria}</td>
                            <td>{new Date(val.fecha_registro).toISOString().slice(0, 10)}</td>
                            <td>${parseFloat(val.precioVenta - val.precioCompra)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
<hr />

            <h2 style={{marginTop: '60px'}}>STOCK DE PRODUCTOS</h2>
            <input value={buscar} onChange={buscador} type="text" placeholder='Busca un producto...' className='form-control'/>
            <table className="table table-striped table-hover mt-5 shadow-lg">
                <thead>
                    <tr className="table-info">
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Tipo venta</th>
                        <th>Cantidad </th>
                        <th>Sucursal</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {resultado.map((val) => (
                        <tr key={val.Id_stock}>
                            <td>{val.Id_producto}</td>
                            <td>{val.nombre_producto}</td>
                            <td>{val.descripcion_producto}</td>
                            <td>{val.tipo_venta}</td>
                            <td>{val.tipo_venta === 'granel' ? parseFloat(val.cantidad).toFixed(2) : val.cantidad}</td>
                            <td>{val.nombre_sucursal}</td>
                        </tr>

                    ))}
                </tbody>
            </table>
            <button onClick={exportToExcel}>Exportar a Excel</button>
        </>
    );
};

export default NuevoProduct;
