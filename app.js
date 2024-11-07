import express from "express";
import 'dotenv/config'
import { seguridadInicial } from "./src/middleware/seguridadInicial.js";
import userRoutes from "./src/middleware/userRoutes.js";


const app = express();

seguridadInicial(app)
app.use(express.json());

/************** Routes *************/
app.use("/user",userRoutes)







/************* ARRANCAR SERVER *********************/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});