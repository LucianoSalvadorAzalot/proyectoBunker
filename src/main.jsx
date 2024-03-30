import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { departamentos, compra, corteV, ventas, cliente, productos, configuracion, nuevoProducto, editarProducto, eliminarProducto, app, importar, corteC, loginUsuario, usuarios, metodoPago} from './routes/routes.js'
import Clientes from './components/Clientes.jsx'
import Venta from "./components/Venta.jsx"
import Compra from './components/Compras.jsx'
import {Corte} from "./components/Corte.jsx"
import Productos from './components/Productos.jsx'


import Configuracion from "./components/Configuracion.jsx"
import NuevoProduct from "./CrudProductos/NuevoProduct.jsx"
import Eliminar from "./CrudProductos/Eliminar.jsx"
import Editar from "./CrudProductos/Editar.jsx"
import Departamentos from "./CrudProductos/Departamento/Departamento.jsx"





import { CarritoProvider } from './context/CarritoProvider.jsx'
import DataProvider from './context/DataProvider.jsx'
import Login from './components/Login.jsx'
import Importar from './CrudProductos/Importar.jsx'
import CorteCompra from './components/CorteCompra.jsx'
import LoginUsuario from './components/LoginUsuario.jsx'
import Usuarios from './components/Usuarios.jsx'
import MetodoDePago from './components/MetodoDePago.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  
    <BrowserRouter>
      <DataProvider>
          <CarritoProvider>
            <Routes>


                <Route path={app} element={<App/>}/>  
                <Route path="/" element={<Login/>}/>
                <Route path={ventas} element={<Venta/>}/>
                <Route path={compra} element={<Compra/>}/>
                <Route path={cliente} element={<Clientes/>}/>
                <Route path={corteV} element={<Corte/>}/>
                <Route path={corteC} element={<CorteCompra/>}/>
                <Route path={configuracion} element={<Configuracion/>}/>
                <Route path={loginUsuario} element={<LoginUsuario/>}/>
                <Route path={usuarios} element={<Usuarios/>}/>
                <Route path={metodoPago} element={<MetodoDePago/>}/>



                {/* PRODUCTOS */}
                <Route path={productos} element={<Productos/>}/>
                <Route path={nuevoProducto} element={<NuevoProduct/>}/>
                <Route path={editarProducto} element={<Editar/>}/>
                <Route path={eliminarProducto} element={<Eliminar/>}/>
                <Route path={departamentos} element={<Departamentos/>}/>
                <Route path={importar} element={<Importar/>}/>

      

                
              

            </Routes>
          </CarritoProvider>
      </DataProvider>
        
    </BrowserRouter>
   
  //</React.StrictMode>,
)
