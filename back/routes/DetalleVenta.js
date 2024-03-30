const { Router } = require('express');
const router = Router();

const { verDetalleVenta, crearDetalleVenta, eliminarDetalleVenta } = require('../controllers/DetalleVenta');

router.get("/detalleVenta", verDetalleVenta);
router.post("/detalleVenta/post", crearDetalleVenta); 
router.delete("/detalleVenta/delete/:Id_detalleVenta", eliminarDetalleVenta);


module.exports = router;
