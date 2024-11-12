import db from "../config/db.js";


// db se encuentra en la carpeta config, se usa para enviar Querys a la Base de Datos


// Crear usuario en la base de datos
export const getAllProductosDB = async () => {
  try {
    // Obtener todos los productos
    const sentence = "SELECT * FROM producto";
    const [rows] = await db.query(sentence);
    return rows;
  } catch (error) {
    throw new Error("Error al obtener los productos");
  }
}