import React from "react";
import Inventario from "../components/Inventario";
import { Button } from "react-bootstrap";

export default function AjustarInv() {
  return (
    <>
      <Inventario />
    <label htmlFor="">Codigo del producto</label><input type="text" name="" id="" />
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            Descripcion: <input type="text" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            Cantidad actual: <input type="span" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            +/- : <input type="text" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            Nueva Cantidad: <input type="number" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            Costo: <input type="number" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            Precio Venta: <input type="number" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            Precio Mayoreo: <input type="number" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            Motivo del ajuste:{" "}
            <textarea name="" id="" cols="40" rows="2"></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Button className="btn btn-success">
              Realizar ajuste de inventario
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
