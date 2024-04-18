const {connection} = require("../database/config")

const verDetalleVenta = (req,res) =>{
    connection.query(`SELECT 
                    dv.Id_detalleVenta, dv.descripcion_detalleVenta, dv.ventasTotales_detalleVenta, dv.ganacia_detalleVenta,
                    p.nombre_producto, p.descripcion_producto, p.precioVena, p.cantidad_producto,
                    v.Id_venta
                    FROM DetalleVenta dv
                    INNER JOIN Venta v ON dv.Id_venta = v.Id_venta
                    INNER JOIN Producto p ON dv.Id_producto = p.Id_producto;`,
    (error,results)=>{
        if(error) throw error
        res.json(results)
    })
}

const crearDetalleVenta = (req, res) => {  
    const detalleVentaData = {
        Id_venta: req.body.Id_venta,
        descripcion_detalleVenta: req.body.descripcion_detalleVenta,
        ventasTotales_detalleVenta: req.body.ventasTotales_detalleVenta,
        ganacia_detalleVenta: req.body.ganacia_detalleVenta,
        Id_producto: req.body.Id_producto,     
        CantidadVendida: req.body.CantidadVendida,
        Id_caja: req.body.Id_caja,
        IdEstadoCredito: req.body.IdEstadoCredito       
    };

    connection.query("INSERT INTO DetalleVenta SET ?", detalleVentaData, (error, results) => {
        if (error) {
            console.log('Error al crear detalle de venta:', error);
            return res.status(500).json({ success: false, error: 'Error al crear detalle de venta' });
        }
        console.log('Detalle de venta creado correctamente');
        res.status(200).json({ success: true, message: 'Detalle de venta creado correctamente', data: results });
    });
};


const eliminarDetalleVenta = (req, res) => { 
  const Id_venta = req.params.Id_venta;
  connection.query('DELETE FROM detalleventa WHERE Id_venta = ?', [Id_venta], (error, results) => {
      if (error) throw error;
      res.json(results);
  });
};


  
const ultimoDetalle = (req, res) => {
  const Id_sucursal = req.params.Id_sucursal;
    connection.query( ` SELECT 
    v.Id_venta, 
    v.precioTotal_venta, 
    p.Id_producto, 
    dv.Id_detalleVenta, 
    dv.CantidadVendida 
  FROM 
    Venta v
  INNER JOIN 
    detalleventa dv ON v.Id_venta = dv.Id_venta
  INNER JOIN 
    Producto p ON dv.Id_producto = p.Id_producto
  INNER JOIN 
    Cliente c ON v.Id_cliente = c.Id_cliente
  INNER JOIN 
    MetoPago mt ON v.Id_metodoPago = mt.Id_metodoPago
  INNER JOIN 
    Usuarios u ON v.Id_usuario = u.Id_usuario
  WHERE 
    v.Id_sucursal = ? 
    AND
    v.Id_venta = (
      SELECT 
        d.Id_venta 
      FROM 
        detalleventa d
      INNER JOIN 
        Venta v ON d.Id_venta = v.Id_venta
      WHERE 
        v.Id_sucursal = ?
      GROUP BY 
        d.Id_venta
      HAVING 
        COUNT(*) >= 1
      ORDER BY 
        MAX(v.fecha_registro) DESC
      LIMIT 1
    )
  ORDER BY
    v.fecha_registro DESC;
  ;`,[Id_sucursal ,Id_sucursal], (error, results) => {
      if (error) {
        console.error("Error al obtener las ventas:", error);
        res.status(500).send("Error interno del servidor al obtener las ventas");
        return;
      }  
      // Agrupar productos por Id_venta
      const ventasAgrupadas = results.reduce((acc, item) => {
        // Si no existe la venta en el acumulador, agregarla
        if (!acc[item.Id_venta]) {
          acc[item.Id_venta] = {
            Id_venta: item.Id_venta,
            precioTotal_venta: item.precioTotal_venta,
            fecha_registro: item.fecha_registro,
            productos: []
          };
        }      
        // Verificar si el producto ya se agregó a la venta
        const productoExistente = acc[item.Id_venta].productos.find(producto => producto.Id_producto === item.Id_producto);
        if (productoExistente) {
          // Si el producto ya está en la venta, actualizar su cantidad
          productoExistente.cantidadVendida += item.cantidadVendida;
        } else {
          // Si el producto no está en la venta, agregarlo
          acc[item.Id_venta].productos.push({
            Id_producto: item.Id_producto,
            nombre_producto: item.nombre_producto,
            precioVenta: item.precioVenta, 
            cantidadVendida: item.CantidadVendida, 
            Id_detalleVenta: item.Id_detalleVenta,
          });
        }
        return acc;
      }, {});
  
      // Convertir el objeto agrupado en un array
      const ventas = Object.values(ventasAgrupadas);
      res.json(ventas);
    });
  };
  


module.exports = {verDetalleVenta,crearDetalleVenta,eliminarDetalleVenta,ultimoDetalle}