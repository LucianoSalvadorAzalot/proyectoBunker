const {connection} = require("../database/config")

const verCategoria =(req,res)=>{
    connection.query('SELECT * FROM Categoria',
    (error,results)=>{
        if(error)throw error
        res.json(results)
    })
}

const crearCategoria = (req,res) =>{
    connection.query('INSERT INTO Categoria SET ?',
    {
        Id_categoria:req.body.Id_categoria,
        nombre_categoria:req.body.nombre_categoria,
        descripcion_categoria:req.body.descripcion_categoria
    },
    (error,results)=>{
        if(error) throw error
        res.json(results)
    })
}

const editarCategoria = (req,res) =>{
    const Id_categoria = req.params.Id_categoria
    const{nombre_categoria,descripcion_categoria} = req.body
    connection.query(`UPDATE Categoria SET
                                            nombre_categoria='${nombre_categoria}',
                                            descripcion_categoria='${descripcion_categoria}'
                                            
                                            WHERE Id_categoria =${Id_categoria}`,
                                            (error,results)=>{
                                            if(error) throw error
                                            res.json(results)
                                            }
                                            )
}

const eliminarCategoria = (req,res) =>{
    const Id_categoria= req.params.Id_categoria
    connection.query('DELETE FROM Categoria WHERE Id_categoria=' + Id_categoria,
    (error,results)=>{
        if(error) throw error
        res.json(results)
    })
}

module.exports= {verCategoria, crearCategoria, editarCategoria, eliminarCategoria}