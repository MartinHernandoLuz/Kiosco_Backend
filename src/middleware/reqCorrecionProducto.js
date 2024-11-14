import { body, validationResult } from "express-validator";

// Middleware de validación
export const reqControlProducto = [
  // Validación para "nombre"
  body('nombre')
    .exists().withMessage('El nombre es obligatorio')
    .isString().withMessage('El nombre debe ser una cadena de texto')
    .isLength({ max: 45 }).withMessage('El nombre no debe exceder 45 caracteres'),

  // Validación para "precio"
  body('precio')
    .exists().withMessage('El precio es obligatorio')
    .isFloat({ gt: 0 }).withMessage('El precio debe ser un número positivo'),

  // Validación para "stock"
  body('stock')
    .exists().withMessage('El stock es obligatorio')
    .isInt({ min: 1 }).withMessage('El stock debe ser un entero positivo'),

  // Validación para "ID_Categoria"
  body('ID_Categoria')
    .exists().withMessage('El ID de la categoría es obligatorio')
    .isInt({ min: 1 }).withMessage('El ID de la categoría debe ser un entero positivo'),

  // Middleware para manejar los errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];