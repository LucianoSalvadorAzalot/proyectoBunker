const {connection} = require("../database/config")

const ventaTotal = (req, res) => {
    const fechaSeleccionada = req.query.formattedDate;
    console.log('Fecha seleccionada:', fechaSeleccionada); 
    connection.query(
      `SELECT 
        metopago.tipo_metodoPago AS tipo_metodo_pago, 
        SUM(venta.precioTotal_venta) AS monto_total 
      FROM 
        venta 
      INNER JOIN 
        metopago ON venta.Id_metodoPago = metopago.Id_metodoPago 
      WHERE 
        DATE(venta.fecha_registro) = ?
      GROUP BY 
        metopago.tipo_metodoPago;`, [fechaSeleccionada], (error, results) => {
        if (error) throw error;
        res.json(results);
      }
    );
  }
  
  
  const verVentaXMes = (req, response) => {
    connection.query("SELECT * FROM venta WHERE MONTH(fecha_registro) = 4",
    (error, results) =>{                                                                                                                                                                                                               
      if(error) throw error;
      response.json(results);
    }
  )
  }
  
  const ventaxCategoria = (req,res) =>{
    connection.query('SELECT c.descripcion_categoria, COUNT(*) AS total_ventas_categoria FROM Venta v JOIN DetalleVenta dv ON v.Id_venta = dv.Id_venta JOIN Producto p ON dv.Id_producto = p.Id_producto JOIN Categoria c ON p.Id_categoria = c.Id_categoria GROUP BY c.descripcion_categoria',
    (error,results) =>{                                                                                                                                                                                                               
        if(error)throw error
        res.json(results)
    }
    )
  }
  
  const ventatotalxCategoria = (req, res) => {
    const fechaSeleccionada = req.query.formattedDate;
    connection.query(
      `SELECT 
      c.descripcion_categoria, 
      SUM(dv.CantidadVendida * p.precioVenta) AS monto_total_ventas_categoria 
      FROM 
      Venta v 
      JOIN 
      DetalleVenta dv ON v.Id_venta = dv.Id_venta 
      JOIN 
      Producto p ON dv.Id_producto = p.Id_producto 
      JOIN 
      Categoria c ON p.Id_categoria = c.Id_categoria 
      WHERE 
      DATE(v.fecha_registro) = ? 
      GROUP BY 
      c.descripcion_categoria;`,
      [fechaSeleccionada], // Pasa la fecha como parámetro para evitar inyección de SQL
      (error, results) => {                                                                                                                                                                                                               
        if (error) throw error;  // Asegúrate de manejar adecuadamente los errores
        res.json(results);
      }
    );
  };
  
  const verGanancia = (req, res) => {
    const fechaSeleccionada = req.query.formattedDate;
    connection.query(
      `SELECT 
          SUM((p.precioVenta - p.precioCompra) * dv.CantidadVendida) AS ganancia_total
       FROM 
          venta v
       INNER JOIN 
          detalleventa dv ON v.Id_venta = dv.Id_venta
       INNER JOIN 
          producto p ON dv.Id_producto = p.Id_producto
       WHERE 
          DATE(v.fecha_registro) = ?;`,
      [fechaSeleccionada], 
      (error, results) => {                                                                                                                                                                                                               
        if (error) throw error;
        res.json(results);
      }
    );
  };
  
  
  
  
  const ventaxCliente = (req, res) => {
    const fechaSeleccionada = req.query.formattedDate;
    connection.query(
      `SELECT 
        c.nombre_cliente, 
        SUM(v.precioTotal_venta) AS monto_total_venta 
      FROM 
        Venta v 
      JOIN 
        Cliente c ON v.Id_cliente = c.Id_cliente 
      WHERE 
        DATE(v.fecha_registro) = ? 
      GROUP BY 
        c.nombre_cliente;`,
        [fechaSeleccionada],
      (error, results) => {
        if (error) throw error;
        res.json(results);
      }
    );
  }
  
  
  const verEmpleadoConVenta = (req, response) => {
    connection.query(
      `SELECT
      u.nombre_usuario AS nombre_empleado,
      COUNT(v.Id_venta) AS total_ventas,
      SUM(v.precioTotal_venta) AS precioTotal_venta
      FROM
      usuarios u
      LEFT JOIN
      venta v ON v.Id_usuario = u.Id_usuario
      WHERE
      u.rol_usuario = 'empleado'
      AND (u.Id_sucursal = 1 OR v.Id_venta IS NULL)
      GROUP BY
      u.nombre_usuario`,
      (error, results) => {                                                                                                                                                                                                               
        if(error) throw error;
        response.json(results);
      }
    );
  };
  
  const importeVentaTotal = (req, res) => {
    const fechaSeleccionada = req.query.formattedDate;
    connection.query(
      `SELECT 
      SUM(precioTotal_venta) AS importe_total_venta 
      FROM 
      Venta 
      WHERE 
      DATE(fecha_registro) = ?`, 
      [fechaSeleccionada], 
      (error, results) => {                                                                                                                                                                                                              
        if (error) throw error;
        res.json(results);
      }
    );
  };
  
  const GananciaXdepartamento = (req, res) => {
    const fechaSeleccionada = req.query.formattedDate;
    connection.query(`
        SELECT 
            c.nombre_categoria,
            SUM((p.precioVenta - p.precioCompra) * dv.CantidadVendida) AS ganancia_por_categoria
        FROM 
            venta v
        INNER JOIN 
            detalleventa dv ON v.Id_venta = dv.Id_venta
        INNER JOIN 
            producto p ON dv.Id_producto = p.Id_producto
        INNER JOIN 
            categoria c ON p.id_categoria = c.Id_categoria
        WHERE 
            DATE(v.fecha_registro) = ?
        GROUP BY 
            c.nombre_categoria;
        `,
        [fechaSeleccionada], 
        (error, results) => {
          if (error) throw error;
          res.json(results);
        }
    );
  }

  const verEntradaEfectivo = (req, response) => {
    const fechaSeleccionada = req.query.formattedDate;
    connection.query(
        'SELECT montoTotalIngreso, DescripcionIngreso  FROM ingreso WHERE DATE(fecha_registro) = ?;',
        [fechaSeleccionada],
        (error, results) => {
            if (error) {
                return response.status(500).json({ error: 'Error al obtener la entrada de efectivo.' });
            }
            response.json(results);
        }
    );
};

const verEgresoEfectivo = (req,response) =>{
  const fechaSeleccionada = req.query.formattedDate;
  connection.query(
      'SELECT montoTotalEgreso, DescripcionEgreso  FROM egreso WHERE DATE(fecha_registro) = ?;',
      [fechaSeleccionada],
      (error, results) => {
          if (error) {
              return response.status(500).json({ error: 'Error al obtener la salida de efectivo.' });
          }
          response.json(results);
      }
  );
};






module.exports = {ventaTotal,verVentaXMes,ventaxCategoria,ventatotalxCategoria,verGanancia,ventaxCliente,verEmpleadoConVenta,importeVentaTotal,GananciaXdepartamento,verEntradaEfectivo,verEgresoEfectivo}