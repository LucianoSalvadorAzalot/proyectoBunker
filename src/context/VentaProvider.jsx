import { useReducer } from 'react'
import { VentaContext } from "./VentaContext"


const estadoInicial = []



export const VentaProvider = ({children}) => {
    
    const ventasReducer = (estado = estadoInicial, accion = {}) => {
        switch (accion.type) {
            case '[VENTA] Agregar Venta':
                return [...estado, accion.payload]
             
            case '[VENTA] Eliminar Venta':
                return estado.filter(venta => venta.Id_venta !== accion.payload)
            default:
                return estado
        }
    }

    const [listaVentas, dispatch] = useReducer(ventasReducer, estadoInicial)

    const agregarVenta = (venta) => {
        venta.cantidad_venta = 1
        const accion = {
            type: '[VENTA] Agregar Venta',
            payload: venta
        }
        dispatch(accion)
    
    }

    const eliminarVenta = (Id_venta) => {
        const accion = {
            type: '[VENTA] Eliminar Venta',
            payload: Id_venta
        }
        dispatch(accion)

    }
    
    

  return (
     <>
    
      <VentaContext.Provider value={{listaVentas, agregarVenta, eliminarVenta }}>
        {children}
      </VentaContext.Provider>
    
    
    </>
   )
 }


