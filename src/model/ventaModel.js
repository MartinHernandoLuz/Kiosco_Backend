import db from "../config/db.js";

// Obtener todas las ventas
export const getAllVentasDB = async () => {
  try {
    const sentence = "SELECT * FROM venta";
    const [rows] = await db.query(sentence);
    return rows;
  } catch (error) {
    throw new Error("Error al obtener las ventas");
  }
};

// Obtener una venta por ID
export const getVentaByIdDB = async (id) => {
  try {
    const sentence = "SELECT * FROM venta WHERE id_venta = ?";
    const [rows] = await db.query(sentence, [id]);
    if (rows.length === 0) {
      throw new Error("Venta no encontrada");
    }
    return rows;
  } catch (error) {
    if (error.message != "Venta no encontrada") {
      error.message = "Ocurrió un error inesperado"
    }
    throw error;
  }
};

export const getVentasEntreFechasDB = async (startDate, endDate) => {
  try {
    const sentence = "SELECT * FROM venta WHERE fecha BETWEEN ? AND ?";
    const [rows] = await db.query(sentence, [startDate, endDate]);
    if (rows.length === 0) {
      throw new Error("No se encontraron ventas en este rango de fechas");
    }
    return rows;
  } catch (error) {
    if (error.message != "No se encontraron ventas en este rango de fechas") {
      error.message = "Ocurrió un error inesperado"
    }
    throw error;
  }
};


// Crear una nueva venta
export const createVentaDB = async (data) => {
  try {
    const { ID_Cliente, total, id_vendedor } = data;

    // Verificar que el cliente exista en la base de datos
    const comprobarCliente = "SELECT * FROM cliente WHERE id_Cliente = ?";
    const [comprobacion] = await db.query(comprobarCliente, [ID_Cliente]);
    if (comprobacion.length === 0) {
      throw new Error("El cliente especificado no existe");
    }

    // Insertar una nueva venta
    const sentence = "INSERT INTO venta (ID_Cliente, total,id_vendedor) VALUES (?, ?, ?)";
    await db.query(sentence, [ID_Cliente, total, id_vendedor]);

    return { Message: "Venta creada exitosamente" };
  } catch (error) {
    if (error.message != "El cliente especificado no existe") {
      error.message = "Ocurrió un error inesperado"
    }
    throw error;
  }
};

// Actualizar una venta
export const updateVentaDB = async (id_venta, data) => {
  try {
    const { ID_Cliente, total, fecha, id_vendedor } = data;

    // Verificar que la venta exista
    const comprobarVenta = "SELECT * FROM venta WHERE id_venta = ?";
    const [ventaExistente] = await db.query(comprobarVenta, [id_venta]);
    if (ventaExistente.length === 0) {
      throw new Error("La venta con el ID especificado no existe");
    }

    // Construir la consulta dinámica
    const fieldsToUpdate = [];
    const values = [];

    if (ID_Cliente) {
      const comprobarCliente = "SELECT * FROM cliente WHERE id_Cliente = ?";
      const [clienteExistente] = await db.query(comprobarCliente, [ID_Cliente]);
      if (clienteExistente.length === 0) {
        throw new Error("El cliente especificado no existe");
      }

      fieldsToUpdate.push("ID_Cliente = ?");
      values.push(ID_Cliente);
    }
    if (total) {
      fieldsToUpdate.push("total = ?");
      values.push(total);
    }
    if (fecha) {
      fieldsToUpdate.push("fecha = ?");
      values.push(fecha);
    }
    if (id_vendedor) {
      fieldsToUpdate.push("id_vendedor = ?");
      values.push(id_vendedor);
    }


    // Agregar `id_venta` al final de los valores para el WHERE
    values.push(id_venta);

    // Construir y ejecutar la consulta
    const query = `UPDATE venta SET ${fieldsToUpdate.join(', ')} WHERE id_venta = ?`;
    await db.query(query, values);

    return { Message: "Venta actualizada exitosamente" };
  } catch (error) {
    if (error.message != "El cliente especificado no existe" && error.message != "La venta con el ID especificado no existe") {
      error.message = "Ocurrió un error inesperado"
    }
    throw error;
  }
};

// Eliminar una venta
export const deleteVentaByIdDB = async (id) => {
  try {
    // Verificar existencia
    const comprobarVenta = "SELECT * FROM venta WHERE id_venta = ?";
    const [ventaExistente] = await db.query(comprobarVenta, [id]);
    if (ventaExistente.length === 0) {
      throw new Error("La venta no existe");
    }

    // Eliminar
    const sentence = "DELETE FROM venta WHERE id_venta = ?";
    const [result] = await db.query(sentence, [id]);
    if (result.affectedRows < 1) {
      throw new Error("Error al eliminar la venta");
    }

    return { Venta: ventaExistente[0], Estado: "Eliminada" };
  } catch (error) {
    if (error.message != "La venta no existe" && error.message != "Error al eliminar la venta") {
      error.message = "Ocurrió un error inesperado"
    }
    throw error;
  }
};
