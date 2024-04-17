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
  const [editarMetodoPago, setEditarmetodoPago] = useState(false)  

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
      limpiarCampos()
    })
  }



  const editarMetodo = () =>{
    axios.put(`http://localhost:3001/metodopago/put/${Id_metodoPago}`,{
      Id_metodoPago: Id_metodoPago,
      tipo_metodoPago: tipo_metodoPago
    }).then(()=>{
      verMetodos()
      limpiarCampos()
      console.log(Id_metodoPago)
    }).catch((error)=>{
      console.log('hola',error)
      console.log(Id_metodoPago)
    })
  }


  const verLosMetodos = (metodos) =>{
    setEditarmetodoPago(true)
    setId_metodoPago(metodos.Id_metodoPago)
    setTipoMetodoPago(metodos.tipo_metodoPago)
  }
  const limpiarCampos = () =>{
    setEditarmetodoPago(false)
    setId_metodoPago("")
    setTipoMetodoPago("")
  }

  useEffect(()=>{
    verMetodos()
  },[])





  return (
  
    <>
      <App/><br />
      <div className="container-fluid">
      <MDBInputGroup textBefore='📋'   className='mb-3'>
            <input className='form-control' type='text' placeholder="Nombre" value={tipo_metodoPago} onChange={(e) => setTipoMetodoPago(e.target.value)}/>
          </MDBInputGroup>
             
      </div>
 

      <div className='card-footer text-muted'>
                  {
                  editarMetodoPago ? 
                  <div >
                  <Button className="btn btn-warning m-2" onClick={editarMetodo}>✔️Editar</Button>
                
                  <Button className="btn btn-danger m-2" onClick={limpiarCampos}>❌ Cancelar</Button>
                  </div> 
                  :
                
                      <div > 
                      <Button className="btn btn-success m-2" onClick={crearMetodo}>✔️Guardar</Button>
                      </div> 
                  }

                    
                   
                </div>



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
                      <td><Button className="btn btn-warning" onClick={()=>verLosMetodos(metodos)}>👀ver</Button></td>
                    </tr>
                        
                     ))}
                </tbody>
            </table>
     
      
    </>
  )
}

export default MetodoDePago
