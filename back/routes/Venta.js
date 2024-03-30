const { Router } = require('express');
const router = Router();

const { verVenta, crearVenta, eliminarVenta,correlativa, verLaVentaCompleta,descCantidad, AumentarCredito } = require('../controllers/Venta');

router.get("/venta", verVenta);


router.get("/ventacorrelativa",correlativa)
router.get("/venta/sucursal/:Id_sucursal", verLaVentaCompleta)


router.put("/venta/aumentarCredito", AumentarCredito)

router.post("/venta/post", crearVenta); 
router.delete("venta/delete/:Id_venta", eliminarVenta);

router.put("/venta/descStock",descCantidad )

module.exports = router;
