const {Router} = require('express')
const router = Router()


const {verStock,crearStock,editarStock, correlativaProduc} = require('../controllers/Stock')


router.get("/stock", verStock)
router.get("/stock/ultimoProducto", correlativaProduc)
router.post("/stock/post", crearStock)
router.put("/stock/put/:Id_stock",editarStock)


module.exports= router