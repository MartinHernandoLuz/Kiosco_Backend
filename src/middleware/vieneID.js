import { param, query, validationResult } from "express-validator";

export const vieneID = [
  param('id')
    .exists({ checkFalsy: true }).withMessage('El ID es obligatorio') // Verifica que el parámetro existe
    .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'), // Verifica que sea un número entero positivo

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
]



export const vieneFechas = [
  // Validación de las fechas en la query
  query('startDate')
    .exists({ checkFalsy: true }).withMessage('startDate es obligatorio') // Verifica que startDate existe
    .isISO8601().withMessage('startDate debe ser una fecha válida en formato ISO'), // Verifica que sea una fecha válida

  query('endDate')
    .exists({ checkFalsy: true }).withMessage('endDate es obligatorio') // Verifica que endDate existe
    .isISO8601().withMessage('endDate debe ser una fecha válida en formato ISO') // Verifica que sea una fecha válida

    .custom((endDateValue, { req }) => {
      const startDateValue = req.query.startDate;
      if (!startDateValue) {
        // Esto no debería ocurrir si la validación previa pasó, pero por seguridad lo verificamos.
        throw new Error('startDate debe ser proporcionado antes de validar endDate');
      }

      const startDate = new Date(startDateValue);
      const endDate = new Date(endDateValue);

      if (startDate > endDate) {
        throw new Error('endDate debe ser mayor o igual que startDate');
      }

      return true; // Si todo está bien, retorna true
    }),

  // Middleware para manejar los errores
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
