const {Router} = require('express')
const router = Router()


const  {verProveedores, crearProveedores,eliminarProveedor,editarProveedores} = require("../controllers/Proveedor")

router.get("/proveedores",verProveedores)
router.post("/proveedores/post",crearProveedores)
router.put("/proveedores/put/:Id_proveedor",editarProveedores)
router.delete("/proveedores/delete/:Id_proveedor", eliminarProveedor)

module.exports = router