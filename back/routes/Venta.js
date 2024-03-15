const { Router } = require('express');
const router = Router();

const { verVenta, crearVenta, eliminarVenta,correlativa, verLaVentaCompleta } = require('../controllers/Venta');

router.get("/venta", verVenta);
router.get("/ventacorrelativa",correlativa)
router.get("/venta/verVentaCompleta", verLaVentaCompleta)
router.post("/venta/post", crearVenta); 
router.delete("venta/delete/:Id_venta", eliminarVenta);

module.exports = router;
