const {Router} = require('express')
const router= Router()

const {verElCreditoCompleto} = require('../controllers/Credito')

router.get('/creditos/:Id_cliente', verElCreditoCompleto)

module.exports = router