import express from "express";
import 'dotenv/config'
import { seguridadInicial } from "./src/middleware/seguridadInicial.js";
import userRoutes from "./src/router/userRoutes.js";
import productoRoutes from "./src/router/productoRoutes.js";
import categoriaRoutes from "./src/router/categoriaRoutes.js";
import clienteRoutes from "./src/router/clienteRoutes.js";
import ventasRoutes from "./src/router/ventaRoutes.js";

import detalleVentasRoutes from "./src/router/detalleVentaRouter.js";

const app = express(); // traigo a Express 

seguridadInicial(app) // viene de carpeta Middlewares, es para poner todas las funciones de
//                       seguridad inicial
app.use(express.json()); // avisarle a Express que voy a enviar JSON




/************** Routes *************/
// los ruteadores están en carpeta router
app.use("/user", userRoutes)

app.use("/productos", productoRoutes)

app.use("/categorias", categoriaRoutes)

app.use("/clientes", clienteRoutes)

app.use("/ventas", ventasRoutes)

app.use("/detalle-ventas", detalleVentasRoutes)

// ruta default
/*app.use("/",(req,res)=>{
    res.json({mensaje: "acá no hay nada"})
})*/



/************* ARRANCAR SERVER *********************/
// En Index.js

export default app;