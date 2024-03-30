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
        CantidadVendida: req.body.CantidadVendida       
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


const eliminarDetalleVenta = (req,res) =>{ 
    const Id_detalleVenta = req.params.Id_detalleVenta
    connection.query = ('DELETE FROM DetalleVenta WHERE Id_detalleVenta =' + Id_detalleVenta,
    (error,results)=>{
        if(error) throw error
        res.json(results)
    })
}





module.exports = {verDetalleVenta,crearDetalleVenta,eliminarDetalleVenta}