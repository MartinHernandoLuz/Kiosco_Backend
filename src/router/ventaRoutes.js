import { Router } from "express";
import {
    createVenta,
    deleteVentaById,
    getAllVentas,
    getVentaById,
    updateVenta
} from "../controller/ventaController.js";
import { reqControlVenta, reqControlUpdateVenta } from "../middleware/reqCorreccionVenta.js";
import { esAdmin, tienePermiso } from "../middleware/comprobarRango.js";
import { vieneID } from "../middleware/vieneID.js";

const router = Router(); // Usa la función Router de Express para construir las rutas

router.get("/", getAllVentas);
router.get("/:id",vieneID, getVentaById);
router.post("/crear", tienePermiso, reqControlVenta, createVenta);
router.put("/actualizar/:id",vieneID, tienePermiso, reqControlUpdateVenta, updateVenta);
router.delete("/eliminar/:id",vieneID, esAdmin, deleteVentaById);

// Middleware para rutas inexistentes
router.use((req, res, next) => {
    res.status(404).json({
        error: "La ruta que buscas no existe",
        method: req.method,
        path: req.originalUrl,
    });
});

export default router; // Es importado en app.js
