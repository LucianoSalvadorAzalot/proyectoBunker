const {connection} = require('../database/config')


const verCompra = (req,res) =>{
    connection.query("SELECT * FROM Compra", (error,results)=>{
        if(error)throw error
        res.json(results)
    })
}

const crearCompra = (req,res) =>{
    const Id_sucursal = req.body.Id_sucursal
    connection.query("INSERT INTO Compra SET ? ",{
        Id_compra: req.body.Id_compra,
        descripcion_compra : req.body.descripcion_compra,
        Id_proveedor: req.body.Id_proveedor,
        total_compra:req.body.total_compra,
        Id_sucursal: Id_sucursal
    },(error,results)=>{
        if(error) throw error
        res.json(results)
    })
}

const compraCorrelativa = (req,res) => {
    connection.query("select count(*) +1 as 'ultimacompra' from Compra ", (error,results)=>{
        if(error) throw error
        res.json(results)
    })
}

const aumentarStock = (req, res) => {
    const Id_producto = req.body.Id_producto
    const cantidad_producto = req.body.cantidad_producto      
        connection.query('UPDATE Producto SET cantidad_producto = cantidad_producto + ? WHERE Id_producto = ?', [cantidad_producto, Id_producto], (error, results) => {
            if (error) {
                console.log('Error al actualizar el stock:', error);
            }
        });
    res.json({ message: 'Stock actualizado correctamente' });
};























const verLaCompraCompleta = (req, res) => {
    const Id_sucursal = req.params.Id_sucursal;
  
    connection.query(`
      SELECT 
        c.Id_compra, 
        c.descripcion_compra, 
        c.total_compra, 
        c.fecha_registro,
        dv.Id_detalleCompra, 
        dv.descripcion_detalleCompra,
        p.Id_producto, 
        p.nombre_producto, 
        p.descripcion_producto, 
        p.precioCompra,
        p.precioVenta
      FROM 
        Compra c
      INNER JOIN 
        detallecompra dv ON c.Id_compra = dv.Id_compra
      INNER JOIN 
        Producto p ON dv.Id_producto = p.Id_producto
      WHERE 
        c.Id_sucursal = ?
      ORDER BY
        c.fecha_registro DESC;
    `, [Id_sucursal], (error, results) => {
      if (error) {
        console.error("Error al obtener las compras:", error);
        res.status(500).send("Error interno del servidor al obtener las compras");
        return;
      }
      
      // Agrupar productos por Id_compra
      const comprasAgrupadas = results.reduce((acc, item) => {
        // Si no existe la compra en el acumulador, agregarla
        if (!acc[item.Id_compra]) {
          acc[item.Id_compra] = {
            Id_compra: item.Id_compra,
            descripcion_compra: item.descripcion_compra,
            total_compra: item.total_compra,
            fecha_registro: item.fecha_registro,
            productos: []
          };
        }
        // Agregar el producto a la compra
        acc[item.Id_compra].productos.push({
          Id_producto: item.Id_producto,
          nombre_producto: item.nombre_producto,
          descripcion_producto: item.descripcion_producto,
          precioCompra: item.precioCompra,
          precioVenta: item.precioVenta,
          Id_detalleCompra: item.Id_detalleCompra,
          descripcion_detalleCompra: item.descripcion_detalleCompra
        });
        
        return acc;
      }, {});
  
      // Convertir el objeto agrupado en un array
      const compras = Object.values(comprasAgrupadas);
      res.json(compras);
    });
  };



module.exports = {verCompra,crearCompra,compraCorrelativa, aumentarStock,verLaCompraCompleta}