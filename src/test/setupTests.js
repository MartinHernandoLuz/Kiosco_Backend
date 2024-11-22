import db from "../config/db";

let allTestsPassed = true; // Marcador global para el estado de las pruebas



afterAll(async () => {
    await db.end(); // Cerrar conexión con la base de datos si usas MySQL o similar
    const knockoutASCII = `
██╗  ██╗███╗   ██╗ ██████╗  ██████╗██╗  ██╗ ██████╗ ██╗   ██╗████████╗██╗
██║ ██╔╝████╗  ██║██╔═══██╗██╔════╝██║ ██╔╝██╔═══██╗██║   ██║╚══██╔══╝██║
█████╔╝ ██╔██╗ ██║██║   ██║██║     █████╔╝ ██║   ██║██║   ██║   ██║   ██║
██╔═██╗ ██║╚██╗██║██║   ██║██║     ██╔═██╗ ██║   ██║██║   ██║   ██║   ╚═╝
██║  ██╗██║ ╚████║╚██████╔╝╚██████╗██║  ██╗╚██████╔╝╚██████╔╝   ██║   ██╗
╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝   ╚═╝`;
  if(allTestsPassed){
  console.log(knockoutASCII);
  }
});