import { Router } from "express";
import { 
    createCategoria, 
    deleteCategoriaById, 
    getAllCategorias, 
    getCategoriaById, 
    updateCategoria 
} from "../controller/categoriaController.js";
// Middleware específico para validar campos de categoría
import { reqControlCategoria } from "../middleware/reqCorreccionCategoria.js"; 

// Middleware para comprobar si el usuario es administrador o empleado
import { esAdmin, tienePermiso } from "../middleware/comprobarRango.js";

const router = Router(); // Usa la función Router de Express para construir las rutas

// Rutas para categoría
router.get("/", getAllCategorias); // Obtener todas las categorías
router.get("/:id", getCategoriaById); // Obtener una categoría por ID
router.post("/crear", tienePermiso, reqControlCategoria, createCategoria); // Crear una categoría
router.put("/actualizar/:id", tienePermiso,reqControlCategoria, updateCategoria); // Actualizar una categoría
router.delete("/eliminar/:id", esAdmin, deleteCategoriaById); // Eliminar una categoría por ID

// Middleware para manejar rutas no encontradas
router.use((req, res, next) => {
    res.status(404).json({
        error: "La ruta que buscas no existe",
        method: req.method,
        path: req.originalUrl,
    });
});

export default router; // Es importado en app.js
