import { check, validationResult } from "express-validator";

// Middleware de validación
export const reqControl = [
  // Validación del campo email
  check("email")
    .isEmail()
    .withMessage("El email debe tener un formato válido")
    .notEmpty()
    .withMessage("El email es obligatorio"),

  // Validación del campo password
  check("password")
    .isLength({ min: 6, max: 18 })
    .withMessage("La contraseña debe tener entre 6 y 18 caracteres")
    .notEmpty()
    .withMessage("La contraseña es obligatoria"),

  // Middleware para manejar los errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const reqControlUpdateRango = [
  // Validación del campo email
  check("email")
    .isEmail()
    .withMessage("El email debe tener un formato válido")
    .notEmpty()
    .withMessage("El email es obligatorio"),

  // Validación del campo password
  check("rango")
    .isIn(["cliente", "empleado", "administrador"])
    .withMessage("El rango debe ser 'cliente', 'empleado' o 'administrador'")
    .notEmpty()
    .withMessage("El rango es obligatorio"),

  // Middleware para manejar los errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];