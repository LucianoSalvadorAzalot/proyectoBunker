const {Router} = require('express')
const router = Router()

const {verMetodoPago,crear,editar,eliminar} = require('../controllers/MetodoPago')

router.get('/metodopago', verMetodoPago)
router.post('/metodopago/post', crear)
router.put('/metodopago/put/:Id_metodoPago', editar)
router.delete('/metodopago/delete/:Id_metodoPago', eliminar)


module.exports = router