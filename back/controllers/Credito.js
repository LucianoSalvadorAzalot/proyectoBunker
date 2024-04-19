const {connection} = require('../database/config')




const verElCreditoCompleto = (req, res) => {
    const Id_cliente = req.params.Id_cliente
    connection.query(`
    SELECT v.Id_venta, v.precioTotal_venta, v.fecha_registro, c.Id_cliente, c.nombre_cliente, mp.tipo_metodoPago,
    p.Id_producto, p.nombre_producto,  p.precioVenta, dv.CantidadVendida, dv.Id_detalleVenta,
    u.nombre_usuario,
    e.tipoEstado
    FROM venta v
    JOIN cliente c ON v.Id_cliente = c.Id_cliente
    JOIN detalleventa dv ON v.Id_venta = dv.Id_venta
    JOIN producto p ON dv.Id_producto = p.Id_producto
    JOIN metopago mp ON v.Id_metodoPago = mp.Id_metodoPago
    JOIN usuarios u ON v.Id_usuario = u.Id_usuario
    JOIN EstadoCredito e ON dv.IdEstadoCredito = e.IdEstadoCredito
    WHERE mp.tipo_metodoPago = 'credito'
    AND c.Id_cliente = ?
    AND e.IdEstadoCredito = 2;
         
    `, [Id_cliente], (error, results) => {
      if (error) {
        console.error("Error al obtener las ventas del cliente:", error);
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
            tipoEstado: item.tipoEstado,
            cliente: {
              Id_cliente: item.Id_cliente,
              nombre_cliente: item.nombre_cliente,
            },
            metodoPago: {
              tipo_metodoPago: item.tipo_metodoPago,
            },
            usuarios:{
              nombre_usuario: item.nombre_usuario
            },
            productos: []
          };
        }
        
        // Verificar si el producto ya se agregó a la venta
        const productoExistente = acc[item.Id_venta].productos.find(producto => producto.Id_producto === item.Id_producto);
        if (productoExistente) {
          // Si el producto ya está en la venta, actualizar su cantidad
          productoExistente.CantidadVendida += item.CantidadVendida;
        } else {
          // Si el producto no está en la venta, agregarlo
          acc[item.Id_venta].productos.push({
            Id_producto: item.Id_producto,
            nombre_producto: item.nombre_producto,
            descripcion_producto: item.descripcion_producto,
            precioVenta: item.precioVenta, // Asegúrate de usar el nombre correcto de la columna aquí
            CantidadVendida: item.CantidadVendida, 
            Id_detalleVenta: item.Id_detalleVenta,
            descripcion_detalleVenta: item.descripcion_detalleVenta,
          });
        }
        return acc;
      }, {});
  
      // Convertir el objeto agrupado en un array
      const ventas = Object.values(ventasAgrupadas);
      res.json(ventas);
    });
  };





const estadoCreditoVenta = (req,res) =>{
  const Id_venta = req.params.Id_venta
  connection.query("UPDATE detalleVenta SET IdEstadoCredito = 1 WHERE IdEstadoCredito = 2 AND Id_venta = ?",[Id_venta] , 
(error,results)=>{
  if(error) throw error
  res.json(results)
})

}


const RestarCredito = (req, res) => {
  const Id_cliente = req.body.Id_cliente;
  const montoCredito = req.body.montoCredito;
  
  connection.query("UPDATE Cliente SET montoCredito = montoCredito - ? WHERE Id_cliente = ?", [montoCredito, Id_cliente],
      (error) => {
          if (error) {
              console.error("Error al aumentar el crédito:", error);
              res.status(500).json({ error: "Error al aumentar el crédito del cliente" });
          } else {
              res.json('Crédito aumentado correctamente');
          }
      }
  );
};



module.exports = {verElCreditoCompleto,estadoCreditoVenta,RestarCredito}