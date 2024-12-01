import db from "../config/db.js";
import { CustomError } from "../others/customError.js"

// db se encuentra en la carpeta config, se usa para enviar Querys a la Base de Datos



// buscar Clientes en tabla Cliente
export const getAllClientesDB = async () => {
  try {
    // Obtener todos los Clientes
    const sentence = "SELECT * FROM cliente";
    const [rows] = await db.query(sentence);
    return rows;
  } catch (error) {
    throw new Error("Error al obtener los Clientes");
  }
}


// obtener un Cliente por id
export const getClienteByIdDB = async (id) => {
  try {
    // Obtener Clientes por id
    const sentence = "SELECT * FROM cliente WHERE ID_Cliente = ?";
    const [rows] = await db.query(sentence, [id]);
    if (rows.length == 0) {
      throw new Error("Cliente no encontrado");
    }
    return rows;
  } catch (error) {
    if (error.message != "Cliente no encontrado") {
      error.message = "Ocurrió un error inesperado al obtener el Cliente"
    }
    throw new Error(error.message)
  }
}

// crear Cliente
export const createClienteDB = async (data) => {
  try {
    const { dni, nombre, apellido, telefono, mail } = data;

    // Construir la query dinámicamente
    const camposOpcionales = [];
    const placeholders = ["?", "?"]; // Placeholders iniciales para 'nombre' y 'apellido'
    const valores = [nombre, apellido]; // Valores iniciales para 'nombre' y 'apellido'

    if (dni) {
      camposOpcionales.push("dni");
      placeholders.push("?");
      valores.push(dni);
    }
    if (telefono) {
      camposOpcionales.push("telefono");
      placeholders.push("?");
      valores.push(telefono);
    }
    if (mail) {
      camposOpcionales.push("mail");
      placeholders.push("?");
      valores.push(mail);
    }

    const campos = `nombre, apellido${camposOpcionales.length > 0 ? ", " + camposOpcionales.join(", ") : ""}`;
    const sentence = `INSERT INTO cliente (${campos}) VALUES (${placeholders.join(", ")})`;

    // Ejecutar la query
    await db.query(sentence, valores);
    return { message: "Cliente creado exitosamente" };
  } catch (error) {
    throw new Error("Ocurrió un Error inesperado al crear el Cliente")
  }
};



// actualizar Cliente
export const updateClienteDB = async (id_Cliente, data) => {
  try {
    const { nombre, apellido, dni, telefono, mail } = data;


    // Comprobar si el `id_Cliente` existe en la base de datos
    const [ClienteExistente] = await db.query("SELECT * FROM cliente WHERE id_Cliente = ?", [id_Cliente]);
    if (ClienteExistente.length === 0) {
      throw new Error("El cliente con el ID especificado no existe");
    }

    // Construir la consulta dinámica
    const fieldsToUpdate = [];
    const values = [];

    if (nombre) {
      fieldsToUpdate.push("nombre = ?");
      values.push(nombre);
    }
    if (apellido) {
      fieldsToUpdate.push("apellido = ?");
      values.push(apellido);
    }
    if (dni) {
      fieldsToUpdate.push("dni = ?");
      values.push(dni);
    }
    if (telefono) {
      fieldsToUpdate.push("telefono = ?");
      values.push(telefono);
    }
    if (mail) {
      fieldsToUpdate.push("mail = ?");
      values.push(mail);
    }

    // Agregar `id_Cliente` al final de los valores para el WHERE
    values.push(id_Cliente);

    // Construir y ejecutar la consulta
    const query = `UPDATE cliente SET ${fieldsToUpdate.join(', ')} WHERE id_Cliente = ?`;
    await db.query(query, values);

    return { message: "Cliente actualizado exitosamente" };
  } catch (error) {
    if (error.message != "El cliente con el ID especificado no existe") {
      error.message = "Ocurrió un error inesperado al actualizar el Cliente"
    }
    throw new Error(error.message)
  }
};



// Eliminar Cliente
export const deleteClienteByIdDB = async (id) => {
  try {
    // verificar existencia
    const sentence1 = "SELECT * FROM Cliente WHERE id_Cliente = ?";
    const [rows1] = await db.query(sentence1, [id]);
    if (rows1.length == 0) {
      throw new Error("El Cliente no existe");
    }

    // eliminar
    const sentence2 = "DELETE FROM Cliente WHERE id_Cliente = ?";
    const [rows2] = await db.query(sentence2, [id]);
    if (rows2.affectedRows < 1) {
      throw new Error("Cliente no encontrado");
    }

    return ({ Cliente: rows1[0], Estado: "Eliminado" });
  } catch (error) {
    if (error.message != "El Cliente no existe" && error.message != "Cliente no encontrado") {
      error.message = "Ocurrió un error inesperado al eliminar el Cliente"
    }
    throw new Error(error.message)
  }
}