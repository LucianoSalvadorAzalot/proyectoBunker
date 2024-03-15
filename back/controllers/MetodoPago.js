const {connection} = require('../database/config')


const verMetodoPago = (req,res) =>{
    connection.query("SELECT * FROM MetoPago", (error,results)=>{
        if(error) throw error
        res.json(results)
    })
}

module.exports = {verMetodoPago}