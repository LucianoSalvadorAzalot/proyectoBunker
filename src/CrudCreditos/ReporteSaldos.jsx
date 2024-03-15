import React from 'react'
import Creditos from '../components/Creditos'
import { Button, Table } from 'react-bootstrap'

export default function ReporteSaldos() {
  return (
    <>
    <Creditos/>
    <br /> <br />
    <h3>Reportes de Saldos</h3>
    <h5>Total de creditos pendientes:</h5>
    <Button>Imprimir</Button>
    <div className="container-fluid">
        <div className="row">
          <div className="col-xl">
            <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Numero</th>
                    <th>Nombre/Direccion del Cliente</th>
                    <th>Telefono</th>
                    <th>Limite de Credito</th>
                    <th>Saldo Actual</th>
                    <th>Ultimo Pago</th>
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
                </tbody>
            </Table>
          </div>
       
        </div>
      </div>
    </>
  )
}
