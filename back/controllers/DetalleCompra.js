const {connection} = require('../database/config')


const verDetalleCompra = (req,res)=>{
    connection.query("SELECT * FROM detalleCompra", (error,results)=>{
        if(error) throw error
        res.json(results)
    })
}


const crearDetalleCompra = (req,res) =>{
    connection.query("INSERT INTO detalleCompra SET ?",{
        Id_detalleCompra : req.body.Id_detalleCompra,
        descripcion_Detallecompra : req.body.descripcion_Detallecompra,
        Id_producto: req.body.Id_producto,
        Id_compra : req.body.Id_compra
    },(error,results)=>{
        if(error)throw error
        res.json(results)
    })
}

module.exports = {verDetalleCompra,crearDetalleCompra}