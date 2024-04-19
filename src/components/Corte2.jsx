import React, { useEffect, useState } from 'react'
import App from '../App'
import { faDollar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons'
import { faTags } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faChartSimple} from '@fortawesome/free-solid-svg-icons'
import { faScissors } from '@fortawesome/free-solid-svg-icons'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons'
import Table from 'react-bootstrap/Table';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es';


const Corte2 = () => {

const [ventas, setVentas] = useState([]);
const [ventaxcategoria, setVentaXcategoria] = useState([]);
const [ventaxcliente, setVentaXcliente] = useState([]);
const [ingresoEfectivo, setIngresoEfectivo] = useState([]);
const [egresoEfectivo, setEgresoEfectivo] = useState([])
const [ganancia, setGanancia] = useState(0);
const [importe, setImporte] = useState(0);
const [ganancia2, setGanancia2] = useState([]);
const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());

useEffect(() => {
    fetch('http://localhost:3001/ventatotal').then(response => response.json())
        .then(data => setVentas(data))
            .catch(error => console.error('error al obtener los datos: ', error))
}, []);


useEffect(() =>{
    fetch('http://localhost:3001/ventatotalxcategoria').then(response => response.json())
        .then(data => setVentaXcategoria(data))
            .catch(error => console.error('error al obtener los datos: ', error))
}, [])

useEffect(() => {
    fetch('http://localhost:3001/ventaxcliente').then(response => response.json())
        .then(data => setVentaXcliente(data))
            .catch(error => console.error('error al obtener los datos: ', error))        
}, [])

useEffect(() => {
  fetch('http://localhost:3001/importeventatotal').then(response => response.json())
      .then(data => setImporte(data))
          .catch(error => console.error('error al obtener los datos: ', error))        
}, [])

useEffect(() => {
  fetch('http://localhost:3001/vergananciaxdep').then(response => response.json())
      .then(data => setGanancia2(data))
          .catch(error => console.error('error al obtener los datos: ', error))        
}, [])

useEffect(() => {
    fetch('http://localhost:3001/veringresoefectivo').then(response => response.json())
        .then(data => setIngresoEfectivo(data))
            .catch(error => console.error('error al obtener los datos: ', error))        
  }, [])
  
