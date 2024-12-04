import db from "../config/db.js";


// Obtener todas las categorías
export const getAllCategoriasDB = async () => {
  try {
    // Obtener todas las categorías
    const sentence = "SELECT * FROM categoria";
    const [rows] = await db.query(sentence);
    return rows;
  } catch (error) {
    throw new Error("Error al obtener las categorías");
  }
};

// Obtener una categoría por ID
export const getCategoriaByIdDB = async (id) => {
  try {
    // Obtener categoría por ID
    const sentence = "SELECT * FROM categoria WHERE ID_Categoria = ?";
    const [rows] = await db.query(sentence, [id]);
    if (rows.length === 0) {
      throw new Error("Categoría no encontrada");
    }
    return rows[0]; // Devuelve solo el primer resultado
  } catch (error) {
    if (error.message != "Categoría no encontrada") {
      error.message = "Ocurrió un error inesperado al obtener Categoría"
    }
    throw new Error(error.message)
  }
};

// Crear una nueva categoría
export const createCategoriaDB = async (data) => {
  try {
    const { nombre } = data;

    // Insertar una nueva categoría
    const sentence = "INSERT INTO categoria (nombre) VALUES (?)";
    await db.query(sentence, [nombre]);
    return { message: "Categoría creada exitosamente" };
  } catch (error) {
    throw new Error("Ocurrió un Error inesperado al crear categoría")
  }
};

// Actualizar una categoría
export const updateCategoriaDB = async (id_categoria, data) => {
  try {
    const { nombre } = data;

    // Verificar si el ID_Categoria existe
    const [categoriaExistente] = await db.query("SELECT * FROM categoria WHERE ID_Categoria = ?", [id_categoria]);
    if (categoriaExistente.length === 0) {
      throw new Error("La categoría con el ID especificado no existe");
    }

    // Actualizar la categoría
    const fieldsToUpdate = [];
    const values = [];

    if (nombre) {
      fieldsToUpdate.push("nombre = ?");
      values.push(nombre);
    }

    // Agregar el ID_Categoria al final de los valores
    values.push(id_categoria);

    // Construir y ejecutar la query
    const query = `UPDATE categoria SET ${fieldsToUpdate.join(", ")} WHERE ID_Categoria = ?`;
    await db.query(query, values);

    return { message: "Categoría actualizada exitosamente" };

  } catch (error) {
    if (error.message != "La categoría con el ID especificado no existe") {
      error.message = "Error inesperado, intente nuevamente"
    }

    throw new Error(error.message);
  }
};

// Eliminar una categoría
export const deleteCategoriaByIdDB = async (id) => {
  try {
    // Verificar existencia
    const sentence1 = "SELECT * FROM categoria WHERE ID_Categoria = ?";
    const [rows1] = await db.query(sentence1, [id]);
    if (rows1.length === 0) {
      throw new Error("La categoría no existe");
    }

    // Eliminar la categoría
    const sentence2 = "DELETE FROM categoria WHERE ID_Categoria = ?";
    const [rows2] = await db.query(sentence2, [id]);
    if (rows2.affectedRows < 1) {
      throw new Error("Error al eliminar la categoría");
    }

    return { Categoria: rows1[0], Estado: "Eliminada" };
  } catch (error) {
    if (error.message != "La categoría no existe") {
      error.message = "Ocurrió un Error inesperado al eliminar categoría"
    }
    throw new Error(error.message)
  }
};
