const {connection} = require('../database/config')


const verCompra = (req,res) =>{
    connection.query("SELECT * FROM compra", (error,results)=>{
        if(error)throw error
        res.json(results)
    })
}

const crearCompra = (req,res) =>{
    const Id_sucursal = req.body.Id_sucursal
    connection.query("INSERT INTO Compra SET ? ",{
        Id_compra: req.body.Id_compra,
        descripcion_compra : req.body.descripcion_compra,      
        totalCompra:req.body.totalCompra,
        estado_compra: req.body.estado_compra,
        personaPideCompra: req.body.personaPideCompra,
        personaRecibeCompra: req.body.personaRecibeCompra,
        Id_sucursal: Id_sucursal,
        Id_proveedor: req.body.Id_proveedor
    },(error,results)=>{
        if(error) throw error
        res.json(results)
    })
}


 const editarCompra = (req,res) => {
    const Id_compra = req.params.Id_compra
    const {descripcion_compra,totalCompra,estado_compra,personaPideCompra,personaRecibeCompra,Id_sucursal,Id_proveedor} = req.body
    connection.query(`UPDATE compra SET 
                    descripcion_compra = '${descripcion_compra}',
                    totalCompra = '${totalCompra}',
                    estado_compra = '${estado_compra}',
                    personaPideCompra = '${personaPideCompra}',
                    personaRecibeCompra = '${personaRecibeCompra}',
                    Id_sucursal = '${Id_sucursal}',
                    Id_proveedor = '${Id_proveedor}'

                    WHERE Id_compra = ${Id_compra}
    `,(error,results)=>{
        if(error) throw error
        res.json(results)
    })
 }




module.exports = {verCompra,crearCompra,editarCompra}