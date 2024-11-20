import { Router } from "express";
import { createProducto, deleteProductoById, getAllProductos, getProductoById, updateProducto } from "../controller/productoController.js";
import {reqControlProducto, reqControlUpdateProducto} from "../middleware/reqCorrecionProducto.js"
import { esAdmin, tienePermiso } from "../middleware/comprobarRango.js";

const router = Router() // usa la función Router de Express, para construir las rutas 

router.get("/",getAllProductos) //
router.get("/:id",getProductoById)
router.post("/crear",tienePermiso,reqControlProducto,createProducto)
router.put("/actualizar/:id",tienePermiso,reqControlUpdateProducto,updateProducto)
router.delete("/eliminar/:id",esAdmin,deleteProductoById)



router.use((req, res,next) => {
    res.status(404).json({
      error: "La ruta que buscas no existe",
      method: req.method,
      path: req.originalUrl,
    });
  });


export default router; // es Importado en app.js