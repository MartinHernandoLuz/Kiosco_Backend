import db from "../config/db.js";

// Obtener todos los detalles de venta
export const getAllDetallesVentaDB = async () => {
  try {
    const query = "SELECT * FROM detalle_venta";
    const [rows] = await db.query(query);
    return rows;
  } catch (error) {
    throw new Error("Error al obtener los detalles de venta");
  }
};

// Obtener un detalle de venta por ID_Venta y ID_Producto
export const getDetalleVentaByIdDB = async (ID_Detalle) => {
  try {
    const query = "SELECT * FROM detalle_venta WHERE ID_Detalle = ?";
    const [rows] = await db.query(query, [ID_Detalle]);
    if (rows.length === 0) {
      throw new Error("Detalle de venta no encontrado");
    }
    return rows[0];
  } catch (error) {
    if (error.message != "Detalle de venta no encontrado") {
      error.message = "Ocurrió un error inesperado al obtener el detalle de venta"
    }
    throw new Error(error.message)
  }
};

// Obtener full detalle sobre la venta
export const getFullDetalleByIdDB = async (ID_Detalle) => {
  try {
    const query = "SELECT producto.nombre as producto,cantidad,precio_unitario,subtotal, venta.fecha, cliente.nombre as nombre_cliente,\
                    usuario.email as vendedor \
                    FROM detalle_venta \
                    INNER JOIN venta ON detalle_venta.id_venta = venta.id_venta \
                    inner join usuario on venta.id_vendedor = usuario.id_usuario \
                    INNER JOIN cliente ON venta.ID_Cliente = cliente.ID_Cliente \
                    inner join producto on detalle_venta.ID_Producto = producto.ID_Producto \
                    WHERE ID_Detalle = ?";
    const [rows] = await db.query(query, [ID_Detalle]);
    if (rows.length === 0) {
      throw new Error("Detalle de venta no encontrado");
    }
    return rows[0];
  } catch (error) {
    if (error.message != "Detalle de venta no encontrado") {
      error.message = "Ocurrió un error inesperado al obtener el detalle de venta"
    }
    throw new Error(error.message)
  }
};

// Crear un nuevo detalle de venta
export const createDetalleVentaDB = async (data) => {
  try {
    const { ID_Venta, ID_Producto, cantidad, precio_unitario } = data;

    // Validar FK: ID_Venta y ID_Producto existen
    const ventaExiste = "SELECT ID_Venta FROM venta WHERE ID_Venta = ?";
    const productoExiste = "SELECT ID_Producto FROM producto WHERE ID_Producto = ?";
    const [ventaCheck] = await db.query(ventaExiste, [ID_Venta]);
    const [productoCheck] = await db.query(productoExiste, [ID_Producto]);

    if (ventaCheck.length === 0) throw new Error("Venta no existe");
    if (productoCheck.length === 0) throw new Error("Producto no existe");

    const query = `INSERT INTO detalle_venta (ID_Venta, ID_Producto, cantidad, precio_unitario) 
                   VALUES (?, ?, ?, ?)`;
    await db.query(query, [ID_Venta, ID_Producto, cantidad, precio_unitario]);
    return { Message: "Detalle de venta creado exitosamente" };
  } catch (error) {
    if (error.message != "Venta no existe" && error.message != "Producto no existe") {
      error.message = "Ocurrió un error inesperado"
    }
    throw new Error(error.message)
  }
};

// Actualizar un detalle de venta
export const updateDetalleVentaDB = async (id_detalle, data) => {
  try {
    // Verificar si el registro existe
    const [DetalleExistente] = await db.query(
      "SELECT * FROM detalle_venta WHERE ID_Detalle = ?",
      [id_detalle]
    );
    if (DetalleExistente.length === 0) {
      throw new Error("El detalle de venta con el ID especificado no existe");
    }


    const { ID_Venta, ID_Producto, cantidad, precio_unitario } = data;

    // Construir dinámicamente los campos a actualizar
    const fieldsToUpdate = [];
    const values = [];

    if (ID_Venta) {
      const ventaExiste = "SELECT ID_Venta FROM venta WHERE ID_Venta = ?";
      const [ventaCheck] = await db.query(ventaExiste, [ID_Venta]);
      if (ventaCheck.length === 0) throw new Error("Venta no existe");

      fieldsToUpdate.push("ID_Venta = ?");
      values.push(ID_Venta);
    }
    if (ID_Producto) {
      const productoExiste = "SELECT ID_Producto FROM producto WHERE ID_Producto = ?";
      const [productoCheck] = await db.query(productoExiste, [ID_Producto]);
      if (productoCheck.length === 0) throw new Error("Producto no existe");

      fieldsToUpdate.push("ID_Producto = ?");
      values.push(ID_Producto);
    }
    if (cantidad) {
      fieldsToUpdate.push("cantidad = ?");
      values.push(cantidad);
    }
    if (precio_unitario) {
      fieldsToUpdate.push("precio_unitario = ?");
      values.push(precio_unitario);
    }

    // Añadir el ID_Detalle al final de los valores
    values.push(id_detalle);



    // Construir y ejecutar la consulta de actualización
    const query = `UPDATE detalle_venta SET ${fieldsToUpdate.join(", ")} WHERE ID_Detalle = ?`;
    await db.query(query, values);

    return { Message: "Detalle de venta actualizado exitosamente" };
  } catch (error) {
    if (error.message != "El detalle de venta con el ID especificado no existe") {
      error.message = "Ocurrió un error inesperado"
    } else if (error.message != "Venta no existe" && error.message != "Producto no existe") {
      error.message = "Ocurrió un error inesperado"
    }
    throw new Error(error.message)
  }
};


// Eliminar un detalle de venta
export const deleteDetalleVentaDB = async (id) => {
  try {
    const sentence1 = "SELECT * FROM detalle_venta WHERE id_detalle = ?";
    const [rows1] = await db.query(sentence1, [id]);
    if (rows1.length == 0) {
      throw new Error("Detalle de venta no encontrado");
    }


    const query = "DELETE FROM detalle_venta WHERE ID_Detalle = ?";
    const [result] = await db.query(query, [id]);
    if (result.affectedRows === 0) {
      throw new Error("Detalle de venta no encontrado");
    }
    return ({ Detalle: rows1[0], Estado: "Eliminado" });
  } catch (error) {
    if (error.message != "Detalle de venta no encontrado") {
      error.message = "Ocurrió un error inesperado"
    }
    throw new Error(error.message)
  }
};
