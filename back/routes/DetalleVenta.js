const { Router } = require('express');
const router = Router();

const { verDetalleVenta, crearDetalleVenta, eliminarDetalleVenta } = require('../controllers/DetalleVenta');

router.get("/detalleVenta", verDetalleVenta);
router.post("/detalleVenta/post", crearDetalleVenta); // Cambié la ruta para crear un detalle de venta
router.delete("/detalleVenta/delete/:Id_detalleVenta", eliminarDetalleVenta);


module.exports = router;
