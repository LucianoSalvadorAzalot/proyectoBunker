
import {  useEffect, useState } from "react";
import { DataContext } from "./DataContext"


const DataProvider = ({children}) => {

    const [productos, setProductos] = useState([])
    const [sucursales, setSucursales] = useState([])

    
    const fetchProductos = async ()  =>{ 
        const response = await fetch(`http://localhost:3001/productos`)
        const data = await response.json()
        console.log(data)
        setProductos(data)
    };

    

 
    const traerSucursales = async () =>{
      const response = await fetch("http://localhost:3001/sucursales")
      const data = await response.json()
      console.log(data)
      setSucursales(data)
    }


    useEffect(() => {
        fetchProductos()
        traerSucursales()
    }, [])

  return (
    <DataContext.Provider value = {{productos,sucursales}}>
        {children}
    </DataContext.Provider>
  )
}

export default DataProvider
