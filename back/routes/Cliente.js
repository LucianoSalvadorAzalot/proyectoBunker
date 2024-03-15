const {Router} = require('express')
const router= Router()

const {verClientes,crearCliente,editarCliente,eliminarCliente} = require('../controllers/Clientes')



router.get('/cliente', verClientes)
router.post('/cliente/post', crearCliente)
router.put('/cliente/put/:Id_cliente', editarCliente)
router.delete('/cliente/delete/:Id_cliente', eliminarCliente)


module.exports = router