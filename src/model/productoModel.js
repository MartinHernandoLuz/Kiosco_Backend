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
    const [rows] = await db.query(sentence,[id]);
    if(rows.length == 0) {
      throw new Error("Producto no encontrado");
    }
    return rows;
  } catch (error) {
    throw error;
  }
}

// crear producto
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

// actualizar producto
export const updateProductoDB = async (id_producto,data) => {
  try {
    // antes de veo si viene lo mínimo necesario
    const {nombre, precio, stock, ID_Categoria} = data;

    // Paso 1: Verificar que `id_producto` esté presente en `req.query`
    if (!id_producto) {
      throw new Error("El campo 'id_producto' es obligatorio en los parámetros de consulta");
    }

    // Paso 2: Verificar que al menos uno de los campos adicionales esté presente en `req.body`
    if (!nombre && !precio && !stock && !ID_Categoria) {
      throw new Error("Debe proporcionar al menos uno de los siguientes campos en el cuerpo de la solicitud: nombre, precio, stock, ID_Categoria");
    }

    // Paso 3: Comprobar si el `id_producto` existe en la base de datos
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
      fieldsToUpdate.push("ID_Categoria = ?");
      values.push(ID_Categoria);
    }

    // Si no hay campos a actualizar, retornar un error (esto es para seguridad)
    if (fieldsToUpdate.length === 0) {
      throw new Error("No se ha proporcionado ningún dato para actualizar");
      
    }

    // Agregar `id_producto` al final de los valores para el WHERE
    values.push(id_producto);

    // Construir y ejecutar la Query para la Base de Datos para actualizar el producto
    const query = `UPDATE producto SET ${fieldsToUpdate.join(', ')} WHERE id_producto = ?`;
    await db.query(query, values);

    return "Producto actualizado exitosamente";
  } catch(error){
    throw error;
  }
}


// Eliminar Producto
export const deleteProductoByIdDB = async (id) => {
  try {
    // verificar existencia
    const sentence1 = "SELECT * FROM producto WHERE id_producto = ?";
    const [rows1] = await db.query(sentence1,[id]);
    if(rows1.length == 0) {
      throw new Error("El Producto no existe");
    }

    // eliminar
    const sentence2 = "DELETE FROM producto WHERE id_producto = ?";
    const [rows2] = await db.query(sentence2,[id]);
    if(rows2.affectedRows < 1) {
      throw new Error("Producto no encontrado");
    }

    return({Producto: rows1[0], Estado: "Eliminado"});
  } catch (error) {
    throw error;
  }
}