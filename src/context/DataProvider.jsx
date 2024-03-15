
import {  useEffect, useState } from "react";
import { DataContext } from "./DataContext"

const DataProvider = ({children}) => {

    const [productos, setProductos] = useState([])


    const fetchProductos = async ()  =>{ 
        const response = await fetch("http://localhost:3001/productos")
        const data = await response.json()
        console.log(data)
        setProductos(data)
    }

    useEffect(() => {
        fetchProductos()

    }, [])

  return (
    <DataContext.Provider value = {{productos}}>
        {children}
    </DataContext.Provider>
  )
}

export default DataProvider
