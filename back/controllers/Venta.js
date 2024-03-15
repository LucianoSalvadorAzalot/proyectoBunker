
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
    connection.query('INSERT INTO Venta SET ? ',
    {
        Id_venta : req.body.Id_venta,
        descripcion_venta : req.body.descripcion_venta,
        precioTotal_venta: req.body.precioTotal_venta,
        Id_metodoPago: req.body.Id_metodoPago,
        Id_cliente: req.body.Id_cliente
        
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



const verLaVentaCompleta = (req,res) =>{ 
    connection.query(`SELECT dv.Id_detalleVenta, dv.descripcion_detalleVenta,
                                v.Id_venta, v.descripcion_venta, v.precioTotal_venta,
                                p.Id_producto, p.nombre_producto, p.descripcion_producto, p.precio_producto, p.cantidad_producto, p.Id_categoria,
                                c.Id_cliente, c.nombre_cliente, c.domicilio_cliente,
                                mt.Id_metodoPago, mt.tipo_metodoPago
                    FROM detalleventa dv
                    INNER JOIN Venta v ON dv.Id_venta = v.Id_venta
                    INNER JOIN Producto p ON dv.Id_producto = p.Id_producto
                    INNER JOIN Cliente c ON v.Id_cliente = c.Id_cliente
                    INNER JOIN MetoPago mt ON v.Id_metodoPago = mt.Id_metodoPago
    
    `,(error,results)=>{
        if(error) throw error
        res.json(results)
    })
}


module.exports = { verVenta,crearVenta,eliminarVenta,correlativa, verLaVentaCompleta}