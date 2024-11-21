import db from "../config/db";

afterAll(async () => {
    await db.end(); // Cerrar conexión con la base de datos si usas MySQL o similar
});