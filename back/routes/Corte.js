const { Router } = require('express');
const router = Router();


const {ventaTotal,ventaxCliente,ventaxCategoria,ventatotalxCategoria, verEmpleadoConVenta,verVentaXMes, importeVentaTotal, verGanancia, GananciaXdepartamento, verEntradaEfectivo, verEgresoEfectivo} = require('../controllers/Corte')

//GET DE GRAFICOS
router.get("/ventatotal", ventaTotal)
router.get("/ventaxcliente", ventaxCliente)
router.get("/ventaxcategoria", ventaxCategoria)
router.get("/ventatotalxcategoria", ventatotalxCategoria)
router.get("/verempleadoxventa", verEmpleadoConVenta)
router.get("/ventaxmes" , verVentaXMes)
router.get("/verganancia", verGanancia)
router.get("/vergananciaxdep", GananciaXdepartamento)
router.get("/veringresoefectivo", verEntradaEfectivo)
router.get("/veregresoefectivo", verEgresoEfectivo)


//COMPONENTE CORTE
router.get("/importeventatotal", importeVentaTotal)




module.exports = router;