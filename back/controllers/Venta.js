
const {connection} = require("../database/config")


const verVenta = (req,res) =>{
    connection.query('SELECT * FROM venta',
    (error,results) =>{                                                                                                                                                                                                               
        if(error)throw error
        res.json(results)
    }
    )
}


const crearVenta = (req,res) => {  
    const Id_sucursal = req.body.Id_sucursal
    connection.query('INSERT INTO Venta SET ? ',
    {
        Id_venta : req.body.Id_venta,
        descripcion_venta : req.body.descripcion_venta,
        precioTotal_venta: req.body.precioTotal_venta,
        Id_metodoPago: req.body.Id_metodoPago,
        Id_cliente: req.body.Id_cliente,
        Id_sucursal: Id_sucursal,
        Id_usuario: req.body.Id_usuario
        
    },(error,results)=>{
        if(error)throw error
        res.json(results)
    })
}


const eliminarVenta = (req,res) => {
    const Id_venta= req.params.Id_venta
    connection.query = ('DELETE FROM Venta WHERE Id_venta=' + Id_venta, 
    (error,results)=>{
        if(error) throw error
        res.json(results)
    })
}


const correlativa= (req,res)=>{
    connection.query("select count (*) +1 as 'ultimopedido' from Venta",
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }})
}



const verLaVentaCompleta = (req, res) => {
  const Id_sucursal = req.params.Id_sucursal;
  connection.query(`
    SELECT 
      v.Id_venta, 
      v.descripcion_venta, 
      v.precioTotal_venta, 
      v.fecha_registro,
      c.Id_cliente, 
      c.nombre_cliente, 
      c.domicilio_cliente,
      mt.Id_metodoPago, 
      mt.tipo_metodoPago,
      p.Id_producto, 
      p.nombre_producto, 
      p.descripcion_producto, 
      p.precioVenta, 
      p.tipo_venta,
      dv.Id_detalleVenta, 
      dv.descripcion_detalleVenta,
      dv.cantidadVendida, 
      u.nombre_usuario
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
    ORDER BY
      v.fecha_registro DESC;
  `, [Id_sucursal], (error, results) => {
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
          descripcion_venta: item.descripcion_venta,
          precioTotal_venta: item.precioTotal_venta,
          fecha_registro: item.fecha_registro,
          cliente: {
            Id_cliente: item.Id_cliente,
            nombre_cliente: item.nombre_cliente,
            domicilio_cliente: item.domicilio_cliente,
          },
          metodoPago: {
            Id_metodoPago: item.Id_metodoPago,
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
        productoExistente.cantidadVendida += item.cantidadVendida;
      } else {
        // Si el producto no está en la venta, agregarlo
        acc[item.Id_venta].productos.push({
          Id_producto: item.Id_producto,
          nombre_producto: item.nombre_producto,
          descripcion_producto: item.descripcion_producto,
          precioVenta: item.precioVenta, // Asegúrate de usar el nombre correcto de la columna aquí
          cantidadVendida: item.cantidadVendida, 
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

  





const descCantidad = (req, res) => {
   const cantidad_producto = req.body.cantidad_producto
   const Id_producto = req.body.Id_producto
        connection.query('UPDATE Producto SET cantidad_producto = cantidad_producto - ? WHERE Id_producto = ?', [cantidad_producto, Id_producto], (error, results) => {
            if (error) {
                console.log('Error al actualizar el stock:', error);
            }
       
    });

    res.json({ message: 'Stock actualizado correctamente' });
};



const AumentarCredito = (req, res) => {
    const Id_cliente = req.body.Id_cliente;
    const montoCredito = req.body.montoCredito;
    
    connection.query("UPDATE Cliente SET montoCredito = montoCredito + ? WHERE Id_cliente = ?", [montoCredito, Id_cliente],
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



module.exports = { verVenta,crearVenta,eliminarVenta,correlativa, verLaVentaCompleta,descCantidad,AumentarCredito}