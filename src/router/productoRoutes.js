import { Router } from "express";
import { createProducto, getAllProductos, getProductoById, updateProducto } from "../controller/productoController.js";
import {reqControlProducto} from "../middleware/reqCorrecionProducto.js"
import { tienePermiso } from "../middleware/comprobarRango.js";

const router = Router() // usa la función Router de Express, para construir las rutas 

router.get("/",getAllProductos) //
router.get("/:id",getProductoById)
router.post("/crear",tienePermiso,reqControlProducto,createProducto)
router.put("/actualizar",tienePermiso,updateProducto)





export default router; // es Importado en app.js