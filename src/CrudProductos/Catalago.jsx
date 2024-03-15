import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap"
import Producto from "../components/Productos"
import {Dropdown} from "react-bootstrap"

const Catalago = () => {
  return (
    <>
     <Producto/>
      <div className="container-fluid">
        <div className="row">
            <div className="col">
                <h4>CATALOGO DE PRODUCTOS</h4>               
            </div>
        </div>
        <div className="row">
            <div className="col">
               <input type="search"/>              
            </div>
            <div className="col">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                     Departamento
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Carne</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>              
            </div>
            <div className="col">
            <Button className="btn btn-info">Actualisar varios...</Button>          
            </div>
            <div className="col">
            <Button className="btn btn-info">Modificar...</Button>            
            </div>
            <div className="col">
            <Button className="btn btn-info">Exportar</Button>             
            </div>
        </div>

      </div>

      <div className= "container">

      <Table striped bordered hover>
            <thead>
                <tr>
                <th>Codigo</th>
                <th>Descripcion del producto</th>
                <th>Departamento</th>
                <th>Costo</th>
                <th>P. Venta</th>
                <th>P. Mayoreo</th>
                <th>Existencia</th>
                <th>Inv. Minimo</th>
                <th>Inv. Maximo</th>
                <th>Tipo Venta</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                
                </tr>
                <tr>
                <td>2</td>
                
                </tr>
                <tr>
                <td>3</td>
                
                </tr>
                <tr>
                <td>4</td>
                
                </tr>
                <tr>
                <td>5</td>
                
                </tr>
                <tr>
                <td>6</td>
                
                </tr>
                <tr>
                <td>7</td>
                
                </tr>
                <tr>
                <td>8</td>
                
                </tr>
                <tr>
                <td>9</td>
                
                </tr>
                <tr>
                <td>10</td>
                
                </tr>
            </tbody>
        </Table>

      </div>



    </>
  )
}

export default Catalago
