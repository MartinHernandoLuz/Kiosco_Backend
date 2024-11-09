import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

export const loginUserDB = async (data) => {
  try {
    const { email, password } = data;

    // Buscar al usuario por email
    const sentence = "SELECT * FROM usuario WHERE email = ?";
    const [rows] = await db.query(sentence, [email]);
    
    // Verificar si el email existe
    if (rows.length === 0) {
      throw new Error("Email no encontrado");
    }
    
    const user = rows[0];

    // Verificar la contraseña
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Contraseña incorrecta");
    }

        // Generar el token JWT con email y rango
    const token = jwt.sign(
      { email: user.email, rango: user.rango },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Tiempo de expiración del token
    );
    
    return {
      message: "Inicio de sesión exitoso",
      token: token,
    };

  } catch (error) {
    throw new Error(error.message);
  }
};