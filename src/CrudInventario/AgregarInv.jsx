import React, { useState } from "react";
import Inventario from "../components/Inventario";
import { Button, Dropdown } from "react-bootstrap";

function AgregarInv() {

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
            Hay: <input type="span" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            Agregar: <input type="text" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            Precio Costo: <input type="number" />
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
            <Button className="btn btn-success">
              Agregar cantidad al Inventario
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AgregarInv;
