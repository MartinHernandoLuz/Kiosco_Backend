import { Router } from "express";
import {
    createCategoria,
    deleteCategoriaById,
    getAllCategorias,
    getCategoriaById,
    updateCategoria
} from "../controller/categoriaController.js";

import { vieneID } from "../middleware/vieneID.js";
// Middleware específico para validar campos de categoría
import { reqControlCategoria, reqControlUpdateCategoria } from "../middleware/reqCorreccionCategoria.js";

// Middleware para comprobar si el usuario es administrador o empleado
import { esAdmin, tienePermiso } from "../middleware/comprobarRango.js";

const router = Router(); // Usa la función Router de Express para construir las rutas

// Rutas para categoría
router.get("/", getAllCategorias); // Obtener todas las categorías
router.get("/:id", vieneID, getCategoriaById); // Obtener una categoría por ID
router.post("/crear", tienePermiso, reqControlCategoria, createCategoria); // Crear una categoría
router.put("/actualizar/:id", tienePermiso, vieneID, reqControlUpdateCategoria, updateCategoria); // Actualizar una categoría
router.delete("/eliminar/:id", vieneID, esAdmin, deleteCategoriaById); // Eliminar una categoría por ID

// Middleware para manejar rutas no encontradas
router.use((req, res, next) => {
    res.status(404).json({
        error: "La ruta que buscas no existe",
        method: req.method,
        path: req.originalUrl,
    });
});

export default router; // Es importado en app.js
