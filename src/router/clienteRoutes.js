import { Router } from "express";
import { createCliente, deleteClienteById, getAllClientes, getClienteById, updateCliente } from "../controller/clienteController.js";
import {reqControlCliente, reqControlUpdateCliente} from "../middleware/reqCorrecionCliente.js"
import { esAdmin, tienePermiso } from "../middleware/comprobarRango.js";

const router = Router() // usa la función Router de Express, para construir las rutas 

router.get("/",getAllClientes) //
router.get("/:id",getClienteById)
router.post("/crear",tienePermiso,reqControlCliente,createCliente)
router.put("/actualizar/:id",tienePermiso,reqControlUpdateCliente,updateCliente)
router.delete("/eliminar/:id",esAdmin,deleteClienteById)



router.use((req, res,next) => {
    res.status(404).json({
      error: "La ruta que buscas no existe",
      method: req.method,
      path: req.originalUrl,
    });
  });


export default router; // es Importado en app.js