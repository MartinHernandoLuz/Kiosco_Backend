import app from './app.js'; // viene de app.js en este mismo directorio
import { swaggerDOC } from './docs/swagger.js'



// manejo de Errores inesperados
app.use((err, req, res, next) => {
  console.error(err.stack); // Log del error
  res.status(500).json({ error: "Algo salió mal en el servidor" });
});



// esto es sólo para arrancar el server
const PORT = process.env.PORT || 3000;
swaggerDOC(app, PORT);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});