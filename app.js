import express from "express";
import 'dotenv/config'
import { seguridadInicial } from "./src/middleware/seguridadInicial.js";
import userRoutes from "./src/router/userRoutes.js";
import productoRoutes from "./src/router/productoRoutes.js";

const app = express(); // traigo a Express 

seguridadInicial(app) // viene de carpeta Middlewares, es para poner todas las funciones de
//                       seguridad inicial
app.use(express.json()); // avisarle a Express que voy a enviar JSON




/************** Routes *************/

app.use("/user",userRoutes) // el ruteador está en carpeta router: userRoutes.js

app.use("/productos",productoRoutes) // el ruteador está en carpeta router: userRoutes.js





/************* ARRANCAR SERVER *********************/
// En Index.js

export default app;