import express from "express";
import 'dotenv/config'
import { seguridadInicial } from "./src/middleware/seguridadInicial.js";


const app = express();

seguridadInicial(app)
app.use(express.json());

console.log("otro fiumba")








/************* ARRANCAR SERVER *********************/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});