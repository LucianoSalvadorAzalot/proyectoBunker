const {connection} = require ('../database/config')

 
const verProductos =(req,res)=>{
    connection.query('SELECT p.Id_producto, p.nombre_producto, p.descripcion_producto, p.precio_producto, p.cantidad_producto, c.nombre_categoria, c.descripcion_categoria FROM Producto p  INNER JOIN Categoria c  ON p.Id_categoria = c.Id_categoria',
    (error,results)=>{
        if(error)throw error
        res.json(results)
    })
}



const crearProductos = (req,res) =>{
    connection.query('INSERT INTO Producto SET ? ',
    {
        
        nombre_producto: req.body.nombre_producto,
        descripcion_producto: req.body.descripcion_producto,
        precio_producto: req.body.precio_producto,
        cantidad_producto: req.body.cantidad_producto,
        Id_categoria: req.body.Id_categoria

    }, (error)=>{
        if(error) throw error
        res.json("Producto Agregado")
    })
}


const editarProductos = (req,res)=>{
    const Id_producto= req.params.Id_producto
    const{nombre_producto,descripcion_producto,precio_producto,cantidad_producto,Id_categoria} = req.body
    connection.query(`UPDATE Producto SET

                            nombre_producto='${nombre_producto}',
                            precio_producto='${precio_producto}',
                            cantidad_producto= '${cantidad_producto}',
                            descripcion_producto='${descripcion_producto}',
                            Id_categoria = '${Id_categoria}'

                            
                            WHERE Id_producto = ${Id_producto}`,
                    
                            (error)=>{
                                if(error) throw error
                                res.json("Producto Editado")
                            }
                            )
}


const eliminarProductos = (req,res) =>{
    const Id_producto=req.params.Id_producto
    connection.query('DELETE FROM Producto WHERE Id_producto= ' + Id_producto,
    (error,results)=>{
        if(error) throw error
        res.json(results)
    }
    )
}


const ProductoList = (req, res) => {
    const nombre_producto = req.params.nombre_producto;
  
    if (!nombre_producto) {
      res.status(400).send("Falta el nombre del producto");
      return;
    }
  
    connection.query(
      "SELECT Id_producto, nombre_producto, descripcion_producto, precio_producto, cantidad_producto FROM producto WHERE nombre_producto = ?",
      [nombre_producto],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error al buscar el producto.");
        } else {
          const productoEncontrado = result.length > 0;
  
          if (productoEncontrado) {
            res.send(result[0]);
          } else {
            res.status(404).send("Producto no encontrado.");
          }
        }
      }
    );
  };
  


module.exports= {verProductos,crearProductos,editarProductos,eliminarProductos,ProductoList}