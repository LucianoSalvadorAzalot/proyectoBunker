const {connection} = require('../database/config')


const VerPlataLogin = (req,res) =>{
    connection.query("SELECT * FROM plataEnCajaLogin",(error,results)=>{
        if(error) throw error
        res.json(results)
    })
}

const verPlataCajaLogin = (req,res) =>{
    const Id_sucursal = req.params.Id_sucursal
    connection.query(`SELECT u.nombre_usuario, s.nombre_sucursal, p.cantidadPlataLogin, p.FechaRegistro
    FROM plataencajalogin p
    INNER JOIN  Usuarios u ON u.Id_usuario = p.Id_usuario
    INNER JOIN sucursales s ON s.Id_sucursal = p.Id_sucursal
    WHERE s.Id_sucursal = ?
    ;
    `,[Id_sucursal], (error,results)=>{
        if(error) throw error
        res.json(results)
    })
}




const registrarPlataLogin = (req,res) =>{
    connection.query("INSERT INTO plataEnCajaLogin SET ? ",{
        cantidadPlataLogin : req.body.cantidadPlataLogin,
        Id_usuario: req.body.Id_usuario,
        Id_sucursal: req.body.Id_sucursal
    }, (error,results)=>{
        if(error) throw error
        res.json(results)
    })
   
}


module.exports = {VerPlataLogin, registrarPlataLogin,verPlataCajaLogin}