useEffect(() => {
    fetch('http://localhost:3001/veregresoefectivo').then(response => response.json())
        .then(data => setEgresoEfectivo(data))
            .catch(error => console.error('error al obtener los datos: ', error))        
  }, [])  



  const fetchVentaTotal = () => {
    const formattedDate = formatDate(fechaSeleccionada);
    fetch(`http://localhost:3001/ventatotal?formattedDate=${formattedDate}`)
      .then((response) => response.json())
      .then((data) => setVentas(data))
      .catch((error) => console.error('Error al obtener los datos del corte del día:', error));
  };

  const fetchVentaTotalxCategoria = () => {
    const formattedDate = formatDate(fechaSeleccionada);
    fetch(`http://localhost:3001/ventatotalxcategoria?formattedDate=${formattedDate}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos recibidos de fetchVentaTotalxCategoria:", data); // Verifica los datos recibidos
        setVentaXcategoria(data);
      })
      .catch((error) => console.error('Error al obtener los datos de venta por categoría:', error));
  };

  const fetchVerGanancia = () => {
    const formattedDate = formatDate(fechaSeleccionada);
    fetch(`http://localhost:3001/verganancia?formattedDate=${formattedDate}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Datos recibidos de fetchganancia:", data); 
        const ganancia = parseFloat(data[0].ganancia_total);
        if (!isNaN(ganancia)) {
          setGanancia(ganancia);
        } else {
          console.error('Error: el valor de ganancia no es un número válido:', data[0].ganancia_total);
          setGanancia(0); // Maneja el error estableciendo la ganancia como 0
        }
      })
      .catch((error) => {
        console.error('Error al obtener los datos de ganancia:', error);
        setGanancia(0); // Maneja el error estableciendo la ganancia como 0
      });
  };

  const fetchVerImporte = () => {
    const formattedDate = formatDate(fechaSeleccionada);
     fetch(`http://localhost:3001/importeventatotal?formattedDate=${formattedDate}`)
     .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("Datos recibidos de fetchImporte:", data); 
      const importe = parseFloat(data[0].importe_total_venta);
      if (!isNaN(importe)) {
        setImporte(importe);
      } else {
        console.error('Error: el valor de importe no es un número válido:', data[0].importe_total_venta);
        setImporte(0); // Maneja el error estableciendo la ganancia como 0
      }
    })
    .catch((error) => {
      console.error('Error al obtener los datos de importe:', error);
      setImporte(0); // Maneja el error estableciendo la ganancia como 0
    });
  }

  const fetchVentaxcliente = () => {
    const formattedDate = formatDate(fechaSeleccionada);
    fetch(`http://localhost:3001/ventaxcliente?formattedDate=${formattedDate}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos recibidos de fetchVentaCliente:", data); // Verifica los datos recibidos
        setVentaXcliente(data);
      })
      .catch((error) => console.error('Error al obtener los datos de venta por cliente:', error));
  };

  const fetchGananciaxdep = () => {
    const formattedDate = formatDate(fechaSeleccionada);
     fetch(`http://localhost:3001/vergananciaxdep?formattedDate=${formattedDate}`)
     .then((response) => response.json())
      .then((data) => {
        console.log("Datos recibidos de fetchGanancia2:", data); 
       setGanancia2(data);
      })
      .catch((error) => console.error('Error al obtener los datos de ganancia2:', error));
  }

  const fetchEntradaEfect = () => {
    const formattedDate = formatDate(fechaSeleccionada);
     fetch(`http://localhost:3001/veringresoefectivo?formattedDate=${formattedDate}`)
     .then((response) => response.json())
      .then((data) => {
        console.log("Datos recibidos de fetchEntradaEfect:", data); 
       setIngresoEfectivo(data);
      })
      .catch((error) => console.error('Error al obtener los datos de ingresoEfect:', error));
  }

  const fetchSalidaEfect = () => {
    const formattedDate = formatDate(fechaSeleccionada);
     fetch(`http://localhost:3001/veregresoefectivo?formattedDate=${formattedDate}`)
     .then((response) => response.json())
      .then((data) => {
        console.log("Datos recibidos de fetchSalidaEfect:", data); 
       setEgresoEfectivo(data);
      })
      .catch((error) => console.error('Error al obtener los datos de salidaEfect:', error));
  }
  

  

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (date) => {
    setFechaSeleccionada(date);
  };

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  const limpiarDatos = () => {
    setVentas([]);
    setVentaXcategoria([]);
    setVentaXcliente([]);
    setIngresoEfectivo([]);
    setEgresoEfectivo([]);
    setGanancia(0);
    setImporte(0);
    setGanancia2([]);
};

  useEffect(() => {
    fetchVentaTotal();
    fetchVentaTotalxCategoria();
    fetchVerGanancia();
    fetchVerImporte();
    fetchVentaxcliente();
    fetchGananciaxdep();
    fetchEntradaEfect();
    fetchSalidaEfect();
  }, [fechaSeleccionada]);
  return (
    <>
<App />

<div className='h3-ventas'>
    <h1 className='h3-corte'>CORTE</h1>
</div>

<div className='calendario'>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label className='lbl-corte'>Corte iniciado de la fecha: {formatDate(fechaSeleccionada)}</label>
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
        <div style={{ marginTop: '10px' }}>
            <button className='btn-corte' onClick={limpiarDatos}><FontAwesomeIcon icon={faScissors}></FontAwesomeIcon> Corte del día</button>
            <button className='btn-imprimir' onClick={handlePrint}><FontAwesomeIcon icon={faPrint}></FontAwesomeIcon> Imprimir</button>
        </div>
    </div>
</div>
<br />

<div className="content-wrapper" style={{ display: 'flex', gap: '100px' }}>
    <div className="column">
        <div className="sales-container">
            <h3 className='h3'><FontAwesomeIcon icon={faDollar}></FontAwesomeIcon> VENTAS TOTALES: {formatCurrency(importe)} </h3>
            <h3 className='h3'><FontAwesomeIcon icon={faChartSimple}></FontAwesomeIcon> GANANCIA: {formatCurrency(ganancia)} </h3>
            <br />
            <h3 className='h3'><FontAwesomeIcon icon={faBasketShopping}></FontAwesomeIcon> VENTAS: </h3>
            <div className="table-container">
                <Table striped bordered hover className='table-dark'>
                    <thead>
                        <tr>
                            <th>TIPO</th>
                            <th>MONTO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map(venta => (
                            <tr key={venta.tipo_metodoPago}>
                                <td>{venta.tipo_metodo_pago}</td>
                                <td>{formatCurrency(venta.monto_total)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <br />
            <h3 className='h3'><FontAwesomeIcon icon={faTags}></FontAwesomeIcon> VENTAS POR DEPARTAMENTOS:</h3>
            <div className="table-container">
                <Table striped bordered hover className='table-dark'>
                    <thead>
                        <tr>
                            <th>DESCRIPCION</th>
                            <th>MONTO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventaxcategoria.map(venta => (
                            <tr key={venta.descripcion_categoria}>
                                <td>{venta.descripcion_categoria}</td>
                                <td>{formatCurrency(venta.monto_total_ventas_categoria)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    </div>

    <div className="clients-container">
            <h3 className='h3-clientes'><FontAwesomeIcon icon={faArrowUpFromBracket} rotation={180}></FontAwesomeIcon> ENTRADA DE EFECTIVO:</h3>
            <div className="table-container-clientes">
                <Table striped bordered hover className='table-dark'>
                    <thead>
                        <tr>
                            <th>DESCRIPCION</th>
                            <th>MONTO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingresoEfectivo.map(venta => (
                         <tr key={venta.DescripcionIngreso}>
                            <td>{venta.DescripcionIngreso}</td>
                            <td>{formatCurrency(venta.montoTotalIngreso)}</td>
                         </tr>
                        ))}
                    </tbody>
                </Table>
            </div>  
        </div>

        <div className="">
            <h3 className='h3-clientes'><FontAwesomeIcon icon={faArrowUpFromBracket}></FontAwesomeIcon> SALIDA DE EFECTIVO:</h3>
            <div className="table-container-clientes">
                <Table striped bordered hover className='table-dark'>
                    <thead>
                        <tr>
                            <th>DESCRIPCION</th>
                            <th>MONTO</th>
                        </tr>
                    </thead>
                    <tbody>
                {egresoEfectivo
                    .filter(egreso => egreso.montoTotalEgreso !== null && egreso.DescripcionEgreso !== null) // Filtra filas con valores nulos
                    .map(venta => (
                        <tr key={venta.DescripcionEgreso}>
                            <td>{venta.DescripcionEgreso}</td>
                            <td>{formatCurrency(venta.montoTotalEgreso)}</td>
                        </tr>
                    ))}
            </tbody>
                </Table>
            </div>  
        </div>

        

    <div className="column">
        <div className="ganancia-container">
            <h3 className='h3-clientes'><FontAwesomeIcon icon={faChartSimple}></FontAwesomeIcon> GANANCIA POR DEPARTAMENTO:</h3>
            <div className="table-container-clientes">
                <Table striped bordered hover className='table-dark'>
                    <thead>
                        <tr>
                            <th>DEPARTAMENTO</th>
                            <th>GANANCIA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ganancia2.map(venta => (
                         <tr key={venta.nombre_categoria}>
                            <td>{venta.nombre_categoria}</td>
                            <td>{formatCurrency(venta.ganancia_por_categoria)}</td>
                         </tr>
                        ))}
                    </tbody>
                </Table>
            </div>  
        </div>

        <div className="clients-container">
            <h3 className='h3-clientes'><FontAwesomeIcon icon={faUsers}></FontAwesomeIcon> CLIENTES CON MAS VENTAS:</h3>
            <div className="table-container-clientes">
                <Table striped bordered hover className='table-dark'>
                    <thead>
                        <tr>
                            <th>NOMBRES CLIENTES</th>
                            <th>MONTO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventaxcliente.map(venta => (
                         <tr key={venta.nombre_cliente}>
                            <td>{venta.nombre_cliente}</td>
                            <td>{formatCurrency(venta.monto_total_venta)}</td>
                         </tr>
                        ))}
                    </tbody>
                </Table>
            </div>  
        </div>
    </div>
</div>
</>
  )
}

export default Corte2

