import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Productos from '../components/Productos.jsx';
import * as XLSX from 'xlsx';
import {
    MDBInputGroup,
  } from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';


const NuevoProduct = ({ filename, sheetname }) => {
    const [ver, setVer] = useState([]);
    const [nombre_producto, setNombre_Producto] = useState('');
    const [descripcion_producto, setDescripcion_Producto] = useState('');
    const [precioCompra, setPrecioCompra] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    const [cantidad_producto, setCantidad_Producto] = useState('');
    const [Id_categoria, setId_categoria] = useState('');
    const [tipo_venta, setTipoVenta] = useState('unidad');
    const [categorias, setCategorias] = useState([]);



    useEffect(() => {
        axios.get(`http://localhost:3001/productos/`)
            .then((response) => {
                setVer(response.data);
            })
            .catch((error) => {
                console.log('Error al obtener los productos:', error);
            });
    }, [ver]);

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(ver);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheetname);
        XLSX.writeFile(wb, `${filename}.xlsx`);
    };

    const crearProductos = () => {

        axios.post("http://localhost:3001/productos/post",
            {
                nombre_producto: nombre_producto,
                descripcion_producto: descripcion_producto,
                precioCompra: parseFloat(precioCompra),
                precioVenta: parseFloat(precioVenta),
                cantidad_producto: parseFloat(cantidad_producto),
                Id_categoria: document.getElementById("categoria").value,
                tipo_venta: tipo_venta, 
            })
            .then(() => {
                alert('producto creado con éxito');
               console.log(typeof(precioCompra)) 
               console.log(typeof(precioVenta)) 
               console.log(typeof(cantidad_producto)) 

            })
            .catch((error) => {
                console.log('Error al crear el producto:',error);
            });
    };




    const verCategorias = () =>{
        axios.get("http://localhost:3001/categorias").then((response)=>{
            setCategorias(response.data)
        })

    }

    useEffect(()=>{
        verCategorias()
    },[])

    return (
        <>
            <Productos /><br /><br />
    

            <div className="container-fluid">
            <MDBInputGroup textBefore='📋'   className='mb-3'>
            <input className='form-control' type='text' placeholder="Nombre"  value={nombre_producto} onChange={(e) => setNombre_Producto(e.target.value)}/>
          </MDBInputGroup>

          <MDBInputGroup textBefore='📋' className='mb-3' >
            <input className='form-control' type='text' placeholder="Descripcion" value={descripcion_producto} onChange={(e) => setDescripcion_Producto(e.target.value)} />
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
            <input className='form-control' type='text' placeholder="Cantidad" value={cantidad_producto} onChange={(e) => setCantidad_Producto(e.target.value)}/>
          </MDBInputGroup>

            <Form.Select  key={Id_categoria} aria-label="Nombre Categoria" id="categoria">
                {categorias.map((cat)=>   
                    <option key={cat.Id_categoria} value={cat.Id_categoria}>{cat.nombre_categoria}</option>   
                )}
            </Form.Select>
                


                <div className="row">
                    <div className="col">
                        <Button className="btn btn-success" onClick={crearProductos}>Guardar Producto</Button>
                    </div>
                </div>
            </div>
            <table className='table table-striped table-hover mt-5 shadow-lg'>
                <thead>
                    <tr className='table-info'>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Precio costo</th>
                        <th>Precio venta</th>
                        <th>Tipo venta</th>
                        <th>Cantidad</th>
                        <th>Departamento</th>
                        <th>Fecha de creacion</th>
                        <th>Ganancia</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ver.map((val) => (
                            <tr key={val.Id_producto}>
                                <td>{val.Id_producto}</td>
                                <td>{val.nombre_producto}</td>
                                <td>{val.descripcion_producto}</td>
                                <td>{val.precioCompra}</td>
                                <td>{val.precioVenta}</td>
                                <td>{val.tipo_venta}</td>
                                <td>{val.tipo_venta === 'granel' ? parseFloat(val.cantidad_producto).toFixed(2) : val.cantidad_producto}</td>

                                <td>{val.nombre_categoria}</td>
                                <td>{new Date(val.fecha_registro).toISOString().slice(0, 10)}</td>
                                <td>${parseFloat( val.precioVenta - val.precioCompra ) }</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <button onClick={exportToExcel}>Exportar a Excel</button>
        </>
    );
};

export default NuevoProduct;
