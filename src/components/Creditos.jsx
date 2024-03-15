import React, { useEffect, useState } from 'react'
import App from '../App'
import { Link } from 'react-router-dom'
import axios from 'axios';
// import { Button } from 'react-bootstrap';
import "../App.css";


function Creditos() {

 const[ver,setVer] = useState([]);
 const[buscar,setBuscar] = useState("");
 const[nombre_cliente,setNombre_cliente] = useState("");
  
// /**********VER CLIENTES************/
 const verClientes = () =>{
   axios.get("http://localhost:3001/cliente").then((response) =>{
    setVer(response.data)
  }); }


const buscador = (e)=>{
  setBuscar(e.target.value)
}

let resultado = []
 if(!buscar)
 {
   resultado = ver
}else{  
   resultado = ver.filter((dato) =>
   dato.nombre_cliente.toLowerCase().includes(buscar.toLocaleLowerCase())) 
  }


 useEffect(() => {
   verClientes()
},[])

  return (
    <>
      <App/>
      <br /><br />
      <h2>CREDITOS A CLIENTES</h2>
    <h3>Estado de Cuenta</h3>
    <input value={buscar} onChange={buscador} type="text" placeholder='Ingresa un cliente' className='form-control'/>
    <h5>Ingresa el folio o nombre del cliente</h5>

    <table className='table table-striped table-hover mt-5 shadow-lg'>
                <thead >
                    <tr className='table-success'>
                        <th>NOMBRE</th>
                        <th>APELLIDO</th>
                        <th>TELEFONO</th>
                        <th>CORREO</th>
                        <th>DOMICILIO</th>
                        <th>CIUDAD</th>
                        <th>CODIGO POSTAL</th>
                        <th>ESTADO</th>
                    </tr>
                </thead>
                 <tbody>
                    {
                        resultado.map((val, key) => (
                            <tr key={val.Id_cliente}>
                                <td>{val.nombre_cliente}</td>
                                <td>{val.apellido_cliente}</td>
                                <td>{val.telefono_cliente}</td>
                                <td>{val.correo_cliente}</td>
                                <td>{val.domicilio_cliente}</td>
                                <td>{val.ciudad_cliente}</td>
                                <td>{val.codigoPostal_cliente}</td>
                                <div className='btn-group' role='group' aria-label="Basic example">
                                     <Link to="/estadoCuenta"  className='btn btn-warning m-2' onClick={()=>{verClientes(Id_cliente)}}> ESTADO CUENTA </Link>
                                </div>
                            </tr>
                        ))
                    }
                </tbody> 
            </table>
    </>
  )
}

export default Creditos