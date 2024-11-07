import db from "../config/db.js";

const create = async (data) => {
    try {
      const { email, password } = data;
      // FALTA CIFRADO DE CONTRASEÑA
      const sentence = "INSERT INTO usuario (email, password) VALUES ($1, $2)";
      const { rows } = await db.query(sentence, [nombre, cantidad_asientos]);
  
      return {
        message: `Avion ${nombre} insertado con exito`,
        detail: rows[0],
      };
    } catch (error) {
      throw new Error(error.message);
    }
  };