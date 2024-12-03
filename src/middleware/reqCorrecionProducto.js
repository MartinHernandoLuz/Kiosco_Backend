import { check, body, validationResult } from "express-validator";

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


// Middleware de validación
export const reqControlUpdateProducto = [
  // Validación para "nombre" (opcional)
  body('nombre')
    .optional()
    .isString().withMessage('El nombre debe ser una cadena de texto')
    .isLength({ max: 45 }).withMessage('El nombre no debe exceder 45 caracteres'),

  // Validación para "precio" (opcional)
  body('precio')
    .optional()
    .isFloat({ gt: 0 }).withMessage('El precio debe ser un número positivo'),

  // Validación para "stock" (opcional)
  body('stock')
    .optional()
    .isInt({ min: 1 }).withMessage('El stock debe ser un entero positivo'),

  // Validación para "ID_Categoria" (opcional)
  body('ID_Categoria')
    .optional()
    .isInt({ min: 1 }).withMessage('El ID de la categoría debe ser un entero positivo'),

  check().custom((_, { req }) => {
    const { nombre, precio, stock, ID_Categoria } = req.body
    if (!nombre && !precio && !stock && !ID_Categoria) {
      throw new Error("Debe proporcionar al menos uno de los siguientes campos en el cuerpo de la solicitud: nombre, precio, stock, ID_Categoria");
    }
    return true
  }),

  // Middleware para manejar los errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
