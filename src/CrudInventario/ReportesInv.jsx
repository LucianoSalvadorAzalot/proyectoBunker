import React from "react";
import Inventario from "../components/Inventario";
import { Button, Table } from "react-bootstrap";

export default function ReportesInv() {
  return (
    <>
      <Inventario />
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h4>REPORTES DE INVENTARIO</h4>
          </div>
        <h6>Costo del inventario</h6>
        <span>$$</span>
        <h6>Cantidad de productos en inventario</h6> <span>***</span>
          <div className="col">
            <p>
              En este reporte se muestran los productos que manejan inventario.
            </p>
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
                  <th>Costo</th>
                  <th>Precio Venta</th>
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
  );
}
