const {Router} = require('express')
const router = Router()


const { verCaja, loginCaja } = require('../controllers/Caja')

router.get("/caja/:Id_sucursal", verCaja)

router.post("/caja/post",loginCaja)


module.exports = router