import { CarritoContext } from "./CarritoContext"
import { useReducer } from 'react'


const initialState = []



export const CarritoProvider = ({children}) => {
    
    const comprasReducer = (state = initialState, action = {}) => {
        switch (action.type) {
            case '[CARRITO] Agregar Compra':
                return [...state, action.payload]
            case '[CARRITO] Aumentar Cantidad Compra': 
                return state.map(item => {
                    const cant = item.cantidad_producto + 1
                    if(item.Id_producto === action.payload) return {...item, cantidad_producto: cant}
                    return item
                })
            case '[CARRITO] Disminuir Cantidad Compra': 
            return state.map(item => {
                const cant = item.cantidad_producto -1
                if(item.Id_producto === action.payload && item.cantidad_producto > 1) return {...item, cantidad_producto: cant}
                return item
            })
             
            case '[CARRITO] Eliminar Compra':
                return state.filter(compra => compra.Id_producto !== action.payload)
            default:
                return state
        }
    }

    const [listaCompras, dispatch] = useReducer(comprasReducer, initialState)

    const agregarCompra = (compra) => {
        compra.cantidad_producto = 1
        const action = {
            type: '[CARRITO] Agregar Compra',
            payload: compra
        }
        dispatch(action)
    
    }
    const aumentarCantidad = (Id_producto) => {
        const action = {
            type: '[CARRITO] Aumentar Cantidad Compra',
            payload: Id_producto
        }
        dispatch(action)
    
    }
    const disminuirCantidad = (Id_producto) => {
        const action = {
            type: '[CARRITO] Disminuir Cantidad Compra',
            payload: Id_producto
        }
        dispatch(action)
    
    }
    const eliminarCompra = (Id_producto) => {
        const action = {
            type: '[CARRITO] Eliminar Compra',
            payload: Id_producto
        }
        dispatch(action)
    
    }
    
    

  return (
     <>
    
      <CarritoContext.Provider value={{listaCompras, agregarCompra, aumentarCantidad, disminuirCantidad, eliminarCompra }}>
        {children}
      </CarritoContext.Provider>
    
    
    </>
   )
 }


