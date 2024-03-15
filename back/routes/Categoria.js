const {Router} = require('express')
const router = Router()

const {verCategoria,crearCategoria,editarCategoria,eliminarCategoria} = require('../controllers/Categoria')

router.get('/categorias', verCategoria)
router.post('/categorias/post', crearCategoria)
router.put('/categorias/put/:Id_categoria', editarCategoria)
router.delete('/categorias/delete/:Id_categoria',eliminarCategoria)

module.exports = router
