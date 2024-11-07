import db from "../config/db.js";
import bcrypt from "bcryptjs";

const create = async (data) => {
    try {
      const { email, password } = data;

      const hashedPassword = await bcrypt.hash(password, 10);


      const sentence = "INSERT INTO usuario (email, password) VALUES ($1, $2)";
      const { rows } = await db.query(sentence, [email, hashedPassword]);
  
      return {
        message: `Avion ${nombre} insertado con exito`,
        detail: rows[0],
      };
    } catch (error) {
      throw new Error(error.message);
    }
  };

export { create };