import { useEffect, useState } from "react"
import App from "../App"
import axios  from "axios"


const PlataCaja = () => {

    const [plata, setPlata] = useState([])
    const[plataLogin,setPlataLogin] = useState([])

    const Id_sucursal = localStorage.getItem("sucursalId")


    const verPlata = ( ) =>{
        axios.get(`http://localhost:3001/plataCaja/${Id_sucursal}`).then((response)=>{
            setPlata(response.data)
        }).catch((error)=>{
            console.log('casi pero no', error)
        })
    }
    const verPlataLogin = ( ) =>{
        axios.get(`http://localhost:3001/plataLogin/Ingreso/${Id_sucursal}`).then((response)=>{
            setPlataLogin(response.data)
        }).catch((error)=>{
            console.log('casi pero no', error)
        })
    }

useEffect(()=>{
    verPlataLogin()
    verPlata()
},[])


  return (
    <>
    <App/>


    <h2>EGRESO DE USUARIOS</h2>
            <table className="table table-striped table-hover mt-5 shadow-lg">
                <thead>
                    <tr className="table-info">
                        <th>Nombre Usuario</th>
                        <th>Dinero en caja</th>
                        <th>DINERO FALTANTE</th>
                        <th>Hora de salida</th>            
                    </tr>
                </thead>
                <tbody>
                    {plata.map((val) => (
                        <tr key={val.Id_plataCaja}>
                            <td>{val.nombre_usuario}</td>
                            <td>{val.CantidadPlata}</td>
                            <td>{val.faltante}</td>
                            <td>{new Date (val.FechaRegistro).toLocaleString()}</td>
                          
                        </tr>

                    ))} 
                </tbody>
            </table>  
            
        <h2>INGRESO DE USUARIOS</h2>
            <table className="table table-striped table-hover mt-5 shadow-lg">
                <thead>
                    <tr className="table-info">
                        <th>Nombre Usuario</th>
                        <th>Dinero en caja</th>
                        <th>Hora de ingreso</th>            
                    </tr>
                </thead>
                <tbody>
                    {plataLogin.map((val) => (
                        <tr key={val.Id_plataCajaLogin}>
                            <td>{val.nombre_usuario}</td>
                            <td>{val.cantidadPlataLogin}</td>
                            <td>{new Date (val.FechaRegistro).toLocaleString()}</td>
                          
                        </tr>

                    ))} 
                </tbody>
            </table>
    </>
  )
}

export default PlataCaja
