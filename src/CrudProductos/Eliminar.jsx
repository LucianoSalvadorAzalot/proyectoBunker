
import Productos from "../components/Productos.jsx"
import { Button } from "react-bootstrap"
import axios from 'axios';
import  { useState, useEffect } from 'react';

const Eliminar = () => {

    const [ver, setVer] = useState([]);
    

    useEffect(()=>{
        axios.get(`http://localhost:3001/productos`)
        .then((response) => {
            setVer(response.data);
        })
        .catch((error) => {
            console.log('Error al obtener los productos:', error);
        });
    },[ver])


const eliminarProducto = (Id_producto) => {
    axios.delete(`http://localhost:3001/productos/delete/${Id_producto}`)
        .then(() => {
            alert('producto eliminado con éxito');
        })
        .catch((error) => {
            console.log('No se pudo eliminar', error);
        });
};



  return (
    <>
        <Productos/>
    
        <br />
        <table className='table table-striped table-hover mt-5 shadow-lg'>
                <thead>
                    <tr className='table-info'>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Precio Venta</th>
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
                                <td>{val.precioVenta}</td>
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
