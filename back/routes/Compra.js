const {Router} = require('express')
const router = Router()


const {verCompra, crearCompra, editarCompra} = require('../controllers/Compra')


router.get("/compra",verCompra)

router.post("/compra/post", crearCompra)

router.put("/compra/put/:Id_compra",editarCompra)



module.exports = router