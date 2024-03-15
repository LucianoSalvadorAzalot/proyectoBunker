import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Productos from '../components/Productos.jsx';


const NuevoProduct = () => {
    const [ver, setVer] = useState([]);
    const [Id_producto, setId_Producto] = useState('');
    const [nombre_producto, setnombre_Producto] = useState('');
    const [descripcion_producto, setdescripcion_Producto] = useState('');
    const [precio_producto, setprecio_Producto] = useState('');
    const [cantidad_producto, setcantidad_Producto] = useState('');
    const [Id_categoria, setId_categoria] = useState('');
    const [nombre_categoria, setNombre_categoria] = useState('');

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
            precio_producto: precio_producto,
            cantidad_producto: cantidad_producto,
            Id_categoria: Id_categoria   
        })
        .then(() => {
            verProductos();
        })
        .catch(() => {
            console.log('Error al crear el producto:');
        });
    };

    useEffect(() => {
        verProductos();
    }, []);

    return (
        <>
            <Productos/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        Nombre: <input type="text" value={nombre_producto} onChange={(e) => setnombre_Producto(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Descripcion: <input type="text" value={descripcion_producto} onChange={(e) => setdescripcion_Producto(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Precio costo: <input type="text" value={precio_producto} onChange={(e) => setprecio_Producto(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Cantidad: <input type="text" value={cantidad_producto} onChange={(e) => setcantidad_Producto(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Departamento: <input type="text" value={Id_categoria} onChange={(e) => setId_categoria(e.target.value)}/>
                    </div>
                </div>
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
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Departamento</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ver.map((val) => (
                            <tr key={val.Id_producto}>
                                <td>{val.Id_producto}</td>
                                <td>{val.nombre_producto}</td>
                                <td>{val.descripcion_producto}</td>
                                <td>{val.precio_producto}</td>
                                <td>{val.cantidad_producto}</td>
                                <td>{val.nombre_categoria}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
};

export default NuevoProduct;
