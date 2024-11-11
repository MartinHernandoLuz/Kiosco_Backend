import app from './app.js'; // viene de app.js en este mismo directorio

// esto es sólo para arrancar el server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});