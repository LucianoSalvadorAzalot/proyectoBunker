const {Router} = require('express')
const router = Router()


const {verDetalleCompra, crearDetalleCompra} = require('../controllers/DetalleCompra')


router.get('/detalleCompra',verDetalleCompra)
router.post('/detalleCompra/post',crearDetalleCompra)


module.exports = router