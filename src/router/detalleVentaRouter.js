import { Router } from "express";
import { esAdmin, tienePermiso } from "../middleware/comprobarRango.js"
import {
  getAllDetallesVenta,
  getDetalleVentaById,
  createDetalleVenta,
  updateDetalleVenta,
  deleteDetalleVenta,
  getFullDetalleById,
} from "../controller/detalleVentaController.js";
import {
  reqControlDetalleVenta,
  reqControlUpdateDetalleVenta,
} from "../middleware/reqCorreccionDetalleVenta.js";
import { vieneID } from "../middleware/vieneID.js";

const router = Router();

router.get("/", getAllDetallesVenta);
router.get("/:id", vieneID, getDetalleVentaById);
router.get("/detalle/:id", vieneID, tienePermiso, getFullDetalleById)
router.post("/crear", reqControlDetalleVenta, tienePermiso, createDetalleVenta);
router.put("/actualizar/:id", vieneID, tienePermiso, reqControlUpdateDetalleVenta, updateDetalleVenta);
router.delete("/eliminar/:id", vieneID, esAdmin, deleteDetalleVenta);

router.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada", path: req.originalUrl });
});

export default router;
