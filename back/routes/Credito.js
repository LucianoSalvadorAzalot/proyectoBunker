const {Router} = require('express')
const router= Router()

const {verElCreditoCompleto, estadoCreditoVenta, RestarCredito} = require('../controllers/Credito')

router.get('/creditos/:Id_cliente', verElCreditoCompleto)

router.put('/creditos/estadoCredito', estadoCreditoVenta)

router.put('/creditos/restarCredito', RestarCredito)

module.exports = router