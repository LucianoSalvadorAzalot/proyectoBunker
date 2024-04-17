const {Router} = require('express')
const router  = Router()


const {verIngreso,verEgreso,registrarIngreso,registrarEgreso} = require('../controllers/Movimientos')


router.get("/ingreso", verIngreso)
router.get("/egreso",verEgreso)

router.post("/ingreso/post", registrarIngreso)
router.post("/egreso/post", registrarEgreso)


module.exports = router