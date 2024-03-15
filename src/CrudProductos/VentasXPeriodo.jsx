import React from 'react'
import {Dropdown} from "react-bootstrap"
import Table from 'react-bootstrap/Table';
import Producto from "../components/Productos"

const VentasXPeriodo = () => {
  return (
    <>
    <Producto/>


    <div className="container-fluid">
        <div className="row">
            <div className="col">
                <h3>Reporte de productos vendidos</h3>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <h4>Mostrar ventas de:</h4>
                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Elegir periodo:
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">venta 1...</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">venta 2...</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">venta 3...</Dropdown.Item>
                                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Codigo</th>
                <th>Descripcion del producto</th>
                <th>Cantidad</th>
                <th>Precio venta</th>
                <th>Departamento</th>
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
            </tbody>
        </Table>


    </div>




      
    </>
  )
}

export default VentasXPeriodo
