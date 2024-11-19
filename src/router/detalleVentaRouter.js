import { Router } from "express";
import {
  getAllDetallesVenta,
  getDetalleVentaById,
  createDetalleVenta,
  updateDetalleVenta,
  deleteDetalleVenta,
} from "../controller/detalleVentaController.js";
import {
  reqControlDetalleVenta,
  reqControlUpdateDetalleVenta,
} from "../middleware/reqCorreccionDetalleVenta.js";

const router = Router();

router.get("/", getAllDetallesVenta);
router.get("/:ID_Venta/:ID_Producto", getDetalleVentaById);
router.post("/", reqControlDetalleVenta, createDetalleVenta);
router.put("/:ID_Venta/:ID_Producto", reqControlUpdateDetalleVenta, updateDetalleVenta);
router.delete("/:ID_Venta/:ID_Producto", deleteDetalleVenta);

router.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada", path: req.originalUrl });
});

export default router;
