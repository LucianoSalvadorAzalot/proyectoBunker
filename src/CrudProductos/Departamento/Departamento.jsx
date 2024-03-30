import { Button } from "react-bootstrap"
import Productos from "../../components/Productos"
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  MDBInputGroup,
} from 'mdb-react-ui-kit';


const Departamento = () => {

  const [verCategoria,setVerCategoria] = useState([])
  const [Id_categoria,setIdCategoria] = useState ("")
  const [nombre_categoria, setNombreCategoria] = useState('')
  const [descripcion_categoria, setdescripcionCategoria] = useState('')



  const seeCategoria = () => {
    axios.get("http://localhost:3001/categorias").then((response)=>{
      setVerCategoria(response.data)
    })
  }

  const crearCategoria = () =>{
    axios.post("http://localhost:3001/categorias/post",
    {
      nombre_categoria: nombre_categoria,
      descripcion_categoria: descripcion_categoria
    }
    ).then(()=>{
      seeCategoria()
    }).catch((error)=>{
      console.log("casi pero no", error)
    })
  }



  const editarCategoria = () => {
    axios.put(`http://localhost:3001/categorias/put/${Id_categoria}`,
    {
      Id_categoria: Id_categoria,
      nombre_categoria: nombre_categoria,
      descripcion_categoria: descripcion_categoria

    }).then(()=>{
      seeCategoria()
    }).catch((error)=>{
      console.log(error)
    })
  }



  const updateCategoria = (val) =>{
   setIdCategoria(val.Id_categoria)
   setNombreCategoria(val.nombre_categoria)
   setdescripcionCategoria(val.descripcion_categoria)
  }



  const eliminarCategoria = (Id_categoria) =>{ 
    axios.delete(`http://localhost:3001/categorias/delete/${Id_categoria}`,
    {} 
    ).then(()=>{
      seeCategoria()
    }).catch((error)=>{
      console.log('no me podes borrar gil', error)
    })
  }

  useEffect(()=>{
    seeCategoria()
  },[])


  return (
    <>
    
    <Productos/> <br />
        <div className="Container-fluid">
            <div className= "row">
                <div className= "col">
                     <h2>Departamentos:</h2>   
                </div>
            </div><br />
            <MDBInputGroup textBefore='📋'   className='mb-3'>
            <input className='form-control' type='text' placeholder="Nombre"  value={nombre_categoria} onChange={(e)=> setNombreCategoria(e.target.value)} />
          </MDBInputGroup>

          <MDBInputGroup textBefore='📋' className='mb-3' >
            <input className='form-control' type='text' placeholder="Descripcion" value={descripcion_categoria} onChange={(e)=> setdescripcionCategoria(e.target.value)} />
          </MDBInputGroup>
         
            <div className= "row">
                <div className= "col">
                  <Button className="btn btn-success" onClick={crearCategoria}>Crear Categoria</Button>  
                </div>            
                <div className= "col">
                  <Button className="btn btn-warning"  onClick={editarCategoria}>Confirmar Edicion</Button>  
                </div>       
                
            </div>
        </div>



        <div className="container">
          <div className="row">
            <div className="col">
              <table className='table table-striped table-hover mt-5 shadow-lg'>
                <thead>
                    <tr>
                      <th>ID</th>
                      <th>NOMBRE</th>
                      <th>DESCRIPCION</th>
                      <th>EDITAR</th>
                      <th>ELIMINAR</th>
                    </tr>
                </thead>
                <tbody>
                 {
                  verCategoria.map((val)=>(
                    <tr key={val.Id_categoria}>
                      <td>{val.Id_categoria}</td>
                      <td>{val.nombre_categoria}</td>
                      <td>{val.descripcion_categoria}</td>
                        <td className="col">
                          <Button onClick={()=>{updateCategoria(val)}}>Ver Categoria</Button>               
                        </td>
                        <td className="col">
                        <Button className="btn btn-danger" onClick={() => eliminarCategoria(val.Id_categoria)}>Eliminar</Button>               
                        </td>
                    </tr>
                  ))
                 }
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </>
  )
}

export default Departamento
