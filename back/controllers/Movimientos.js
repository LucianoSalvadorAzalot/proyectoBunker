const {connection} = require("../database/config")



const registrarEgreso = (req,res) =>{
    connection.query("INSERT INTO Egreso SET ?",{
        DescripcionEgreso: req.body.DescripcionEgreso,
        montoTotalEgreso: req.body.montoTotalEgreso,
        Id_usuario: req.body.Id_usuario,
        Id_sucursal: req.body.Id_sucursal,
        Id_caja: req.body.Id_caja

    },(error,results)=>{
        if(error) throw error
        res.json(results)
    })
}

const verEgreso = (req,res) =>{
    connection.query("SELECT * FROM Egreso",(error,results)=>{
        if(error)throw error
        res.json(results)
    })
}
const verIngreso = (req,res) =>{
    connection.query("SELECT * FROM Ingreso",(error,results)=>{
        if(error)throw error
        res.json(results)
    })
}



const registrarIngreso = (req,res) =>{
    connection.query("INSERT INTO Ingreso SET ?",{
        DescripcionIngreso: req.body.DescripcionIngreso,
        montoTotalIngreso: req.body.montoTotalIngreso,
        Id_usuario: req.body.Id_usuario,
        Id_sucursal: req.body.Id_sucursal,
        Id_caja: req.body.Id_caja
    },(error,results)=>{
        if(error) throw error
        res.json(results)
    })
}

module.exports={
    registrarEgreso,
    registrarIngreso,
    verEgreso,
    verIngreso
}
