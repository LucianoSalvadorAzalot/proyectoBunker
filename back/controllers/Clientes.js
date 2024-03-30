const {connection} = require ('../database/config')

const verClientes = (req,res) =>{
    connection.query('SELECT * FROM Cliente',
    (error,results)=>{
        if(error) throw error
        res.json(results)
    })
}


const crearCliente = (req,res)=>{
    connection.query('INSERT INTO Cliente SET ?',
    {
        Id_cliente: req.body.Id_cliente,
        nombre_cliente: req.body.nombre_cliente,
        apellido_cliente: req.body.apellido_cliente,
        telefono_cliente: req.body.telefono_cliente,
        correo_cliente: req.body.correo_cliente,
        domicilio_cliente: req.body.domicilio_cliente,
        ciudad_cliente: req.body.ciudad_cliente,
        codigoPostal_cliente: req.body.codigoPostal_cliente,
        estado_cliente: req.body.estado_cliente,
        montoCredito: req.body.montoCredito
    },
    (error,results)=>{
        if(error) throw error
        res.json(results)
    })
}


const editarCliente = (req,res)=>{
    const Id_cliente = req.params.Id_cliente
    const {nombre_cliente,apellido_cliente,telefono_cliente,correo_cliente,domicilio_cliente,ciudad_cliente,codigoPostal_cliente,estado_cliente,montoCredito}=req.body
    connection.query(`UPDATE Cliente SET

                    nombre_cliente='${nombre_cliente}',
                    apellido_cliente= '${apellido_cliente}',
                    telefono_cliente= '${telefono_cliente}',
                    correo_cliente= '${correo_cliente}',
                    domicilio_cliente='${domicilio_cliente}',
                    ciudad_cliente= '${ciudad_cliente}',
                    codigoPostal_cliente= '${codigoPostal_cliente}',
                    estado_cliente= '${estado_cliente}',
                    montoCredito = '${montoCredito}'


                    WHERE Id_cliente =${Id_cliente}  `,
                    (error,results)=>{
                        if(error)throw error
                        res.json(results)
                    }
  )
}



const eliminarCliente = (req,res)=>{
    const Id_cliente = req.params.Id_cliente
    connection.query('DELETE FROM Cliente WHERE Id_cliente= ' + Id_cliente,
    (error,results)=>{
        if(error) throw error
        res.json(results)
    })
}



module.exports= {verClientes,crearCliente,editarCliente,eliminarCliente}