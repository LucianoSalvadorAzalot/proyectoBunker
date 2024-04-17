const { Router } = require('express');
const router = Router();

const { verVenta, crearVenta, eliminarVenta,correlativa, verLaVentaCompleta,descCantidad, AumentarCredito, ultimaVenta, aumentarCantidad } = require('../controllers/Venta');

router.get("/venta", verVenta);


router.get("/ventacorrelativa",correlativa)
router.get("/venta/sucursal/:Id_sucursal", verLaVentaCompleta)
router.get("/venta/UltimaVenta", ultimaVenta)

router.put("/venta/aumentarCredito", AumentarCredito)
router.put("/venta/descStock",descCantidad )

router.put("/venta/aumentarCantidad", aumentarCantidad)

router.post("/venta/post", crearVenta); 

router.delete("/venta/delete/:Id_venta", eliminarVenta);


module.exports = router;
