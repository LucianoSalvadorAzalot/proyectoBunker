const {connection} = require('../database/config')


const verStock = (req,res) =>{
    connection.query(`SELECT 
    s.cantidad,
    p.nombre_producto, p.precioCompra, p.precioVenta, p.descripcion_producto, p.Id_producto, p.fecha_registro, p.tipo_venta,
    suc.nombre_sucursal
    FROM Stock s
    INNER JOIN Producto p ON s.Id_producto = p.Id_producto
    INNER JOIN Sucursales suc ON s.Id_sucursal = suc.Id_sucursal;`
    , (error,results) =>{
        if(error)throw error
        res.json(results)
    } )
}






const crearStock = (req,res) =>{
    connection.query('INSERT INTO Stock SET ?',
    {
        cantidad: req.body.cantidad,
        Id_producto: req.body.Id_producto,
        Id_sucursal : req.body.Id_sucursal
    }
    ,(error,results)=>{
        if(error)throw error
        res.json(results)
    })
}


const editarStock = (req,res) =>{
    const Id_stock = req.params.Id_stock
    const {cantidad, Id_producto} = req.body
    
    connection.query( `UPDATE Stock SET 
                    
                        cantidad = '${cantidad}',
                        Id_producto = '${Id_producto}'

                        WHERE Id_stock = ${Id_stock}
    
    `,(error,results)=>{
        if(error) throw error
        res.json(results)
    })
}

const correlativaProduc= (req,res)=>{
    connection.query("select count (*) +1 as 'ultimoProducto' from Producto",
    (err,result)=>{
        if(err){
        console.log(err)
    }else{
        res.send(result)
    }})
}

module.exports = {verStock,crearStock,editarStock,correlativaProduc}