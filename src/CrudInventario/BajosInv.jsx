import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap"
import Inventario from "../components/Inventario";

const BajosInv = () => {
  return (
    <>
      <Inventario />
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h4>PPODUCTOS BAJOS EN INVENTARIO</h4>
                </div>
                <div className="col">
                <p>A continuacion se muestra un listado con los productos con inventario debajo de su minimo:</p>
                <Button className="btn btn-info">Exportar Excel</Button>    
                </div>
            </div>
        </div>

        <div className="container">
            <div className="row">
                <div className="col">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Descripcion del producto</th>
                                <th>Precio venta</th>
                                <th>Departamento</th>
                                <th>Existencia</th>
                                <th>Inv. Minimo</th>
                                <th>Inv. Maximo</th>
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
                            </tbody>
                    </Table>
                </div>
            </div>
        </div>

      
    </>
  )
}

export default BajosInv
