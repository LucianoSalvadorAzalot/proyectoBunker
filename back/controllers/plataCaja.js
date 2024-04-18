const {connection} = require('../database/config')


const verPlataCaja = (req,res) =>{
    const Id_sucursal = req.params.Id_sucursal
    const Id_caja = req.body.Id_caja
    connection.query(`SELECT u.nombre_usuario, s.nombre_sucursal, p.CantidadPlata, p.FechaRegistro, p.faltante, c.Id_caja
    FROM plataEnCaja p
    INNER JOIN  Usuarios u ON u.Id_usuario = p.Id_usuario
    INNER JOIN sucursales s ON s.Id_sucursal = p.Id_sucursal
    INNER JOIN Caja c ON c.Id_caja = p.Id_caja
    WHERE s.Id_sucursal = ?
    AND p.Id_caja = ?
    ;
    `,[Id_sucursal,Id_caja], (error,results)=>{
        if(error) throw error
        res.json(results)
    })
}


const IngresarPlata = (req,res)=>{
    connection.query("INSERT INTO plataEnCaja SET ?",{
        Id_sucursal: req.body.Id_sucursal,
        cantidadPlata: req.body.cantidadPlata,
        Id_usuario: req.body.Id_usuario,
        faltante: req.body.faltante,
        Id_caja: req.body.Id_caja
     
    },(error,results)=>{
        if(error) throw error
        res.json(results)
    })
}





const verUltimoIngreso = (req,res) =>{
    connection.query("SELECT * FROM plataencajalogin ORDER BY FechaRegistro DESC LIMIT 1"
    ,(error,results)=>{
        if(error) throw error
        res.json(results)
    })
}

   
const verCantidadTotal = (req,res) =>{
    const Id_usuario = req.params.Id_usuario
    const FechaRegistro = req.params.FechaRegistro;
    connection.query(` SELECT SUM(venta.precioTotal_venta) + SUM(ultima_plata_login.cantidadPlataLogin) AS total_ventas 
                        FROM venta
                        INNER JOIN (
                            SELECT id_usuario, cantidadPlataLogin
                            FROM plataencajalogin
                            ORDER BY FechaRegistro DESC
                            LIMIT 1
                        ) AS ultima_plata_login ON venta.id_usuario = ultima_plata_login.id_usuario
                        WHERE venta.id_usuario = ? AND venta.fecha_registro >= ?;
                        
     `,[Id_usuario,FechaRegistro], (error,results)=>{
                            if(error) throw error
                            res.json(results)
                        })

}


module.exports = {verPlataCaja, IngresarPlata,verUltimoIngreso,verCantidadTotal}