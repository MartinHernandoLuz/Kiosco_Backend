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
router.get("/:id", getDetalleVentaById);
router.post("/crear", reqControlDetalleVenta, createDetalleVenta);
router.put("/actualizar/:id", reqControlUpdateDetalleVenta, updateDetalleVenta);
router.delete("/eliminar/:id", deleteDetalleVenta);

router.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada", path: req.originalUrl });
});

export default router;
