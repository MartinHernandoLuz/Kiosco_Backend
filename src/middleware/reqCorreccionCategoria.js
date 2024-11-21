import {body, validationResult } from "express-validator";

// Middleware de validación para categoría
export const reqControlCategoria = [
  // Validación para "nombre"
  body('nombre')
    .exists().withMessage('El nombre es obligatorio')
    .isString().withMessage('El nombre debe ser una cadena de texto')
    .isLength({ max: 45 }).withMessage('El nombre no debe exceder 45 caracteres'),

  // Middleware para manejar los errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
