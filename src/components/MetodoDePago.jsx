import axios from "axios"
import { useEffect, useState } from "react"
import App from "../App"
import { Button } from "react-bootstrap"
import {
  MDBInputGroup,
} from 'mdb-react-ui-kit';


const MetodoDePago = () => {

  const[verMetodoPago, setVerMetodoPago] = useState([])
  const[tipo_metodoPago, setTipoMetodoPago] = useState("")
  const[Id_metodoPago, setId_metodoPago] = useState("")

  const verMetodos = () =>{
    axios.get("http://localhost:3001/metodopago").then((response)=>{
      setVerMetodoPago(response.data)
    })
  }


  const crearMetodo = () =>{
    axios.post("http://localhost:3001/metodopago/post",{
      tipo_metodoPago: tipo_metodoPago
    }).then(()=>{
      verMetodos()
    })
  }



  const editarMetodo = () =>{
    axios.put(`http://localhost:3001/metodopago/put/${Id_metodoPago}`,{
      Id_metodoPago: Id_metodoPago,
      tipo_metodoPago: tipo_metodoPago
    }).then(()=>{
      verMetodos()
      console.log(Id_metodoPago)
    }).catch((error)=>{
      console.log('hola',error)
      console.log(Id_metodoPago)
    })
  }


  const verLosMetodos = (metodos) =>{
    setId_metodoPago(metodos.Id_metodoPago)
    setTipoMetodoPago(metodos.tipo_metodoPago)
  }

  useEffect(()=>{
    verMetodos()
  },[])





  return (
  
    <>
      <App/><br /><br /><br />
      <div className="container-fluid">
      <MDBInputGroup textBefore='📋'   className='mb-3'>
            <input className='form-control' type='text' placeholder="Nombre" value={tipo_metodoPago} onChange={(e) => setTipoMetodoPago(e.target.value)}/>
          </MDBInputGroup>
             
      </div>
      <br /><br />
      <Button className="btn btn-primary" onClick={crearMetodo}>Crear Metodo de Pago</Button>---
      <Button className="btn btn-primary" onClick={editarMetodo}>Atualisasr Metodo de Pago</Button>

        <table className='table table-striped table-hover mt-5 shadow-lg'>
                <thead>
                    <tr className='table-info'>
                        <th>Id</th>
                        <th>Nombre del Metodo de Pago</th>                    
                        <th>Opcion</th>                    
                    </tr>
                </thead>
                <tbody>
                   {verMetodoPago.map((metodos) =>(
                    <tr  key={metodos.Id_metodoPago}>
                     <td>{metodos.Id_metodoPago}</td>
                      <td>{metodos.tipo_metodoPago}</td>
                      <td><Button className="btn btn-danger" onClick={()=>verLosMetodos(metodos)}>ver</Button></td>
                    </tr>
                        
                     ))}
                </tbody>
            </table>
     
      
    </>
  )
}

export default MetodoDePago
