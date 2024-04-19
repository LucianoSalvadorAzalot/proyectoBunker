import React, { useEffect, useState } from "react";
import App from "../App";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es';

export default function Reportes() {
  const [ventaXmetodoPago, setVentaxMetodoPago] = useState([]);
  const [ventaxcliente, setVentaXcliente] = useState([]);
  const [ventaxempleado, setVentaXempleado] = useState([]);
  const [ventaxcategoria, setVentaXcategoria] = useState([]);
  const [ventatotalxcategoria, setVentaTotalXcategoria] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  
  //Estados para el select
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [totalVentasSeleccionada, setTotalVentasSeleccionada] = useState(0);

  const [selectedNumeroVentasXempleado, setSelectedNumeroVentasXempleado] = useState("");
  const [totalVentasXempleado, setTotalVentasXempleado] = useState(0);
  const [totalVentasXempleado2, setTotalVentasXempleado2] = useState(0);

  
  const [selectedMetodoPago, setSelectedMetodoPago] = useState("");
  const [totalVentasMetodoPago, setTotalVentasMetodoPago] = useState(0);

  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const [totalVentasDepartamento, setTotalVentasDepartamento] = useState(0);

  const [selectedCliente, setSelectedCliente] = useState("");
  const [selectedClienteTotalVentas, setSelectedClienteTotalVentas] = useState(0);

  const [selectedSucursal, setSelectedSucursal] = useState("");


  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (date) => {
    setFechaSeleccionada(date);
  };


useEffect(() => {
  const fetchData = async () => {
    try {
    const response = await axios.get("http://localhost:3001/sucursales");
    const sucursales = response.data.map((sucursales) =>({
       ...sucursales,
      nombre_sucursal: sucursales.nombre_sucursal.toString(),
}));
      setSucursales(sucursales);
  } catch (error) {
  console.error("Error al obtener los datos:", error)
  }
};
fetchData()
},[]);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/ventatotal");
        const ventaXmetodoPago = response.data.map((venta) => ({
          ...venta,
          monto_total_formatted: parseFloat(venta.monto_total),
          tipo_metodo_pago: venta.tipo_metodo_pago.toString(),
        }));
        setVentaxMetodoPago(ventaXmetodoPago);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);
  

  const handleMetodoPagoChange = (e) => {
    const metodoPago = e.target.value;
    setSelectedMetodoPago(metodoPago);
    const ventaMetodoPago = ventaXmetodoPago.find(
      (venta) => venta.tipo_metodo_pago === metodoPago
    );
    if (ventaMetodoPago) {
      setTotalVentasMetodoPago(ventaMetodoPago.monto_total_formatted.toLocaleString("es-Es"));
    } else {
      setTotalVentasMetodoPago(0);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/ventaxcliente");
        const ventaxcliente = response.data.map((venta) => ({
          ...venta,
          monto_total_ventas: parseInt(venta.monto_total_ventas, 10),
          total_ventas: parseInt(venta.total_ventas, 10),
        }));
        setVentaXcliente(ventaxcliente);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);


  const handleClienteChange = (e) => {
    const cliente = e.target.value;
    setSelectedCliente(cliente);
    const ventaCliente = ventaxcliente.find(
      (venta) => venta.nombre_cliente === cliente
    );
    if (ventaCliente) {
      setSelectedClienteTotalVentas(ventaCliente.venta_total);
    } else {
      setSelectedClienteTotalVentas(0);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/ventaxcategoria"
        );
        const ventaxcategoria = response.data.map((venta) => ({
          ...venta,
          descripcion_categoria: venta.descripcion_categoria.toString(),
          total_ventas_categoria: parseFloat(venta.total_ventas_categoria),
        }));
        setVentaXcategoria(ventaxcategoria);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoriaChange = (e) => {
    const categoria = e.target.value;
    setSelectedCategoria(categoria);
    const ventaCategoria = ventaxcategoria.find(
      (venta) => venta.descripcion_categoria === categoria
    );
    if (ventaCategoria) {
      setTotalVentasSeleccionada(ventaCategoria.total_ventas_categoria);
    } else {
      setTotalVentasSeleccionada(0);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/ventatotalxcategoria"
        );
        const ventatotalxcategoria = response.data.map((venta) => ({
          ...venta,
          descripcion_categoria: venta.descripcion_categoria.toString(),
          total_ventas_categoria_formatted: parseFloat(venta.total_ventas_categoria),
        }));
        setVentaTotalXcategoria(ventatotalxcategoria);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/verempleadoxventa" , {
        });
        const ventaxempleado = response.data.map((empleado) => ({
          ...empleado,
          nombre_empleado: empleado.nombre_empleado.toString(),
          total_ventas: parseInt(empleado.total_ventas),
          precioTotal_venta:(empleado.precioTotal_venta),
        }));

        // const empleadosFiltrados = ventaxempleado.filter((empleado) => empleado.Id_sucursal === selectedSucursal);
        setVentaXempleado(ventaxempleado);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, []);

  const handleNumeroVentasXempleadoChange = (e) => {
    const empleado = e.target.value;
    setSelectedNumeroVentasXempleado(empleado);
    const ventaXempleado = ventaxempleado.find(
      (empleados) => empleados.nombre_empleado === empleado
    );
    if (ventaXempleado) {
      setTotalVentasXempleado(ventaXempleado.total_ventas);
      setTotalVentasXempleado2(ventaXempleado.precioTotal_venta);
    } else {
      setTotalVentasXempleado(0);
      setTotalVentasXempleado2(0);
    }
  };







  const handleDepartamentoChange = (e) => {
    const departamento = e.target.value;
    setSelectedDepartamento(departamento);
    const ventaDepartamento = ventatotalxcategoria.find(
      (venta) => venta.descripcion_categoria === departamento
    );
    if (ventaDepartamento) {
      setTotalVentasDepartamento(ventaDepartamento.total_ventas_categoria_formatted.toLocaleString("es-Es"));
    } else {
      setTotalVentasDepartamento(0);
    }
  };


  const Colors = [
    "#ce93d8",
    "#5c6bc0",
    "#b39ddb",
    "#4dd0e1",
    "#f48fb1",
    "#d500f9",
  ];

  return (
    <>
      <App />

      <div className="h3-ventas">
        <h1>REPORTES</h1>
      </div>
      <label className='lbl-corte'>Reporte iniciado de la fecha: {formatDate(fechaSeleccionada)}</label><br />
      <DatePicker
        selected={fechaSeleccionada}
        onChange={(date) => {
            console.log("Fecha seleccionada:", date)
            setFechaSeleccionada(date)
        }}
        className='form-control custom-date-picker custom-datepicker-wrapper'
        dateFormat="yyyy/MM/d"
        locale={es}
        placeholderText='Ingrese una fecha'
    />
      {/* NUMERO DE VENTAS TOTALES POR DEPARTAMENTO */}
      
      <h2 className="titulosreportes" style={{marginTop: '100px'}}>NUMERO DE VENTAS TOTALES POR DEPARTAMENTO</h2>
      <div className="row">
        <div className="col-5">
          <div style={{ width: "100%", height: 500 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  dataKey="total_ventas_categoria"
                  nameKey="descripcion_categoria"
                  data={ventaxcategoria}
                  innerRadius={120}
                  outerRadius={200}
                  fill="#82ca9d"
                >
                  {ventaxcategoria.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={Colors[index % Colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-6" style={{ marginTop: "20px" }}>
          <div className="col-12 mx-auto text-start mt-5">
            <b>
              <label className="categoriaSelect">
                Selecciona una categorÃ­a:
              </label>
            </b>
            <select
              className="form-select form-select-lg mb-3"
              id="categoriaSelect"
              value={selectedCategoria}
              onChange={handleCategoriaChange}
            >
              <option value="">--Selecciona una categorÃ­a--</option>
              {ventatotalxcategoria.map((venta, index) => (
                <option key={index} value={venta.descripcion_categoria}>
                  {venta.descripcion_categoria}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 mx-auto text-start mt-5">
            <b>
              <label className="totaldventas">Total de ventas:</label>
            </b>
            <input
              type="text"
              className="form-control form-control-lg mb-3"
              value={totalVentasSeleccionada}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* ACA TERMINA EL GRAFICO DE TORTA */}

      {/* ACA EMPIEZA EL GRAFICO DE BARRA DE MONTO DE VENTAS TOTALES POR METODO DE PAGO */}
      <h2 style={{ marginTop: "150px" }} className="titulosreportes">MONTO DE VENTAS TOTALES POR METODO DE PAGO</h2><br />
      <div className="row">
        <div className="col-6">
          <ResponsiveContainer width="100%" aspect={2}>
            <BarChart
              data={ventaXmetodoPago}
              width={500}
              height={300}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              barSize={55}
            >
              <CartesianGrid strokeDasharray="4 1 2" />
              <XAxis dataKey="tipo_metodo_pago" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tipo_metodo_pago" fill="#6b48ff" />
              <Bar dataKey="monto_total" fill="#1ee3cf" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="col-6" style={{ marginTop: "20px" }}>      
          <div className="col-10 mx-auto text-center mt-5">
            <b>
              <label className="metodoPagoSelect">
                Selecciona un mÃ©todo de pago:
              </label>
            </b>
            <select
              className="form-select form-select-lg "
              id="metodoPagoSelect"
              value={selectedMetodoPago}
              onChange={handleMetodoPagoChange}
            >
              <option value="">--Selecciona un mÃ©todo de pago--</option>
              {ventaXmetodoPago.map((venta, index) => (
                <option key={index} value={venta.tipo_metodo_pago}>
                  {venta.tipo_metodo_pago}
                </option>
              ))}
            </select>
          </div>

          <div className="col-10 mx-auto mt-5 text-start">
            <b>
              <label className="totalVentasMetodoPago">Total de ventas:</label>
            </b>
            <input
              type="text"
              className="form-control form-control-lg mb-3"
              value={"$" + totalVentasMetodoPago}
              readOnly
            />
          </div>
        </div>
      </div>
      {/* ACA TERMINA EL GRAFICO DE MONTO DE VENTAS TOTALES POR METODO DE PAGO */}


      {/* ACA COMIENZA EL GRAFICO DE VENTAS TOTALES POR DEPARTAMENTO */}
      <h2 style={{ marginTop: "120px" }} className="titulosreportes">VENTAS TOTALES POR DEPARTAMENTO</h2><br />
      <div className="row">
        <div className="col-6">
      <ResponsiveContainer width="100%" aspect={2}>
        <BarChart
          data={ventatotalxcategoria}
          width={500}
          height={300}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          
        >
          <CartesianGrid strokeDasharray="4 1 2" />
          <XAxis dataKey="descripcion_categoria" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="descripcion_categoria" fill="#1ee3cf" />
          <Bar dataKey="total_ventas_categoria" fill="#6b48ff" />
        </BarChart>
      </ResponsiveContainer>
      </div>

      <div className="col-6" style={{ marginTop: "20px" }}>
          <div className="col-10 mx-auto text-start mt-5">
            <b>
              <label className="departamentoSelect">
                Selecciona un departamento:
              </label>
            </b>
            <select
              className="form-select form-select-lg mb-3"
              id="departamentoSelect"
              value={selectedDepartamento}
              onChange={handleDepartamentoChange}
            >
              <option value="">--Selecciona un departamento--</option>
              {ventatotalxcategoria.map((venta, index) => (
                <option key={index} value={venta.descripcion_categoria}>
                  {venta.descripcion_categoria}
                </option>
              ))}
            </select>
          </div>
        

          <div className="col-10 mx-auto text-start mt-5">
            <b>
              <label className="totalVentasDepartamento">Total de ventas:</label>
            </b>
            <input
              type="text"
              className="form-control form-control-lg mb-3"
              value={"$" + totalVentasDepartamento}
              readOnly
            />
          </div>
        </div>
      </div>


      {/* ACA EMPIEZA EL GRAFICO DE CLIENTE */}
      <h2 style={{ marginTop: "120px" }} className="titulosreportes">CLIENTE CON MAYOR VENTA</h2><br />
      <div className="row">
        <div className="col-6">
      <ResponsiveContainer width="100%" aspect={2}>
        <BarChart
          data={ventaxcliente}
          width={500}
          height={300}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          barSize={60}
        >
          <CartesianGrid strokeDasharray="4 1 2" />
          <XAxis dataKey="nombre_cliente" />
          <YAxis domain={[0, "auto"]} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Bar
            dataKey="venta_total"
            fill="#1ee3cf"
            label={{
              position: "top",
              formatter: (value, entry, index) => `${value}%`,
            }}
          />
        </BarChart>
      </ResponsiveContainer>
</div>
      
    <div className="col-6">
      <div className="col-8" style={{ marginTop: "20px" }}>
          <div className="col-12 mx-auto text-start mt-3">
            <b>
              <label className="clienteSelect">Selecciona un cliente:</label>
            </b>
            <select
              className="form-select form-select-lg mb-3"
              id="clienteSelect"
              value={selectedCliente}
              onChange={handleClienteChange}
            >
              <option value="">--Selecciona un cliente--</option>
              {ventaxcliente.map((venta, index) => (
                <option key={index} value={venta.nombre_cliente}>
                  {venta.nombre_cliente}
                </option>
              ))}
            </select>
          </div>


          <div className="col-12 mx-auto text-start mt-5">
            <b>
              <label className="totalVentasCliente">Total de ventas:</label>
            </b>
            <input
              type="text"
              className="form-control form-control-lg mb-3"
              value={selectedClienteTotalVentas}
              readOnly
            />
          </div>
        </div>
        </div>
      </div>
      {/* ACA TERMINA EL GRAFICO DE CLIENTE */}


      <h2 style={{ marginTop: "150px" }} className="titulosreportes">NUMERO DE VENTAS POR EMPLEADO</h2><br />
      <div className="row">
        <div className="col-5">
          <ResponsiveContainer width="100%" aspect={2}>
            <BarChart
              data={ventaxempleado}
              width={500}
              height={300}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              barSize={60}
            >
              <CartesianGrid strokeDasharray="4 1 2" />
              <XAxis dataKey="nombre_empleado" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total_ventas" fill="#1ee3cf" />
              <Bar dataKey="precioTotal_venta" fill="#6b48ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>


         <div className="col-3">
          <div className="col-10 mx-auto text-center mt-5"></div>
          <b><label>Selecciona una sucursal:</label></b>
          <select className="form-select form-select-lg" value={selectedSucursal} onChange={(e) => setSelectedSucursal(e.target.value)}>

          <option value="">--Selecciona una sucursal--</option>
          {sucursales.map((sucursal, index) =>(
            <option key={index} value={sucursal.Id_sucursal}>
              {sucursal.nombre_sucursal}
            </option>
          ))}
          </select> 
          </div>     


        <div className="col-6" style={{ marginTop: "20px" }}>      
          <div className="col-10 mx-auto text-center mt-5">
            <b>
              <label className="lbl-empleado">
                Selecciona un empleado:
              </label>
            </b>
            <select
              className="form-select form-select-lg "
              id="metodoPagoSelect"
              value={selectedNumeroVentasXempleado}
              onChange={handleNumeroVentasXempleadoChange}
            >
              <option value="">--Selecciona un empleado--</option>
              {ventaxempleado.map((empleado, index) => (
                <option key={index} value={empleado.nombre_empleado}>
                  {empleado.nombre_empleado}
                </option>
              ))}
            </select>
          </div>

          <div className="col-10 mx-auto mt-5 text-start">
            <b>
              <label className="totalVentasMetodoPago">Total de ventas:</label>
            </b>
            <input
              type="text"
              className="form-control form-control-lg mb-3"
              value={totalVentasXempleado}
              readOnly
            />
            <label className="totalVentasMetodoPago"><b>Total de Ventas en $:</b></label>
            <input
              type="text"
              className="form-control form-control-lg mb-3"
              value={"$" + totalVentasXempleado2}
              readOnly
            />
          </div>
        </div>
      </div>
    </>
  );
}