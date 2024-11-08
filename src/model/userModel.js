import db from "../config/db.js";
import bcrypt from "bcryptjs";

export const createUserDB = async (data) => {
  try {
    const { email, password } = data;

    const hashedPassword = await bcrypt.hashSync(password, 10);


    const sentence = "INSERT INTO usuario (email, password) VALUES (?, ?)";
    const [rows] = await db.query(sentence, [email, hashedPassword]);

    return {
      message: `Usuario ${email} insertado con éxito`,
      detail: rows,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
