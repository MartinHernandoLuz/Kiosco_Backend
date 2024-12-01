import { check, body, validationResult } from "express-validator";

// Middleware de validación
export const reqControlCliente = [
  // Validación para "nombre" (obligatorio)
  body('nombre')
    .exists().withMessage('El nombre es obligatorio')
    .isString().withMessage('El nombre debe ser una cadena de texto')
    .isLength({ max: 45 }).withMessage('El nombre no debe exceder 45 caracteres'),

  // Validación para "apellido" (obligatorio)
  body('apellido')
    .exists().withMessage('El apellido es obligatorio')
    .isString().withMessage('El apellido debe ser una cadena de texto')
    .isLength({ max: 45 }).withMessage('El apellido no debe exceder 45 caracteres'),

  // Validación para "dni" (opcional, pero debe ser válido si se proporciona)
  body('dni')
    .optional()
    .isString().withMessage('El DNI debe ser una cadena de texto')
    .isLength({ min: 7, max: 15 }).withMessage('El DNI debe tener entre 7 y 15 caracteres'),

  // Ver que al menos un campo esté
  check()
    .custom((_, { req }) => {
      const { dni, telefono, mail } = req.body;
      if (!dni && !telefono && !mail) {
        throw new Error('Debe proporcionar al menos uno de los siguientes campos: dni, telefono, mail');
      }
      return true; // Si la validación pasa, retorna true
    }),

  // Validación para "telefono" (opcional, pero debe ser válido si se proporciona)
  body('telefono')
    .optional()
    .isString().withMessage('El teléfono debe ser una cadena de texto')
    .isLength({ max: 15 }).withMessage('El teléfono no debe exceder 15 caracteres'),

  // Validación para "mail" (opcional, pero debe ser válido si se proporciona)
  body('mail')
    .optional()
    .isEmail().withMessage('El correo electrónico debe ser válido')
    .isLength({ max: 100 }).withMessage('El correo electrónico no debe exceder 100 caracteres'),

  // Middleware para manejar los errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const reqControlUpdateCliente = [
  // Validación para "nombre" (opcional)
  body('nombre')
    .optional()
    .isString().withMessage('El nombre debe ser una cadena de texto')
    .isLength({ max: 45 }).withMessage('El nombre no debe exceder 45 caracteres'),

  // Validación para "apellido" (opcional)
  body('apellido')
    .optional()
    .isString().withMessage('El apellido debe ser una cadena de texto')
    .isLength({ max: 45 }).withMessage('El apellido no debe exceder 45 caracteres'),

  // Validación para "dni" (opcional)
  body('dni')
    .optional()
    .isString().withMessage('El DNI debe ser una cadena de texto')
    .isLength({ min: 7, max: 15 }).withMessage('El DNI debe tener entre 7 y 15 caracteres'),

  // Validación para "telefono" (opcional)
  body('telefono')
    .optional()
    .isString().withMessage('El teléfono debe ser una cadena de texto')
    .isLength({ max: 15 }).withMessage('El teléfono no debe exceder 15 caracteres'),

  // Validación para "mail" (opcional)
  body('mail')
    .optional()
    .isEmail().withMessage('El correo electrónico debe ser válido')
    .isLength({ max: 100 }).withMessage('El correo electrónico no debe exceder 100 caracteres'),

  // Verificar que al menos uno de los campos adicionales esté presente
  check()
    .custom((_, { req }) => {
      const { dni, telefono, mail, nombre, apellido } = req.body;
      if (!nombre && !apellido && !dni && !telefono && !mail) {
        throw new Error("Debe proporcionar al menos uno de los siguientes campos: nombre, apellido, dni, telefono, mail");
      }
      return true; // Si la validación pasa, retorna true
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

