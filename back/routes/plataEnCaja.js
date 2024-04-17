const {Router} = require('express')
const router = Router()


const {verPlataCaja, IngresarPlata,verUltimoIngreso,verCantidadTotal} = require("../controllers/plataCaja")


router.get("/plataCaja/:Id_sucursal", verPlataCaja)

router.post("/plataCaja/post",IngresarPlata)

router.get("/plataCajaIngreso",verUltimoIngreso)


router.get("/plataCaja/:Id_usuario/:FechaRegistro",verCantidadTotal)


module.exports = router