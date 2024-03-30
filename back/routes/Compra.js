const {Router} = require('express')
const router = Router()


const {verCompra, crearCompra, compraCorrelativa,aumentarStock,verLaCompraCompleta} = require('../controllers/Compra')


router.get("/compra",verCompra)
router.get("/compra/correlativa",compraCorrelativa)
router.get("/compra/sucursal/:Id_sucursal", verLaCompraCompleta)
router.post("/compra/post", crearCompra)
router.put("/compra/aumentarStock",aumentarStock)


module.exports = router