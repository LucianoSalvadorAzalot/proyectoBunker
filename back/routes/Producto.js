const {Router}=require('express')
const router= Router()

const {verProductos,crearProductos,editarProductos,eliminarProductos,ProductoList,verPlataEnStock}=require('../controllers/Productos')


router.get('/productos', verProductos)

router.get('/productos/nombre_producto', ProductoList)
router.post('/productos/post',crearProductos)
router.put('/productos/put/:Id_producto',editarProductos)
router.delete('/productos/delete/:Id_producto', eliminarProductos)

router.get('/productos/verPlataStock',verPlataEnStock)



module.exports= router