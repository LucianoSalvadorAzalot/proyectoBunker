const {connection} = require('../database/config')



const verSucursales = (req,res) =>{
    connection.query("SELECT * FROM Sucursales", (error,results)=>{
        if(error) throw error
        res.json(results)
    })
}



module.exports = {verSucursales}













