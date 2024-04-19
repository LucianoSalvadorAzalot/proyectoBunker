const {Router} = require('express')
const router= Router()

<<<<<<< HEAD
const {verElCreditoCompleto, estadoCreditoVenta,RestarCredito} = require('../controllers/Credito')
=======
const {verElCreditoCompleto, estadoCreditoVenta, RestarCredito} = require('../controllers/Credito')
>>>>>>> 427a73de24f0ec25152ac8304d079a20ad0d2666

router.get('/creditos/:Id_cliente', verElCreditoCompleto)
router.put('/creditos/estadoCredito/:Id_venta', estadoCreditoVenta)
router.put('/creditos/restarCredito', RestarCredito)

router.put('/creditos/estadoCredito', estadoCreditoVenta)

router.put('/creditos/restarCredito', RestarCredito)

module.exports = router