import { Dropdown } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Inventario from "../components/Inventario";

const ReportMovimientos = () => {
  return (
    <>
      <Inventario />
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h4>HISTORIAL DE MOVIMIENTOS</h4>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h6>Del dia</h6>
            <input type="datetime-local" />
          </div>
          <div className="col">
            <h6>Buscar por:</h6>
            <input type="search" />
          </div>
          <div className="col">
            <h6>Movimientos</h6>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                todos
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">-4-</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Hora</th>
                  <th>Descripcion del producto</th>
                  <th>Tipo</th>
                  <th>Habia</th>
                  <th>Cantidad</th>
                  <th>Hay</th>
                  <th>Cajero</th>
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
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportMovimientos;
