import db from "../config/db.js";


// db se encuentra en la carpeta config, se usa para enviar Querys a la Base de Datos


// buscar productos en tabla producto
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

export const getProductoByIdDB = async (id) => {
  try {
    // Obtener productos por id
    const sentence = "SELECT * FROM producto WHERE id_producto = ?";
    const [rows] = await db.query(sentence,[id]);
    if(rows.length == 0) {
      throw new Error("Producto no encontrado");
    }
    return rows;
  } catch (error) {
    throw error;
  }
}