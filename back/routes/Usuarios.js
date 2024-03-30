const Router = require('express')
const router = Router()

const {verUsuarios,editarUsuarios,crearUsuarios, eliminarUsuarios} = require("../controllers/Usuarios")


router.get("/usuarios/sucursal/:Id_sucursal",verUsuarios)
router.post("/usuarios/post",crearUsuarios)
router.put("/usuarios/put/:Id_usuario",editarUsuarios)
router.delete("/usuarios/delete/:Id_usuario",eliminarUsuarios)


module.exports = router