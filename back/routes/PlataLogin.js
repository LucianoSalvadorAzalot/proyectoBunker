const {Router} = require('express')
const router = Router()


const {VerPlataLogin, registrarPlataLogin,verPlataCajaLogin} = require('../controllers/LoginPlata')





router.get("/plataLogin", VerPlataLogin)
router.get("/plataLogin/Ingreso/:Id_sucursal",verPlataCajaLogin)

router.post("/plataLogin/post", registrarPlataLogin)




module.exports = router
