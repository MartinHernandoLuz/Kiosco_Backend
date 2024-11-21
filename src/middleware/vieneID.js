import { param, validationResult } from "express-validator";

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