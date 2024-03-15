import App from '../App'
import Productos from "../components/Productos.jsx"
import { Button } from "react-bootstrap"
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Eliminar = () => {

    const [ver, setVer] = useState([]);
    const [Id_producto, setId_Producto] = useState('');
    const [nombre_categoria, setNombre_categoria] = useState('');
    
    const verProductos = () => {
        axios.get("http://localhost:3001/productos")
            .then((response) => {
                setVer(response.data);
            })
            .catch((error) => {
                console.log('Error al obtener los productos', error);
            });
    };


    const eliminarProducto =(Id_producto) =>{
        axios.delete(`http://localhost:3001/productos/delete/${Id_producto}`,
        {}
        ).then(()=>{
            verProductos()
        }).catch((error)=>{
            console.log('No se pudo eliimnar wachin', error)
        })
    }

    useEffect(() => {
        verProductos();
    }, []);


  return (
    <>
        <Productos/>
      
        <div className="container">
            <div className="row">
                <div className="col">
                    <h4>Eliminar Producto</h4>
                </div>
                </div>
                <div className="row">
                    <div className="col">
                       Codigo <input type="text"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                       Descripcion <input type="text"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                       Se vende: <input type="number"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Precio Costo: <input type="number"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Precio Venta: <input type="number"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Departamento <input type="number"/>
                    </div>
                </div>

        </div>
        <br />
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
                        ver.map((val, index) => (
                            <tr key={val.Id_producto}>
                                <td>{val.Id_producto}</td>
                                <td>{val.nombre_producto}</td>
                                <td>{val.descripcion_producto}</td>
                                <td>{val.precio_producto}</td>
                                <td>{val.cantidad_producto}</td>
                                <td>{val.nombre_categoria}</td>
                                <td className='btn-group' role='group' aria-label="Basic example">
                                     <Button type='button' className='btn btn-danger m-1' onClick={() => eliminarProducto(val.Id_producto)}> Eliminar </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
    </>
  )
}

export default Eliminar
