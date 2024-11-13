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


export const createProductoDB = async (data) => {
  try {
    const {nombre,precio,stock,ID_Categoria} = data;

    // comprobar si la clave foránea, ID_Categoria está en la base de datos
    const comprobar = "SELECT ID_Categoria FROM categoria WHERE ID_Categoria = ?"
    const [comprobacion] = await db.query(comprobar,[ID_Categoria])
    if(comprobacion.length == 0){
      throw new Error("La categoría no existe");
    }

    // Insertar un nuevo producto
    const sentence = "INSERT INTO producto (nombre,precio,stock,ID_Categoria) VALUES (?,?,?,?)";
    await db.query(sentence, [nombre,precio,stock,ID_Categoria]);
    return "Producto creado exitosamente";
  } catch (error) {
    throw error;
  }
}