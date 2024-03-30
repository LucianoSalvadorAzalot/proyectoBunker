const {Router} = require('express')
const router = Router()


const {verSucursales} = require('../controllers/Sucursales')


router.get("/sucursales",verSucursales)


module.exports = router