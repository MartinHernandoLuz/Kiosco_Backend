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
export const getDetalleVentaByIdDB = async (ID_Venta, ID_Producto) => {
  try {
    const query = "SELECT * FROM detalle_venta WHERE ID_Venta = ? AND ID_Producto = ?";
    const [rows] = await db.query(query, [ID_Venta, ID_Producto]);
    if (rows.length === 0) {
      throw new Error("Detalle de venta no encontrado");
    }
    return rows[0];
  } catch (error) {
    throw error;
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

    if (ventaCheck.length === 0) throw new Error("Venta no encontrada");
    if (productoCheck.length === 0) throw new Error("Producto no encontrado");

    const query = `INSERT INTO detalle_venta (ID_Venta, ID_Producto, cantidad, precio_unitario) 
                   VALUES (?, ?, ?, ?)`;
    await db.query(query, [ID_Venta, ID_Producto, cantidad, precio_unitario]);
    return "Detalle de venta creado exitosamente";
  } catch (error) {
    throw error;
  }
};

// Actualizar un detalle de venta
export const updateDetalleVentaDB = async (ID_Venta, ID_Producto, data) => {
  try {
    const { cantidad, precio_unitario } = data;

    const fieldsToUpdate = [];
    const values = [];

    if (cantidad) {
      fieldsToUpdate.push("cantidad = ?");
      values.push(cantidad);
    }
    if (precio_unitario) {
      fieldsToUpdate.push("precio_unitario = ?");
      values.push(precio_unitario);
    }

    if (fieldsToUpdate.length === 0) {
      throw new Error("No se ha proporcionado ningún dato para actualizar");
    }

    values.push(ID_Venta, ID_Producto);

    const query = `UPDATE detalle_venta SET ${fieldsToUpdate.join(", ")} 
                   WHERE ID_Venta = ? AND ID_Producto = ?`;
    await db.query(query, values);

    return "Detalle de venta actualizado exitosamente";
  } catch (error) {
    throw error;
  }
};

// Eliminar un detalle de venta
export const deleteDetalleVentaDB = async (ID_Venta, ID_Producto) => {
  try {
    const query = "DELETE FROM detalle_venta WHERE ID_Venta = ? AND ID_Producto = ?";
    const [result] = await db.query(query, [ID_Venta, ID_Producto]);
    if (result.affectedRows === 0) {
      throw new Error("Detalle de venta no encontrado");
    }
    return "Detalle de venta eliminado exitosamente";
  } catch (error) {
    throw error;
  }
};
