import { Router } from "express";
import { getAllProductos } from "../controller/productoController.js";

const router = Router() // usa la función Router de Express, para construir las rutas 

router.get("/",getAllProductos) //







export default router; // es Importado en app.js