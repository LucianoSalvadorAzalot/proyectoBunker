const {Router} = require('express')
const router = Router()

const {verMetodoPago} = require('../controllers/MetodoPago')

router.get('/metodopago', verMetodoPago)


module.exports = router