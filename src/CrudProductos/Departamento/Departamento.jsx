import { Button } from "react-bootstrap"
import Productos from "../../components/Productos"
import axios from 'axios';
import React, { useState, useEffect } from 'react';


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
    
    <Productos/>
        <div className="Container-fluid">
            <div className= "row">
                <div className= "col">
                     <h2>Departamentos:</h2>   
                </div>
            </div>
            {/* <div className= "row">
                <div className= "col">
                     ID <input type="text" value={Id_categoria} onChange={(e)=> setIdCategoria(e.target.value)}/>
                </div>
            </div> */}
            <div className= "row">
                <div className= "col">
                     Nombre <input type="text" value={nombre_categoria} onChange={(e)=> setNombreCategoria(e.target.value)}/>
                </div>
            </div>
            <div className= "row">
                <div className= "col">
                    Descripcion <input type="text" value={descripcion_categoria} onChange={(e)=> setdescripcionCategoria(e.target.value)}/>  
                </div>
            </div>
            <div className= "row">
                <div className= "col">
                  <Button onClick={crearCategoria}>Crear Categoria</Button>  
                </div>            
                <div className= "col">
                  <Button onClick={editarCategoria}>Confirmar Edicion</Button>  
                </div>       
                
            </div>
        </div>



        <div className="container">
          <div className="row">
            <div className="col">
              <table>
                <thead>
                    <tr>
                      <th>ID</th>
                      <th>NOMBRE</th>
                      <th>DESCRIPCION</th>
                    </tr>
                </thead>
                <tbody>
                 {
                  verCategoria.map((val, index)=>(
                    <tr key={val.Id_categoria}>
                      <td>{val.Id_categoria}</td>
                      <td>{val.nombre_categoria}</td>
                      <td>{val.descripcion_categoria}</td>
                        <td className="col">
                          <Button onClick={()=>{updateCategoria(val)}}>Ver Categoria</Button>               
                        </td>
                        <td className="col">
                        <Button onClick={() => eliminarCategoria(val.Id_categoria)}>Eliminar</Button>               
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
