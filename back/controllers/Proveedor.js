
const  {connection} = require ('../database/config')


const  verProveedores = (req,res) =>{
    connection.query("SELECT * FROM Proveedores", (error,results) =>{
        if(error) throw error
        res.json(results)
    })
}


const crearProveedores = (req,res) =>{
    connection.query("INSERT INTO Proveedores  SET ?" ,
    {
            Id_proveedor : req.body.Id_proveedor,
            nombre_proveedor : req.body.nombre_proveedor,
            descripcion_proveedor :  req.body.descripcion_proveedor,
            numTel_proveedor : req.body.numTel_proveedor
            
    },(error,results)=>{
        if(error)throw error
        res.json(results)
    })
}


const editarProveedores = (req, res) => {
    const Id_proveedor = req.params.Id_proveedor;
    const { nombre_proveedor, descripcion_proveedor, numTel_proveedor } = req.body;
    connection.query(
        `UPDATE Proveedores SET 
            nombre_proveedor = '${nombre_proveedor}',
            descripcion_proveedor = '${descripcion_proveedor}',       
            numTel_proveedor = '${numTel_proveedor}'
            
            WHERE Id_proveedor = ${Id_proveedor}`,
            (error, results) => {
                if (error) throw error;
                res.json(results);
            }
        );
};

const eliminarProveedor = (req,res) =>{
    const Id_proveedor = req.params.Id_proveedor

    connection.query("DELETE FROM Proveedores WHERE Id_proveedor = " + Id_proveedor, 
    (error,results)=>{
        if(error) throw error
        res.json(results)
    })
}


module.exports = { verProveedores, crearProveedores,editarProveedores,eliminarProveedor}