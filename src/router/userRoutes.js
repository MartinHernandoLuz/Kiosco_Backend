import { Router } from "express";
import { createUser, loginUser } from "../controller/userController.js";
import { reqControl } from "../middleware/reqCorrecionUser.js";

const router = Router() // usa la función Router de Express, para construir las rutas 

// reqControl es una Callback que revisa si en req viene correo y contraseña correctos 

router.post("/create",reqControl,createUser) // función que crea usuario, userController.js
router.post("/login",reqControl,loginUser) // función para iniciar seción, userController.js



router.use((req, res,next) => {
    res.status(404).json({
      error: "La ruta que buscas no existe",
      method: req.method,
      path: req.originalUrl,
    });
  });

export default router; // es Importado en app.js