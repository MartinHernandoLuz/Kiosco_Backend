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

// obtener un producto por id
export const getProductoByIdDB = async (id) => {
  try {
    // Obtener productos por id
    const sentence = "SELECT * FROM producto WHERE id_producto = ?";
    const [rows] = await db.query(sentence, [id]);
    if (rows.length == 0) {
      throw new Error("Producto no encontrado");
    }
    return rows;
  } catch (error) {
    if (error.message != "Producto no encontrado") {
      error.message = "Ocurrió un error inesperado"
    }
    throw new Error(error.message)
  }
}

// crear producto
export const createProductoDB = async (data) => {
  try {
    const { nombre, precio, stock, ID_Categoria } = data;

    // comprobar si la clave foránea, ID_Categoria está en la base de datos
    const comprobar = "SELECT ID_Categoria FROM categoria WHERE ID_Categoria = ?"
    const [comprobacion] = await db.query(comprobar, [ID_Categoria])
    if (comprobacion.length == 0) {
      throw new Error("La categoría no existe");
    }

    // Insertar un nuevo producto
    const sentence = "INSERT INTO producto (nombre,precio,stock,ID_Categoria) VALUES (?,?,?,?)";
    await db.query(sentence, [nombre, precio, stock, ID_Categoria]);

    return { Message: "Producto creado exitosamente" };

  } catch (error) {
    if (error.message != "La categoría no existe") {
      error.message = "Ocurrió un error inesperado"
    }
    throw new Error(error.message)
  }
}

// actualizar producto
export const updateProductoDB = async (id_producto, data) => {
  try {
    const { nombre, precio, stock, ID_Categoria } = data;

    // Comprobar si el `id_producto` existe en la base de datos
    const [productoExistente] = await db.query("SELECT * FROM producto WHERE id_producto = ?", [id_producto]);
    if (productoExistente.length === 0) {
      throw new Error("El producto con el ID especificado no existe");
    }


    // ahora empiezo a construir la Query para la Base de Datos

    const fieldsToUpdate = [];
    const values = [];

    if (nombre) {
      fieldsToUpdate.push("nombre = ?");
      values.push(nombre);
    }
    if (precio) {
      fieldsToUpdate.push("precio = ?");
      values.push(precio);
    }
    if (stock) {
      fieldsToUpdate.push("stock = ?");
      values.push(stock);
    }
    if (ID_Categoria) {
      const categoriaExiste = "SELECT ID_Categoria FROM categoria WHERE ID_Categoria = ?";
      const [ventaCheck] = await db.query(categoriaExiste, [ID_Categoria]);
      if (ventaCheck.length === 0) throw new Error("Categoría no existe");

      fieldsToUpdate.push("ID_Categoria = ?");
      values.push(ID_Categoria);
    }

    // Agregar `id_producto` al final de los valores para el WHERE
    values.push(id_producto);

    // Construir y ejecutar la Query para la Base de Datos para actualizar el producto
    const query = `UPDATE producto SET ${fieldsToUpdate.join(', ')} WHERE id_producto = ?`;
    await db.query(query, values);

    return { Message: "Producto actualizado exitosamente" };
  } catch (error) {
    if (error.message != "Categoría no existe" && error.message != "El producto con el ID especificado no existe") {
      error.message = "Ocurrió un error inesperado"
    }
    throw new Error(error.message)
  }
}


// Eliminar Producto
export const deleteProductoByIdDB = async (id) => {
  try {
    // verificar existencia
    const sentence1 = "SELECT * FROM producto WHERE id_producto = ?";
    const [rows1] = await db.query(sentence1, [id]);
    if (rows1.length == 0) {
      throw new Error("El Producto no existe");
    }

    // eliminar
    const sentence2 = "DELETE FROM producto WHERE id_producto = ?";
    const [rows2] = await db.query(sentence2, [id]);
    if (rows2.affectedRows < 1) {
      throw new Error("Producto no encontrado");
    }

    return ({ Producto: rows1[0], Estado: "Eliminado" });
  } catch (error) {
    if (error.message != "El Producto no existe" && error.message != "Producto no encontrado") {
      error.message = "Ocurrió un error inesperado"
    }
    throw new Error(error.message)
  }
}