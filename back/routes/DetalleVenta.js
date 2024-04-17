const { Router } = require('express');
const router = Router();

const { verDetalleVenta, crearDetalleVenta, eliminarDetalleVenta,ultimoDetalle } = require('../controllers/DetalleVenta');

router.get("/detalleVenta", verDetalleVenta);
router.get("/detalleVenta/ultimoDetalle/:Id_sucursal", ultimoDetalle)

router.post("/detalleVenta/post", crearDetalleVenta); 

router.delete("/detalleVenta/delete/:Id_venta", eliminarDetalleVenta);


module.exports = router;
