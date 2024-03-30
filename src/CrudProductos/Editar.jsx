import Productos from "../components/Productos.jsx"
import { Button } from "react-bootstrap"
import  { useState, useEffect } from 'react';
import axios from 'axios';
import {
    MDBInputGroup,
  } from 'mdb-react-ui-kit';
  import Form from 'react-bootstrap/Form';


const Editar = () => {
    const [ver, setVer] = useState([]);
    const [Id_producto, setId_Producto] = useState('');
    const [nombre_producto, setnombre_Producto] = useState('');
    const [descripcion_producto, setdescripcion_Producto] = useState('');
    const [precioCompra, setPrecioCompra] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    const [cantidad_producto, setcantidad_Producto] = useState('');
    const [Id_categoria, setId_categoria] = useState('');
    const [tipo_venta, setTipoVenta] = useState('unidad');
    const [categorias, setCategorias] = useState([]);


    useEffect(()=>{
        axios.get(`http://localhost:3001/productos`)
        .then((response) => {
            setVer(response.data);
        })
        .catch((error) => {
            console.log('Error al obtener los productos:', error);
        });
    })


    const editarProducto = () =>{
        axios.put(`http://localhost:3001/productos/put/${Id_producto}`,
        {    
            Id_producto: Id_producto,
            nombre_producto: nombre_producto,
            descripcion_producto: descripcion_producto,
            precioCompra: precioCompra,
            precioVenta: precioVenta,
            cantidad_producto: cantidad_producto,
            Id_categoria: Id_categoria   

        }).then(()=>{
      
        })
    }

    const verCategorias = () =>{
        axios.get("http://localhost:3001/categorias").then((response)=>{
            setCategorias(response.data)
        })

    }


    const seeProductos = (val) =>{

        setId_Producto(val.Id_producto)
        setnombre_Producto(val.nombre_producto)
        setdescripcion_Producto(val.descripcion_producto)
        setPrecioCompra(val.precioCompra)
        setPrecioVenta(val.precioVenta)
        setcantidad_Producto(val.cantidad_producto)
        setId_categoria(val.nombre_categoria)
        setTipoVenta(val.tipo_venta)
    }

    useEffect(()=>{
        verCategorias()
    },[])


  return (
    <>

    <Productos/>
    <div className="container">
        <div className="row">
            <div className="col">
                <h4>Modificar Producto</h4>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <input type="text" placeholder="Escanea el codigo de barras" />
                <Button className="btn btn-success">Aceptar</Button>
            </div>
        </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    <div className="container-fluid">
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

          <Form.Select  key={Id_categoria} aria-label="Nombre Categoria" id="categoria">
            {categorias.map((cat)=>   
                <option key={cat.Id_categoria}>{cat.nombre_categoria}</option>   
            )}
        </Form.Select>
         

                
        </div>
       
            <div className="row">
                <div className="col">
                <Button className="btn btn-success" onClick={editarProducto}>Guardar Producto</Button>
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
                        <th>Tipo de venta</th>
                        <th>Cantidad</th>
                        <th>Departamento</th>
                        <th>Fecha registro</th>
                        <th>Ganancia</th>
                        <th>EDITAR</th>
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
                                <td><Button className="btn btn-warning" onClick={()=>seeProductos(val)}> EDITAR</Button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

      
    </>
  )
}

export default Editar
