import express from "express";
import 'dotenv/config'
import { seguridadInicial } from "./src/middleware/seguridadInicial.js";
import userRoutes from "./src/router/userRoutes.js";


const app = express();

seguridadInicial(app)
app.use(express.json());




/************** Routes *************/

app.use("/user",userRoutes)







/************* ARRANCAR SERVER *********************/
// En Index

export default app;